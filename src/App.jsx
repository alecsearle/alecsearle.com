import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header'
import SocialLinks from './components/SocialLinks'
import HeroStrip from './components/HeroStrip'
import YouTubeCarousel from './components/YouTubeCarousel'
import AffiliateSection from './components/AffiliateSection'
import GiveawayBanner from './components/GiveawayBanner'
import DiscordCard from './components/DiscordCard'

export default function App() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-xl mx-auto px-4 pt-12 pb-8 flex flex-col items-center gap-10">
        <GiveawayBanner />
        <Header />
        <SocialLinks />
        <DiscordCard />
      </div>

      <HeroStrip />

      <div className="max-w-xl mx-auto px-4 pt-10 pb-14 flex flex-col items-center gap-10">
        <YouTubeCarousel />
        <AffiliateSection />
      </div>
      <Analytics />
    </main>
  )
}
