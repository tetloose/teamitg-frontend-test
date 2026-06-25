import { VehicleList } from './vehicle-list.component'
import { vehicleListMock } from './vehicle-list.mock'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof VehicleList> = {
  title: 'Components/Vehicle List',
  component: VehicleList,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    vehiclesPending: { control: 'boolean' },
    vehiclesError: { control: 'object' }
  },
  args: vehicleListMock
}

export default meta

type Story = StoryObj<typeof VehicleList>

export const Default: Story = {}
