export const videoUrl = (video) =>
  video.short ? `https://www.youtube.com/shorts/${video.id}` : `https://www.youtube.com/watch?v=${video.id}`

// One line in an editorial video list: thumbnail, title, length.
export default function VideoRow({ video, index }) {
  return (
    <li>
      <a
        href={videoUrl(video)}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[7.5rem_1fr] sm:grid-cols-[2rem_9rem_1fr_auto] gap-x-4 sm:gap-x-5 items-center py-4"
      >
        <span className="hidden sm:block text-sm text-ink/35 tabular-nums">
          {(video.part ?? index) != null && String(video.part ?? index).padStart(2, '0')}
        </span>
        <span className="block aspect-video overflow-hidden rounded-sm bg-ink/5">
          <img
            src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        </span>
        <span className="min-w-0">
          <span className="block text-base leading-snug group-hover:text-accent transition-colors">
            {video.title}
          </span>
          <span className="block text-xs text-ink/45 mt-1">
            {video.length}
            {video.short && ' · Short'}
            {video.note && ` · ${video.note}`}
          </span>
        </span>
        <span className="hidden sm:block text-ink/30 group-hover:text-accent transition-colors">↗</span>
      </a>
    </li>
  )
}
