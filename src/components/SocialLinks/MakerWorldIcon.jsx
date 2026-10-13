// The MakerWorld logo file is white-on-transparent, so it's used as a mask
// and takes the current text colour (works in light and dark mode).
export default function MakerWorldIcon({ className }) {
  return (
    <span
      aria-hidden="true"
      className={`icon-mask inline-block ${className}`}
      style={{ '--icon': 'url(/images/makerworld-logo.png)' }}
    />
  )
}
