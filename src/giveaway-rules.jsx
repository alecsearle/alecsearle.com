import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GiveawayRulesPage from './pages/GiveawayRulesPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GiveawayRulesPage />
  </StrictMode>,
)
