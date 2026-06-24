import { SIZES } from '@global/global.constants'
import { Typography } from './typography.component'
import { TYPOGRAPHY_COLORS, TYPOGRAPHY_TAGS } from './typography.constants'
import { typographyMock } from './typography.mock'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    tag: {
      control: 'select',
      options: TYPOGRAPHY_TAGS,
      table: { type: { summary: TYPOGRAPHY_TAGS.join(' | ') } }
    },
    size: {
      control: 'select',
      options: SIZES,
      table: { type: { summary: SIZES.join(' | ') } }
    },
    color: {
      control: 'select',
      options: TYPOGRAPHY_COLORS,
      table: { type: { summary: TYPOGRAPHY_COLORS.join(' | ') } }
    }
  },
  args: typographyMock
}

export default meta

type Story = StoryObj<typeof Typography>

export const Default: Story = {}
