import { useHome } from '@hooks/use-home/use-home.hooks'
import Home from '@layouts/home/home.component'

const HomePage = () => {
  const { content, contentPending } = useHome()

  return <Home content={content} contentPending={contentPending} />
}

export default HomePage
