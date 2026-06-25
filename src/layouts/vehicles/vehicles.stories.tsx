import { Vehicles } from './vehicles.component'
import { vehiclesLayoutMock } from './vehicles.mock'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Vehicles> = {
  title: 'Layouts/Vehicles',
  component: Vehicles,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: ''
    }
  },
  args: vehiclesLayoutMock
}

export default meta

type Story = StoryObj<typeof Vehicles>

export const Default: Story = {}
