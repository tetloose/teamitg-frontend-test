import { Loading } from './loading.component'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Loading> = {
  title: 'Atoms/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: ''
    }
  }
}

export default meta

type Story = StoryObj<typeof Loading>

export const Default: Story = {}
