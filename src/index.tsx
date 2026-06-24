import '@styles/app.scss'
import { StrictMode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { AppProvider } from '@context/app/app.context'
import { Boundary } from '@utils/boundary/boundary.util'
import App from './app'

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement)

root.render(
  <ErrorBoundary FallbackComponent={Boundary}>
    <Toaster />
    <BrowserRouter>
      <StrictMode>
        <AppProvider>
          <App />
        </AppProvider>
      </StrictMode>
    </BrowserRouter>
  </ErrorBoundary>
)
