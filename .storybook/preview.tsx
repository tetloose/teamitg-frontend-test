import { ErrorBoundary } from 'react-error-boundary'
import { Toaster } from 'react-hot-toast'
import type { Preview } from '@storybook/react-vite'
import { AppProvider } from '@context/app/app.context'
import { Boundary } from '@utils/boundary/boundary.util'
import '@styles/app.scss'

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ErrorBoundary FallbackComponent={Boundary}>
        <Toaster />
        <AppProvider>
          <Story />
        </AppProvider>
      </ErrorBoundary>
    )
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      test: 'error'
    },
    options: {
      storySort: {
        order: [
          'Atoms',
          'Molecules',
          'Components',
          'Layouts'
        ]
      }
    },
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Light', value: '#fff' },
        { name: 'Dark', value: '#000' }
      ]
    }
  }
}

export default preview
