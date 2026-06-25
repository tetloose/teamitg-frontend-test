import { getMediaProps } from '@utils/get-media-props/get-media-props.util'
import { Grid } from '@atoms/grid/grid.component'
import { Image } from '@atoms/image/image.component'
import { Typography } from '@atoms/typography/typography.component'
import { VehicleCardSkeleton } from './vehicle-card-skeleton.component'
import type { VehicleCardProps } from './vehicle-card.types'
import styles from './vehicle-card.module.scss'

export const VehicleCard = ({
  classNames = [],
  id,
  media,
  description,
  price,
  isLoading,
  onSelect
}: VehicleCardProps) => {
  if (isLoading) return <VehicleCardSkeleton classNames={classNames} />
  if (!id) return null

  const { mediaSrc, mediaAlt, mediaSources } = getMediaProps(media)

  return (
    <Grid.Item
      tag="article"
      classNames={[styles['vehicle-card'], ...classNames]}
    >
      <button
        className={styles['vehicle-card__button']}
        aria-label={`View ${id} details`}
        onClick={onSelect}
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
              size="med"
              weight="semibold"
              color="gray"
              text={`From ${price}`}
              classNames={[styles['vehicle-card__price']]}
            />
          ) : null}
          {description ? (
            <Typography
              tag="p"
              size="sml"
              color="gray"
              text={description}
              classNames={[styles['vehicle-card__description']]}
            />
          ) : null}
        </div>
      </button>
    </Grid.Item>
  )
}
