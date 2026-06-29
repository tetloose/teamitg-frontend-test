import { useState } from 'react'
import { fn } from 'storybook/test'
import { VehicleFilter } from './vehicle-filter.component'
import { vehicleFilterMock } from './vehicle-filter.mock'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof VehicleFilter> = {
  title: 'Molecules/VehicleFilter',
  component: VehicleFilter,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    value: {
      control: 'select',
      options: ['all', ...vehicleFilterMock.options.map((o) => o.value)]
    }
  },
  args: {
    ...vehicleFilterMock,
    onChange: fn()
  }
}

export default meta

type Story = StoryObj<typeof VehicleFilter>

export const Default: Story = {
  render: (args) => {
    const RenderStory = () => {
      const [value, setValue] = useState(args.value)

      return (
        <VehicleFilter
          {...args}
          value={value}
          onChange={(next) => {
            setValue(next)
            args.onChange(next)
          }}
        />
      )
    }

    return <RenderStory />
  }
}
