import { Typography } from '@atoms/typography/typography.component'
import { Grid } from './grid.component'
import { GRID_COLS, GRID_GAPS, GRID_TAGS } from './grid.constants'
import { gridRootMock } from './grid.mock'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Grid> = {
  title: 'Atoms/Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    tag: {
      control: 'select',
      options: GRID_TAGS,
      table: { type: { summary: GRID_TAGS.join(' | ') } }
    },
    gap: {
      control: 'select',
      options: GRID_GAPS,
      table: { type: { summary: GRID_GAPS.join(' | ') } }
    },
    cols: {
      control: 'select',
      options: GRID_COLS,
      table: { type: { summary: GRID_COLS.join(' | ') } }
    },
    mobileCols: {
      control: 'select',
      options: GRID_COLS,
      table: { type: { summary: GRID_COLS.join(' | ') } }
    },
    tabletCols: {
      control: 'select',
      options: GRID_COLS,
      table: { type: { summary: GRID_COLS.join(' | ') } }
    },
    desktopCols: {
      control: 'select',
      options: GRID_COLS,
      table: { type: { summary: GRID_COLS.join(' | ') } }
    }
  },
  args: gridRootMock
}

export default meta

type Story = StoryObj<typeof Grid>

export const Default: Story = {
  render: (args) => (
    <Grid {...args}>
      {['Article 1', 'Article 2', 'Article 3', 'Article 4'].map((title) => (
        <Grid.Item key={title} tag="article">
          <Typography tag="p" size="med" text={title} />
        </Grid.Item>
      ))}
    </Grid>
  )
}
