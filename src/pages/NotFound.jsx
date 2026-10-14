import { useEffect, useRef } from 'react'
import PageShell from '../components/layout/PageShell'

// Analog static, like the goggle feed when the video signal drops. Drawn tiny
// and scaled up so it stays cheap; a single still frame if the visitor
// prefers less motion.
function Static() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    const frame = ctx.createImageData(width, height)
    const draw = () => {
      for (let i = 0; i < frame.data.length; i += 4) {
        const v = Math.random() * 255
        frame.data[i] = frame.data[i + 1] = frame.data[i + 2] = v
        frame.data[i + 3] = 255
      }
      ctx.putImageData(frame, 0, 0)
    }

    draw()
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let id
    let last = 0
    const loop = (t) => {
      if (t - last > 50) {
        draw()
        last = t
      }
      id = requestAnimationFrame(loop)
    }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <canvas
      ref={ref}
      width={160}
      height={90}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full opacity-40 [image-rendering:pixelated]"
    />
  )
}

// The goggle screen: static plus a Betaflight-style OSD, mid-failsafe.
// The "404m" is the distance-from-home readout.
function GoggleFeed() {
  const text = 'font-mono tracking-wider text-white [text-shadow:0_0_2px_#000,0_0_4px_#000]'
  const osd = `${text} absolute text-xs sm:text-base`
  return (
    <div className="relative aspect-video overflow-hidden rounded-sm bg-[#111]">
      <Static />
      <span className={`${osd} top-[6%] left-[4%]`}>LQ 0</span>
      <span className={`${osd} top-[6%] right-[4%]`}>3.31V</span>
      <span className={`${osd} bottom-[6%] left-[4%]`}>04:04</span>
      <span className={`${osd} bottom-[6%] right-[4%]`}>⌂ 404m</span>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className={`${text} text-2xl sm:text-5xl font-bold animate-pulse motion-reduce:animate-none`}>
          FAILSAFE
        </span>
        <span className={`${text} text-xs sm:text-base`}>RXLOSS</span>
      </div>
    </div>
  )
}

const ELSEWHERE = [
  { label: 'Gear', href: '/gear' },
  { label: 'Learn', href: '/learn' },
  { label: 'Builds', href: '/builds' },
]

// Served by Vercel for any URL that doesn't exist (dist/404.html).
export default function NotFound() {
  return (
    <PageShell>
      <section className="max-w-page mx-auto px-5 sm:px-8 pt-10 sm:pt-16 grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <GoggleFeed />
        </div>
        <div className="lg:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Error 404</p>
          <h1 className="font-display text-5xl sm:text-6xl leading-[1.02] tracking-tight mt-3">Signal lost.</h1>
          <p className="text-lg text-ink/70 leading-relaxed mt-6">
            This page doesn&apos;t exist, or it&apos;s stuck in a tree somewhere. Either way, it&apos;s not coming
            back on its own.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full bg-ink text-paper hover:bg-accent transition-colors mt-8"
          >
            GPS Rescue: take me home →
          </a>
          <p className="text-sm text-ink/60 mt-6">
            Or try{' '}
            {ELSEWHERE.map((link, i) => (
              <span key={link.href}>
                {i > 0 && (i === ELSEWHERE.length - 1 ? ' or ' : ', ')}
                <a href={link.href} className="text-ink underline underline-offset-4 decoration-ink/25 hover:decoration-accent hover:text-accent transition-colors">
                  {link.label}
                </a>
              </span>
            ))}
            .
          </p>
        </div>
      </section>
    </PageShell>
  )
}
