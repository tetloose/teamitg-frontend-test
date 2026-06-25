import VehicleDetail from './vehicle-detail.component'
import { vehicleDetailMock } from './vehicle-detail.mock'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof VehicleDetail> = {
  title: 'Components/Vehicle Detail',
  component: VehicleDetail,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: ''
    }
  },
  args: vehicleDetailMock
}

export default meta

type Story = StoryObj<typeof VehicleDetail>

export const Default: Story = {}
