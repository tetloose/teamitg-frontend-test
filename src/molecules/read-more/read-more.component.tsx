import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Typography } from '@atoms/typography/typography.component'
import type { ReadMoreProps } from './read-more.types'
import clsx from 'clsx'
import styles from './read-more.module.scss'

export const ReadMore = ({ children, classNames = [] }: ReadMoreProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentId = useId()

  return (
    <div className={clsx(styles['read-more'], ...classNames)}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles['read-more__trigger']}
      >
        <Typography
          tag="span"
          size="sml"
          weight="semibold"
          text={isOpen ? 'Read less' : 'Read more'}
        />
        <ChevronDown
          className={clsx(styles['read-more__icon'], {
            [styles['read-more__icon--open']]: isOpen
          })}
          aria-hidden="true"
          size={16}
        />
      </button>
      <div
        id={contentId}
        className={clsx(styles['read-more__content'], {
          [styles['read-more__content--open']]: isOpen
        })}
      >
        <div className={styles['read-more__inside']}>{children}</div>
      </div>
    </div>
  )
}
