// Fills each built page's empty #root with its rendered HTML, so visitors see
// the page before the JavaScript loads. Runs after `vite build`.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

const ssrDir = resolve('dist-ssr')
const { PAGES, render } = await import(resolve(ssrDir, 'prerender.js'))

for (const file of Object.keys(PAGES)) {
  const path = resolve('dist', file)
  const html = readFileSync(path, 'utf8')
  if (!html.includes('<div id="root"></div>')) throw new Error(`No empty #root in ${file}`)
  writeFileSync(path, html.replace('<div id="root"></div>', `<div id="root">${render(file)}</div>`))
  console.log(`prerendered ${file}`)
}

rmSync(ssrDir, { recursive: true, force: true })
