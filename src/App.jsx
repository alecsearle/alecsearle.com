import PageShell from './components/layout/PageShell'
import Header from './components/Header'
import SocialLinks from './components/SocialLinks'
import HeroStrip from './components/HeroStrip'
import YouTubeCarousel from './components/YouTubeCarousel'
import AffiliateSection from './components/AffiliateSection'
import GiveawayBanner from './components/GiveawayBanner'
import DiscordCard from './components/DiscordCard'

export default function App() {
  return (
    <PageShell footerSocials={false}>
      <div className="max-w-xl mx-auto px-4 pt-10 pb-8 flex flex-col items-center gap-10">
        <GiveawayBanner />
        <Header />
        <SocialLinks />
        <DiscordCard />
      </div>

      <HeroStrip />

      <div className="max-w-xl mx-auto px-4 pt-10 pb-8 flex flex-col items-center gap-10">
        <YouTubeCarousel />
        <AffiliateSection />
      </div>
    </PageShell>
  )
}
