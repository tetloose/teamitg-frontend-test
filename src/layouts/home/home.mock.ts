import { contentMock } from '@hooks/use-content/use-content.mock'
import type { HomeProps } from './home.types'

export const homeMock: HomeProps = {
  content: contentMock.homepage,
  contentPending: false
}
