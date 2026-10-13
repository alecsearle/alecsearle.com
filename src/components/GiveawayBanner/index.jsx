import { ChevronRight, Gift } from 'lucide-react'
import { GIVEAWAY } from '../../config/site'

export default function GiveawayBanner() {
  if (GIVEAWAY.status !== 'open') return null

  return (
    <a
      href="/giveaway"
      className="flex items-center justify-between w-full px-4 py-3 bg-white text-black rounded-xl hover:bg-white/90 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Gift className="w-5 h-5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold">10K giveaway is open</p>
          <p className="text-xs text-black/60">Two drones up for grabs. Free to enter.</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 flex-shrink-0 ml-3" />
    </a>
  )
}
