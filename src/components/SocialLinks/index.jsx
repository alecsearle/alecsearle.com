import { Instagram, Youtube } from 'lucide-react'
import TikTokIcon from './TikTokIcon'
import MakerWorldIcon from './MakerWorldIcon'
import DiscordIcon from './DiscordIcon'
import { DISCORD_INVITE_URL, DISCORD_LIVE, YOUTUBE_CHANNEL_URL } from '../../config/site'

export const SOCIALS = [
  { label: 'YouTube', href: YOUTUBE_CHANNEL_URL, Icon: Youtube },
  { label: 'Instagram', href: 'https://www.instagram.com/alec_searle/', Icon: Instagram },
  { label: 'TikTok', href: 'https://www.tiktok.com/@alec_searle', Icon: TikTokIcon },
  { label: 'MakerWorld', href: 'https://makerworld.com/en/collections/29512390-fpv-featured', Icon: MakerWorldIcon },
  { label: 'Discord', href: DISCORD_LIVE ? DISCORD_INVITE_URL : '', Icon: DiscordIcon },
].filter((s) => s.href)

// Icon + label row. Shown near the top of the homepage — videos point people here.
export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-x-7 gap-y-4 ${className}`}>
      {SOCIALS.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1.5 text-ink/70 hover:text-accent transition-colors"
          >
            <Icon className="w-7 h-7" />
            <span className="text-xs">{label}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
