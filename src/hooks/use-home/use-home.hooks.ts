import { useContent } from '@hooks/use-content/use-content.hooks'

export const useHome = () => {
  const { content, contentPending, contentError } = useContent('homepage')

  return {
    content,
    contentPending,
    contentError
  }
}
