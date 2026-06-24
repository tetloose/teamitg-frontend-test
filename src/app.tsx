import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { navigation } from '@routes/navigation.routes'
import { Loading } from '@atoms/loading/loading.component'

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {navigation.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  )
}

export default App
