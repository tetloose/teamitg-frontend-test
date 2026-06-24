import { Image } from './image.component'
import { IMAGE_POSITIONS, IMAGE_SIZES } from './image.constants'
import { imageMock } from './image.mock'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Image> = {
  title: 'Atoms/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: IMAGE_SIZES,
      table: { type: { summary: IMAGE_SIZES.join(' | ') } }
    },
    position: {
      control: 'select',
      options: IMAGE_POSITIONS,
      table: { type: { summary: IMAGE_POSITIONS.join(' | ') } }
    },
    blur: { control: 'boolean' }
  },
  args: imageMock
}

export default meta

type Story = StoryObj<typeof Image>

export const Default: Story = {}
