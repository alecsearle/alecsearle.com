import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Learn from './pages/Learn.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Learn />
  </StrictMode>,
)
