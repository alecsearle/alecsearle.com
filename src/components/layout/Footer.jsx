import SocialLinks from '../SocialLinks'

export default function Footer({ socials = true }) {
  return (
    <footer className="border-t border-white/[0.06] mt-6">
      <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col items-center gap-6 text-center">
        {socials && <SocialLinks />}
        <p className="max-w-md text-xs text-white/45 leading-relaxed">
          Some gear links are affiliate links. If you buy through them I get a small cut, at no extra cost
          to you. I only link stuff I&apos;ve actually flown or tested.
        </p>
        <p className="text-[11px] text-white/30">© {new Date().getFullYear()} Alec Searle</p>
      </div>
    </footer>
  )
}
