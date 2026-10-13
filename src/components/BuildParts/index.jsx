import { useState } from 'react'
import { BUILD_PARTS, BUILD_EXTRAS, BUILD_CORE_COST, BUILD_EXTRAS_COST } from '../../data/builds'

function PartRow({ part }) {
  const meta = [part.qty, part.price].filter(Boolean).join(' · ')
  const inner = (
    <>
      <span className="w-14 h-14 bg-tile rounded-sm flex items-center justify-center overflow-hidden flex-shrink-0">
        {part.image && <img src={part.image} alt="" loading="lazy" className="w-full h-full object-cover" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-ink/60">{part.category}</span>
        <span className="block text-base leading-snug group-hover:text-accent transition-colors">{part.name}</span>
        {meta && <span className="block text-xs text-ink/60 mt-0.5">{meta}</span>}
      </span>
      <span className="text-sm text-ink/40 group-hover:text-accent transition-colors flex-shrink-0">
        {part.href ? '↗' : 'link soon'}
      </span>
    </>
  )
  const className = 'group flex items-center gap-4 py-3'
  return (
    <li className="border-b border-ink/10">
      {part.href ? (
        <a href={part.href} target="_blank" rel="noopener noreferrer sponsored" className={className}>
          {inner}
        </a>
      ) : (
        <div className={`${className} opacity-60`}>{inner}</div>
      )}
    </li>
  )
}

// "View full parts list" toggle + the list itself.
export default function BuildParts() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 border-y border-ink/15 py-4 text-left group"
      >
        <span>
          <span className="block text-base font-medium group-hover:text-accent transition-colors">
            {open ? 'Hide parts list' : 'View full parts list'}
          </span>
          <span className="block text-xs text-ink/60 mt-0.5">≈ ${BUILD_CORE_COST} to build</span>
        </span>
        <span className={`text-xl text-ink/40 transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>

      {open && (
        <div className="mt-2">
          <ul>
            {BUILD_PARTS.map((part) => (
              <PartRow key={part.id} part={part} />
            ))}
          </ul>
          {BUILD_EXTRAS.length > 0 && (
            <>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60 mt-8">
                Also picked up{' '}
                <span className="normal-case tracking-normal text-ink/60">· + ≈ ${BUILD_EXTRAS_COST} in tools &amp; gear</span>
              </p>
              <ul className="mt-1">
                {BUILD_EXTRAS.map((part) => (
                  <PartRow key={part.id} part={part} />
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  )
}
