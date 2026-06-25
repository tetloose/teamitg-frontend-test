import { Grid } from '@atoms/grid/grid.component'
import { Image } from '@atoms/image/image.component'
import { Typography } from '@atoms/typography/typography.component'
import { getMediaSources } from './vehicle-card.utils'
import { VehicleCardSkeleton } from './vehicle-card-skeleton.component'
import type { VehicleCardProps } from './vehicle-card.types'
import styles from './vehicle-card.module.scss'

export const VehicleCard = ({
  classNames = [],
  id,
  media,
  description,
  price,
  isLoading
}: VehicleCardProps) => {
  if (isLoading) return <VehicleCardSkeleton />

  if (!id) return

  const mediaSrc = media[media.length - 1]?.url
  const mediaAlt = media[0]?.name
  const mediaSources = getMediaSources(media)

  return (
    <Grid.Item
      tag="article"
      classNames={[styles['vehicle-card'], ...classNames]}
    >
      {mediaSrc ? (
        <Image
          classNames={[styles['vehicle-card__image']]}
          src={mediaSrc}
          alt={mediaAlt}
          sources={mediaSources.length ? mediaSources : undefined}
          size="cover"
          blur
        />
      ) : null}
      <div className={styles['vehicle-card__inside']}>
        <Typography
          tag="h2"
          size="xlrg"
          weight="bold"
          transform="uppercase"
          text={id}
          classNames={[styles['vehicle-card__title']]}
        />
        {price ? (
          <Typography
            tag="p"
            size="lrg"
            weight="semibold"
            color="gray"
            text={`From ${price}`}
            classNames={[styles['vehicle-card__price']]}
          />
        ) : null}
        {description ? (
          <Typography
            tag="p"
            text={description}
            size="lrg"
            color="gray"
            classNames={[styles['vehicle-card__description']]}
          />
        ) : null}
      </div>
    </Grid.Item>
  )
}
