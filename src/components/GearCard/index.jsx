import { ButtonLink, TextLink } from '../ui/Editorial'

export function GearImage({ item, className = '' }) {
  return (
    <div className={`bg-tile rounded-sm flex items-center justify-center overflow-hidden ${className}`}>
      {item.image ? (
        <img src={item.image} alt="" loading="lazy" className="w-[86%] h-[86%] object-contain" />
      ) : (
        <span className="font-display text-xl text-ink/50 text-center px-4">{item.name}</span>
      )}
    </div>
  )
}

export function GearLabels({ item }) {
  const labels = [item.fly && 'I fly this', item.recommend && 'Recommended'].filter(Boolean)
  if (!labels.length) return null
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.14em]">
      {labels.map((label, i) => (
        <span key={label} className={label === 'I fly this' ? 'text-accent' : 'text-ink/60'}>
          {i > 0 && <span className="text-ink/40 mx-1.5">/</span>}
          {label}
        </span>
      ))}
    </p>
  )
}

export function GearLinks({ item, solid = false }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {item.href && (
        <ButtonLink href={item.href} sponsored={item.affiliate !== false} solid={solid}>
          {item.store ? `Buy at ${item.store}` : 'Buy'} ↗
        </ButtonLink>
      )}
      {item.videoId && (
        <TextLink href={`https://www.youtube.com/watch?v=${item.videoId}`} className="py-2">
          Watch my video ↗
        </TextLink>
      )}
    </div>
  )
}

// Grid tile: image on top, text underneath. No box.
export default function GearCard({ item }) {
  return (
    <article className="grid grid-cols-[6rem_1fr] gap-x-4 items-start sm:flex sm:flex-col sm:items-stretch">
      <GearImage item={item} className="aspect-square sm:aspect-[4/3]" />
      <div className="sm:mt-4 flex flex-col gap-2">
        <GearLabels item={item} />
        <h3 className="text-lg font-medium leading-snug">{item.name}</h3>
        {item.forWho && <p className="text-sm text-ink/60">For {item.forWho.charAt(0).toLowerCase() + item.forWho.slice(1)}</p>}
        {item.blurb && <p className="text-sm text-ink/80 leading-relaxed">{item.blurb}</p>}
        <div className="mt-1">
          <GearLinks item={item} />
        </div>
      </div>
    </article>
  )
}

// Big two-column feature (image + text), for the one product a section leads with.
export function GearFeature({ item, eyebrow }) {
  return (
    <article className="grid gap-6 sm:grid-cols-2 sm:items-center">
      <GearImage item={item} className="aspect-[4/3] sm:aspect-square" />
      <div className="flex flex-col gap-3">
        {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60">{eyebrow}</p>}
        <h3 className="font-display text-3xl leading-tight">{item.name}</h3>
        <GearLabels item={item} />
        <p className="text-base text-ink/80 leading-relaxed">{item.blurb}</p>
        {item.forWho && (
          <p className="text-sm text-ink/60">For {item.forWho.charAt(0).toLowerCase() + item.forWho.slice(1)}</p>
        )}
        <div className="mt-2">
          <GearLinks item={item} solid />
        </div>
      </div>
    </article>
  )
}
