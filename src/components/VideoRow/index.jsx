export const videoUrl = (video) =>
  video.short ? `https://www.youtube.com/shorts/${video.id}` : `https://www.youtube.com/watch?v=${video.id}`

// Compact playlist-style row: small thumbnail, title, length.
export default function VideoRow({ video }) {
  return (
    <a
      href={videoUrl(video)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-2 pr-3 rounded-xl hover:bg-white/5 transition-colors group"
    >
      <div className="relative w-28 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-white/5">
        <img
          src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute bottom-1 right-1 text-[10px] font-medium bg-black/80 rounded px-1 leading-4">
          {video.length}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-sm leading-snug line-clamp-2 text-white/85 group-hover:text-white">
          {video.part && <span className="text-white/40 mr-1">Pt. {video.part}</span>}
          {video.title}
        </p>
        <p className="mt-1 flex items-center gap-2 text-[11px] text-white/40">
          {video.short && <span className="border border-white/15 rounded px-1 leading-4">Short</span>}
          {video.note}
        </p>
      </div>
    </a>
  )
}
