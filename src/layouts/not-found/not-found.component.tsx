import { Grid } from '@atoms/grid/grid.component'
import { Typography } from '@atoms/typography/typography.component'
import type { NotFoundProps } from './not-found.types'

const NotFound = ({ title, body, error }: NotFoundProps) => {
  const { name = '', message = '', stack = '' } = error || {}

  return (
    <Grid tag="main">
      <Grid.Item tag="section">
        <Typography
          tag="h1"
          size="xlrg"
          color="black"
          text={title || name || '404 Page not found'}
        />
        <Typography
          tag="p"
          size="med"
          color="gray"
          text={body || message || 'Please refresh the page'}
        />
        {stack && <Typography tag="p" size="sml" color="gray" text={stack} />}
      </Grid.Item>
    </Grid>
  )
}

export default NotFound
