import NotFound from './not-found.component'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof NotFound> = {
  title: 'Layouts/Not Found',
  component: NotFound,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: ''
    }
  }
}

export default meta

type Story = StoryObj<typeof NotFound>

export const Default: Story = {}

export const EmptyState: Story = {
  args: {
    title: 'No Content',
    body: 'Nothing to show here'
  }
}

export const WithError: Story = {
  args: {
    error: {
      message: 'Something went wrong',
      name: 'NetworkError',
      stack: ''
    }
  }
}
