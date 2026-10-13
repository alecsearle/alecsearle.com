import { Youtube, Instagram } from 'lucide-react'
import TikTokIcon from './TikTokIcon'
import MakerWorldIcon from './MakerWorldIcon'
import DiscordIcon from './DiscordIcon'
import { DISCORD_INVITE_URL, DISCORD_LIVE } from '../../config/site'

const SOCIALS = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@alec_searle',
    Icon: Youtube,
    hoverColor: 'hover:text-red-500',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/alec_searle/',
    Icon: Instagram,
    hoverColor: 'hover:text-pink-400',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@alec_searle',
    Icon: TikTokIcon,
    hoverColor: 'hover:text-white',
  },
  {
    label: 'MakerWorld',
    href: 'https://makerworld.com/en/collections/29512390-fpv-featured',
    Icon: MakerWorldIcon,
    hoverColor: '',
  },
  {
    label: 'Discord',
    href: DISCORD_LIVE ? DISCORD_INVITE_URL : '',
    Icon: DiscordIcon,
    hoverColor: 'hover:text-[#5865F2]',
  },
].filter((social) => social.href)

function SocialButton({ label, href, Icon, hoverColor }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group flex flex-col items-center gap-1 text-white/50 transition-colors duration-200 ${hoverColor}`}
    >
      <Icon className="w-7 h-7" />
      <span className="text-[10px] font-light tracking-wide text-white/50">{label}</span>
    </a>
  )
}

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
      {SOCIALS.map((social) => (
        <SocialButton key={social.label} {...social} />
      ))}
    </div>
  )
}
