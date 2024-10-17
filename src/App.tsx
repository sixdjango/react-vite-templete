import { Suspense } from 'react'
import { staticRoutes } from './router/route'
import { Routes } from 'react-router-dom'
import { globSetting } from './configs/setting'

console.log(globSetting.publicPath)

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>{staticRoutes}</Routes>
    </Suspense>
  )
}
