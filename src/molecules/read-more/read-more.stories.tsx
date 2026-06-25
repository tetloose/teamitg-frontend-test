import { ReadMore } from './read-more.component'
import { readMoreMock } from './read-more.mock'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ReadMore> = {
  title: 'Molecules/Read More',
  component: ReadMore,
  parameters: {
    layout: 'centered'
  },
  args: readMoreMock
}

export default meta

type Story = StoryObj<typeof ReadMore>

export const Default: Story = {}
