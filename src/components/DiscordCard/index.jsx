import { DISCORD_INVITE_URL, DISCORD_LIVE } from '../../config/site'

// showBeforeLaunch: the giveaway page's draft preview shows the card so it can be tested.
export default function DiscordCard({ showBeforeLaunch = false }) {
  if (!DISCORD_INVITE_URL || (!DISCORD_LIVE && !showBeforeLaunch)) return null

  return (
    <a
      href={DISCORD_INVITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#5865F2] text-white rounded-sm p-6 sm:p-8"
    >
      <span>
        <span className="block font-display text-4xl leading-none">Join the FPV Discord</span>
        <span className="block text-sm text-white/80 mt-3 max-w-md leading-relaxed">
          Ask questions, share clips and builds, and help other pilots out. Free, and open to everyone.
        </span>
      </span>
      <span className="text-sm font-medium whitespace-nowrap group-hover:translate-x-1 transition-transform">
        Join the server →
      </span>
    </a>
  )
}
