import { useState } from 'react'
import { Modal } from './modal.component'
import { modalMock } from './modal.mock'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Modal> = {
  title: 'Atoms/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: ''
    }
  },
  args: modalMock
}

export default meta

type Story = StoryObj<typeof Modal>

const RenderStory = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open modal
      </button>
      <Modal {...modalMock} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export const Default: Story = {
  render: () => <RenderStory />
}
