// Stand-in for draft pages on the live site, so nothing leaks before launch.
export default function NothingHereYet() {
  return (
    <main className="min-h-screen bg-paper text-ink flex flex-col items-center justify-center gap-4 px-5 text-center">
      <p className="font-display text-4xl">Nothing here yet.</p>
      <a href="/" className="text-sm underline underline-offset-4 hover:text-accent">
        Back to alecsearle.com
      </a>
    </main>
  )
}
