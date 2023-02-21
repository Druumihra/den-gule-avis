import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Topbar from './Topbar'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Topbar/>
  </React.StrictMode>,
)
