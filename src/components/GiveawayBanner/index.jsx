import { GIVEAWAY } from '../../config/site'

export default function GiveawayBanner() {
  if (GIVEAWAY.status !== 'open') return null

  return (
    <a href="/giveaway" className="block bg-accent text-white hover:bg-[#c02f17] transition-colors">
      <span className="max-w-page mx-auto px-5 sm:px-8 py-3 flex items-center justify-between gap-4 text-sm">
        <span>
          <strong className="font-semibold">The 10K giveaway is open.</strong>{' '}
          <span className="text-white/85">Two drones, free to enter.</span>
        </span>
        <span className="font-medium whitespace-nowrap">Enter →</span>
      </span>
    </a>
  )
}
