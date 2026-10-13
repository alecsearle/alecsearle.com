import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

// Light/dark switch. The initial class is set by the inline script in each
// page's <head>; this flips it and remembers the choice.
export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      // private mode etc. — the toggle still works for this visit
    }
    setDark(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-9 h-9 -mr-2 flex items-center justify-center rounded-full text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors flex-shrink-0"
    >
      {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  )
}
