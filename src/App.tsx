import { Suspense } from 'react'
import { staticRoutes } from './router/route'
import { Routes } from 'react-router-dom'
import './styles/index.scss'
import '@yc-tech/react-component/dist/style.css'

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>{staticRoutes}</Routes>
    </Suspense>
  )
}
