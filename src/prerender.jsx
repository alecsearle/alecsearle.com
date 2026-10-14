import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import Gear from './pages/Gear.jsx'
import Learn from './pages/Learn.jsx'
import Builds from './pages/Builds.jsx'
import NotFound from './pages/NotFound.jsx'

// Built by `npm run build` and used by scripts/prerender.mjs. Only pages whose
// content doesn't depend on the time or hostname belong here (not /giveaway).
export const PAGES = {
  'index.html': App,
  'gear/index.html': Gear,
  'learn/index.html': Learn,
  'builds/index.html': Builds,
  '404.html': NotFound,
}

export const render = (file) => {
  const Page = PAGES[file]
  return renderToString(<Page />)
}
