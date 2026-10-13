import { useState } from 'react'
import { ChevronDown, ChevronRight, Youtube } from 'lucide-react'
import {
  BUILD_PARTS,
  BUILD_EXTRAS,
  BUILD_HERO_IMAGE,
  BUILD_VIDEO_URL,
  BUILD_CHANNEL_URL,
  BUILD_CORE_COST,
  BUILD_EXTRAS_COST,
} from '../../data/builds'

function BuildHero() {
  const [imgError, setImgError] = useState(false)
  const videoHref = BUILD_VIDEO_URL || BUILD_CHANNEL_URL

  return (
    <div className="mb-3">
      {BUILD_HERO_IMAGE && !imgError ? (
        <img
          src={BUILD_HERO_IMAGE}
          alt="My finished 3.5&quot; freestyle build"
          onError={() => setImgError(true)}
          className="w-full aspect-video object-cover rounded-xl bg-white/5"
        />
      ) : (
        <div className="w-full aspect-video rounded-xl bg-white/5 border border-dashed border-white/15 flex items-center justify-center">
          <p className="text-xs text-white/30 text-center px-4">
            Finished-build photo — add <code className="text-white/45">finished_build.jpg</code> to /public/images
          </p>
        </div>
      )}
      <a
        href={videoHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 text-sm font-semibold"
      >
        <Youtube className="w-4 h-4 text-red-500" />
        {BUILD_VIDEO_URL ? 'Watch the build video' : 'Build video coming soon'}
      </a>
    </div>
  )
}

function PartRow({ part }) {
  const meta = [part.qty, part.price].filter(Boolean).join('  ·  ')
  const inner = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3 min-w-0">
        {part.image ? (
          <img
            src={part.image}
            alt={part.name}
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-white/5"
          />
        ) : (
          <div className="w-14 h-14 rounded-lg flex-shrink-0 bg-white/5" />
        )}
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">
            {part.category}
          </p>
          <p className="text-sm font-medium truncate">{part.name}</p>
          {meta && <p className="text-xs text-white/40 mt-0.5">{meta}</p>}
        </div>
      </div>
      {part.href ? (
        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0 ml-3" />
      ) : (
        <span className="text-[10px] text-white/25 border border-white/15 rounded px-1.5 py-0.5 leading-none flex-shrink-0 ml-3">
          link soon
        </span>
      )}
    </div>
  )

  const className =
    'flex items-center px-4 py-3 bg-white/5 border border-white/10 rounded-xl transition-all duration-200'

  if (!part.href) {
    return <div className={`${className} opacity-60`}>{inner}</div>
  }

  return (
    <a
      href={part.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} hover:bg-white/10 hover:border-white/20 group`}
    >
      {inner}
    </a>
  )
}

export default function BuildDropdown() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full">
      <BuildHero />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center justify-between w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 text-left"
      >
        <div>
          <p className="text-sm font-semibold">
            {open ? 'Hide parts list' : 'View full parts list'}
          </p>
          <p className="text-xs text-white/40 mt-0.5">≈ ${BUILD_CORE_COST} to build</p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-white/40 flex-shrink-0 ml-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="flex flex-col gap-3 mt-3">
          {BUILD_PARTS.map((part) => (
            <PartRow key={part.id} part={part} />
          ))}

          {BUILD_EXTRAS.length > 0 && (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mt-2 px-1">
                Also picked up
                <span className="text-white/25 normal-case tracking-normal font-normal">
                  {'  '}· + ≈ ${BUILD_EXTRAS_COST} in tools &amp; gear
                </span>
              </p>
              {BUILD_EXTRAS.map((part) => (
                <PartRow key={part.id} part={part} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
