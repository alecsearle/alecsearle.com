import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import Gear from './pages/Gear.jsx'
import Learn from './pages/Learn.jsx'

// Built by `npm run build` and used by scripts/prerender.mjs. Only pages whose
// content doesn't depend on the time or hostname belong here (not /giveaway).
export const PAGES = {
  'index.html': App,
  'gear/index.html': Gear,
  'learn/index.html': Learn,
}

export const render = (file) => {
  const Page = PAGES[file]
  return renderToString(<Page />)
}
