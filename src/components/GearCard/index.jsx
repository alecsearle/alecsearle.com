import { ArrowUpRight, Play } from 'lucide-react'

function Badge({ children, tone }) {
  const tones = {
    fly: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/25',
    recommend: 'bg-sky-400/10 text-sky-300 border-sky-400/25',
  }
  return (
    <span className={`text-[10px] font-medium border rounded-full px-2 py-0.5 leading-none whitespace-nowrap ${tones[tone]}`}>
      {children}
    </span>
  )
}

export default function GearCard({ item, large = false }) {
  const linkClass =
    'inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors'

  return (
    <article
      className={`flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl ${large ? 'flex-col sm:flex-row' : ''}`}
    >
      <div
        className={`flex-shrink-0 rounded-lg bg-white/5 overflow-hidden flex items-center justify-center ${
          large ? 'w-full sm:w-40 aspect-[4/3] sm:aspect-square' : 'w-16 h-16'
        }`}
      >
        {item.image ? (
          <img src={item.image} alt="" loading="lazy" className="w-full h-full object-contain" />
        ) : (
          <span className="text-[10px] text-white/25 text-center px-1 leading-tight">{item.name}</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className={`font-semibold ${large ? 'text-base' : 'text-sm'}`}>{item.name}</h3>
          {item.fly && <Badge tone="fly">I fly this</Badge>}
          {item.recommend && <Badge tone="recommend">Recommended</Badge>}
        </div>
        {item.forWho && <p className="text-xs text-white/45 mt-1">For: {item.forWho}</p>}
        {item.blurb && <p className="text-sm text-white/70 mt-2 leading-relaxed">{item.blurb}</p>}

        {(item.href || item.videoId) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel={item.affiliate === false ? 'noopener noreferrer' : 'noopener noreferrer sponsored'}
                className={`${linkClass} bg-white text-black hover:bg-white/85`}
              >
                {item.store ? `Get it at ${item.store}` : 'Get it'}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {item.videoId && (
              <a
                href={`https://www.youtube.com/watch?v=${item.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} bg-white/5 border border-white/10 hover:bg-white/10`}
              >
                <Play className="w-3.5 h-3.5 text-red-500" fill="currentColor" />
                Watch my video
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
