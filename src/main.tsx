import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import ReactDOM from 'react-dom/client'
import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
