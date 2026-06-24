import Home from './home.component'
import { homeMock } from './home.mock'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Home> = {
  title: 'Layouts/Home',
  component: Home,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: ''
    }
  },
  args: homeMock
}

export default meta

type Story = StoryObj<typeof Home>

export const Default: Story = {}
