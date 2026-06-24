import { Grid } from '@atoms/grid/grid.component'
import { Image } from '@atoms/image/image.component'
import { Loading } from '@atoms/loading/loading.component'
import { Typography } from '@atoms/typography/typography.component'
import NotFound from '@layouts/not-found/not-found.component'
import type { HomeProps } from './home.types'

const Home = ({ content, contentPending }: HomeProps) => {
  if (contentPending) return <Loading />

  return content ? (
    <Grid tag="section" gap="med" cols={1} mobileCols={2} desktopCols={3}>
      {content.map(({ id, image, title, body }) => (
        <Grid.Item tag="article" key={id}>
          {image && <Image {...image} />}
          {title && <Typography tag="h2" size="xlrg" text={title} />}
          {body && <Typography tag="p" size="med" text={body} />}
        </Grid.Item>
      ))}
    </Grid>
  ) : (
    <NotFound title="No Content" body="Found" />
  )
}

export default Home
