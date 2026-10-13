import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Gear from './pages/Gear.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Gear />
  </StrictMode>,
)
