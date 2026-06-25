import { getMediaProps } from '@utils/get-media-props/get-media-props.util'
import { Grid } from '@atoms/grid/grid.component'
import { Image } from '@atoms/image/image.component'
import { Typography } from '@atoms/typography/typography.component'
import { formatEmissions } from './vehicle-detail.utils'
import { VehicleDetailSkeleton } from './vehicle-detail-skeleton.component'
import type { VehicleDetailProps } from './vehicle-detail.types'
import styles from './vehicle-detail.module.scss'

const VehicleDetail = ({ vehicle, isLoading }: VehicleDetailProps) => {
  if (isLoading) return <VehicleDetailSkeleton />

  if (!vehicle) return null

  const { mediaSrc, mediaAlt, mediaSources } = getMediaProps(vehicle.media)

  const emissions = vehicle.meta?.emissions
    ? formatEmissions(vehicle.meta.emissions)
    : null

  return (
    <Grid.Item tag="article" classNames={[styles['vehicle-detail']]}>
      {mediaSrc ? (
        <Image
          classNames={[styles['vehicle-detail__image']]}
          src={mediaSrc}
          alt={mediaAlt}
          sources={mediaSources.length ? mediaSources : undefined}
          size="cover"
          blur
        />
      ) : null}
      <div className={styles['vehicle-detail__inside']}>
        <Typography
          tag="h2"
          id="vehicle-detail-title"
          size="xlrg"
          weight="bold"
          transform="uppercase"
          text={vehicle.id}
          classNames={[styles['vehicle-detail__title']]}
        />
        {vehicle.price ? (
          <Typography
            tag="p"
            size="med"
            weight="semibold"
            color="gray"
            text={`From ${vehicle.price}`}
            classNames={[styles['vehicle-detail__price']]}
          />
        ) : null}
        {vehicle.description ? (
          <Typography
            tag="p"
            size="sml"
            color="gray"
            text={vehicle.description}
            classNames={[styles['vehicle-detail__description']]}
          />
        ) : null}
        {vehicle.meta ? (
          <Typography
            tag="dl"
            size="sml"
            color="gray"
            classNames={[styles['vehicle-detail__meta']]}
          >
            <Typography
              tag="dt"
              weight="semibold"
              size="sml"
              text="Passengers"
            />
            <Typography
              tag="dd"
              size="sml"
              color="gray"
              text={String(vehicle.meta.passengers)}
            />
            <Typography
              tag="dt"
              weight="semibold"
              size="sml"
              text="Drivetrain"
            />
            <Typography
              tag="dd"
              size="sml"
              color="gray"
              text={vehicle.meta.drivetrain.join(', ')}
            />
            <Typography
              tag="dt"
              weight="semibold"
              size="sml"
              text="Body styles"
            />
            <Typography
              tag="dd"
              size="sml"
              color="gray"
              text={vehicle.meta.bodystyles.join(', ')}
            />
            {emissions ? (
              <>
                <Typography
                  tag="dt"
                  weight="semibold"
                  size="sml"
                  text="Emissions"
                />
                <Typography tag="dd" size="sml" color="gray" text={emissions} />
              </>
            ) : null}
          </Typography>
        ) : null}
      </div>
    </Grid.Item>
  )
}

export default VehicleDetail
