import { Instagram, Youtube } from 'lucide-react'
import TikTokIcon from './TikTokIcon'
import MakerWorldIcon from './MakerWorldIcon'
import DiscordIcon from './DiscordIcon'
import { DISCORD_INVITE_URL, DISCORD_LIVE, YOUTUBE_CHANNEL_URL } from '../../config/site'

export const SOCIALS = [
  { label: 'YouTube', href: YOUTUBE_CHANNEL_URL, Icon: Youtube, hover: 'group-hover:text-red-500' },
  { label: 'Instagram', href: 'https://www.instagram.com/alec_searle/', Icon: Instagram, hover: 'group-hover:text-pink-500' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@alec_searle', Icon: TikTokIcon, hover: 'group-hover:text-[#b3a9f6]' },
  { label: 'MakerWorld', href: 'https://makerworld.com/en/collections/29512390-fpv-featured', Icon: MakerWorldIcon, hover: 'group-hover:text-[#00AE42]' },
  { label: 'Discord', href: DISCORD_LIVE ? DISCORD_INVITE_URL : '', Icon: DiscordIcon, hover: 'group-hover:text-[#5865F2]' },
].filter((s) => s.href)

// Icon + label row. Shown near the top of the homepage — videos point people here.
export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-x-7 gap-y-4 ${className}`}>
      {SOCIALS.map(({ label, href, Icon, hover }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1.5"
          >
            {/* Each icon lights up in its brand colour on hover; the label stays put. */}
            <Icon className={`w-7 h-7 text-ink/60 transition-colors duration-200 ${hover}`} />
            <span className="text-xs text-ink/60 group-hover:text-ink transition-colors">{label}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
