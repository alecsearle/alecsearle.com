import { ChevronRight } from 'lucide-react'
import DiscordIcon from '../SocialLinks/DiscordIcon'
import { DISCORD_INVITE_URL, DISCORD_LIVE } from '../../config/site'

// showBeforeLaunch: the giveaway page's draft preview shows the card so it can be tested.
export default function DiscordCard({
  showBeforeLaunch = false,
  title = 'Join the FPV Discord',
  description = 'Ask questions, share clips and builds, and help other pilots out. Free, and open to everyone.',
}) {
  if (!DISCORD_INVITE_URL || (!DISCORD_LIVE && !showBeforeLaunch)) return null

  return (
    <a
      href={DISCORD_INVITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between w-full px-4 py-4 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/30 hover:border-[#5865F2]/50 rounded-xl transition-all duration-200 group"
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-lg bg-[#5865F2] flex items-center justify-center flex-shrink-0">
          <DiscordIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-white/55 mt-0.5 leading-snug">{description}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors flex-shrink-0 ml-3" />
    </a>
  )
}
