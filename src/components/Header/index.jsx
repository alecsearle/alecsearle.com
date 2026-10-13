export default function Header() {
  return (
    <div className="flex flex-col items-center gap-4 pt-4">
      <img
        src="/images/alec-avatar.jpg"
        alt="alec_searle"
        className="w-24 h-24 rounded-full object-cover border-2 border-white/10" style={{ objectPosition: '50% 15%' }}
      />
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">@alec_searle</h1>
        <p className="text-sm text-white/50 mt-1">Beginner FPV Pilot | Documenting My Journey</p>
        <p className="text-xs text-white/30 mt-1">flying • learning • sharing</p>
      </div>
    </div>
  )
}
