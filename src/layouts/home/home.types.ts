import type { Homepage } from '@hooks/use-content/use-content.types'

export type HomeProps = {
  content: Homepage[] | null
  contentPending: boolean
}
