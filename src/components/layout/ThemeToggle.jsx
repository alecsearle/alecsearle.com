import { Moon, Sun } from 'lucide-react'

// Light/dark switch. The initial class is set by the inline script in each
// page's <head>; this flips it and remembers the choice. The icon follows the
// class via CSS, so the prerendered HTML is right in either theme.
export default function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle('dark')
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      // private mode etc. — the toggle still works for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="w-11 h-11 -mr-3 flex items-center justify-center rounded-full text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors flex-shrink-0"
    >
      <Moon className="w-[18px] h-[18px] dark:hidden" />
      <Sun className="w-[18px] h-[18px] hidden dark:block" />
    </button>
  )
}
