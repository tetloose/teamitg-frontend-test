import { useCallback } from 'react'
import toast from 'react-hot-toast'
import type { NotificationType } from './use-notification.types'

export const useNotification = () => {
  const notify = useCallback(
    (notification: unknown, type: NotificationType) => {
      let notificationMessage = ''

      if (notification instanceof Error) {
        const { message } = notification

        notificationMessage = message
      } else {
        notificationMessage = notification as string
      }

      switch (type) {
        case 'success':
          toast.success(notificationMessage)
          break
        case 'error':
          toast.error(notificationMessage)
          break
        case 'loading':
          toast.loading(notificationMessage)
          break
        case 'default':
        default:
          toast(notificationMessage)
          break
      }
    },
    []
  )

  return notify
}
