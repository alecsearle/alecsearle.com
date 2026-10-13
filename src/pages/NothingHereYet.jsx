// Stand-in for draft pages on the live site, so nothing leaks before launch.
export default function NothingHereYet() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm text-white/60">Nothing here yet.</p>
      <a href="/" className="text-sm font-medium underline underline-offset-4 hover:text-white/80">
        Back to alecsearle.com
      </a>
    </main>
  )
}
