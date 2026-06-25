import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useNotification } from '@hooks/use-notification/use-notification.hooks'
import { useVehicles } from './use-vehicles.hooks'
import { vehiclesMock } from './use-vehicles.mock'
import { getData } from './use-vehicles.services'
import { fetchVehicles } from './use-vehicles.utils'

// Wrap getData in a spy rather than a full mock so the getData describe block
// can test the real implementation while the useVehicles describe block overrides
// it per-test without needing a separate test file for each concern
vi.mock('./use-vehicles.services', async () => {
  const { getData: actualGetData } = await vi.importActual<{
    getData: typeof getData
  }>('./use-vehicles.services')

  return { getData: vi.fn().mockImplementation(actualGetData) }
})
vi.mock('./use-vehicles.utils')
vi.mock('@hooks/use-notification/use-notification.hooks')

describe('getData', () => {
  const signal = new AbortController().signal

  // Swallows rejections so tests that expect partial success can assert on the
  // return value rather than catching an unhandled promise rejection
  const safelyCallApi = async () => {
    try {
      return await getData(signal)
    } catch {
      return null
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fails if the initial api call fails', () => {
    vi.mocked(fetchVehicles).mockRejectedValueOnce(new Error('Network error'))

    return expect(getData(signal)).rejects.toBeTruthy()
  })

  it('makes an initial call to /api/vehicles.json', async () => {
    vi.mocked(fetchVehicles).mockResolvedValueOnce([])
    await safelyCallApi()

    expect(fetchVehicles).toHaveBeenCalledWith({ url: 'vehicles', signal })
  })

  it('traverses results and makes a detail call per vehicle', async () => {
    vi.mocked(fetchVehicles)
      .mockResolvedValueOnce([
        { id: 'ftype', apiUrl: '/api/vehicle_ftype.json' },
        { id: 'xj', apiUrl: '/api/vehicle_xj.json' }
      ])
      .mockResolvedValueOnce({ id: 'ftype', price: '£36,000' })
      .mockResolvedValueOnce({ id: 'xj', price: '£40,000' })

    await safelyCallApi()

    expect(fetchVehicles).toHaveBeenCalledWith({ url: 'vehicles', signal })
    expect(fetchVehicles).toHaveBeenCalledWith({
      url: 'vehicle',
      id: 'ftype',
      signal
    })
    expect(fetchVehicles).toHaveBeenCalledWith({
      url: 'vehicle',
      id: 'xj',
      signal
    })
  })

  it('ignores failed detail calls without rejecting the whole response', async () => {
    vi.mocked(fetchVehicles)
      .mockResolvedValueOnce([
        { id: 'ftype', apiUrl: '/api/vehicle_ftype.json' },
        { id: 'xj', apiUrl: '/api/vehicle_xj.json' }
      ])
      .mockResolvedValueOnce({ id: 'ftype', price: '£36,000' })
      .mockRejectedValueOnce(new Error('Network error'))

    const result = await safelyCallApi()

    expect(result).toHaveLength(1)
    expect(result?.[0]).toMatchObject({ id: 'ftype', price: '£36,000' })
  })

  it('ignores vehicles without a valid price', async () => {
    vi.mocked(fetchVehicles)
      .mockResolvedValueOnce([
        { id: 'ftype', apiUrl: '/api/vehicle_ftype.json' },
        { id: 'xe', apiUrl: '/api/vehicle_xe.json' },
        { id: 'xj', apiUrl: '/api/vehicle_xj.json' }
      ])
      .mockResolvedValueOnce({ id: 'ftype', price: '' })
      .mockResolvedValueOnce({ id: 'xe' })
      .mockResolvedValueOnce({ id: 'xj', price: '£40,000' })

    const result = await safelyCallApi()

    expect(result).toHaveLength(1)
    expect(result?.[0]).toMatchObject({ id: 'xj', price: '£40,000' })
  })
})

// Each test overrides getData directly — clearAllMocks resets call history but
// not the implementation, so every test sets its own to stay self-contained
describe('useVehicles', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useNotification).mockReturnValue(vi.fn())
  })

  it('returns vehiclesPending true while fetching', () => {
    vi.mocked(getData).mockReturnValue(new Promise(() => {}))

    const { result } = renderHook(() => useVehicles())

    expect(result.current.vehiclesPending).toBe(true)
  })

  it('returns vehicles on success', async () => {
    vi.mocked(getData).mockResolvedValue(vehiclesMock)

    const { result } = renderHook(() => useVehicles())

    await waitFor(() => expect(result.current.vehicles).toEqual(vehiclesMock))
    expect(result.current.vehiclesPending).toBe(false)
    expect(result.current.vehiclesError).toBeNull()
  })

  it('returns vehiclesError on failure', async () => {
    const error = new Error('Network error')
    vi.mocked(getData).mockRejectedValue(error)

    const { result } = renderHook(() => useVehicles())

    await waitFor(() => expect(result.current.vehiclesError).toEqual(error))
    expect(result.current.vehiclesPending).toBe(false)
    expect(result.current.vehicles).toBeNull()
  })
})
