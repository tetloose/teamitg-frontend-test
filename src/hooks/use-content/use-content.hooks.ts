import { useEffect, useRef, useState } from 'react'
import { useNotification } from '@hooks/use-notification/use-notification.hooks'
import { fetchContent } from './use-content.utils'
import type { Content, ContentProps, ContentReturn } from './use-content.types'

export const useContent = <K extends keyof Content>(
  filter: K
): ContentReturn<K> => {
  const [content, setContent] = useState<ContentProps<Content, K> | null>(null)
  const [contentPending, setContentPending] = useState(false)
  const [contentError, setContentError] = useState<Error | null>(null)
  const notify = useNotification()
  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    controllerRef.current = new AbortController()
    const { signal } = controllerRef.current

    setContentPending(true)
    setContentError(null)

    fetchContent(signal)
      .then((data) => {
        if (data[filter] !== undefined) {
          setContent(data[filter] as ContentProps<Content, K>)
        }
      })
      .catch((err: Error) => {
        if (err.name === 'AbortError') return
        setContentError(err)
        notify(err, 'error')
      })
      .finally(() => setContentPending(false))

    return () => controllerRef.current?.abort()
  }, [filter, notify])

  return { content, contentPending, contentError }
}
