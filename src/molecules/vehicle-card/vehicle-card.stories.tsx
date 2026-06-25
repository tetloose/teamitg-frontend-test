import { VehicleCard } from './vehicle-card.component'
import { vehicleCardMock } from './vehicle-card.mock'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof VehicleCard> = {
  title: 'Molecules/Vehicle Card',
  component: VehicleCard,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    isLoading: { control: 'boolean' }
  },
  args: vehicleCardMock
}

export default meta

type Story = StoryObj<typeof VehicleCard>

export const Default: Story = {}
