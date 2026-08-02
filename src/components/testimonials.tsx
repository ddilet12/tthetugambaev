import { useState, useRef, type TouchEvent } from 'react'
import { ChevronLeft, ChevronRight, Eye, X } from 'lucide-react'

type TestimonialSlide = {
  id: number
  src: string
  fallbackSrc: string
  title: string
  badge: string
}

const testimonials: TestimonialSlide[] = [
  {
    id: 1,
    src: '/testimonials/review-1.webp',
    fallbackSrc: '/images/testimonials/review-1.webp',
    title: 'Оқушының пікірі & нәтижесі',
    badge: 'Нәтиже #1',
  },
  {
    id: 2,
    src: '/testimonials/review-2.webp',
    fallbackSrc: '/images/testimonials/review-2.webp',
    title: 'Рилс қаралымы мен отзыв',
    badge: 'Нәтиже #2',
  },
  {
    id: 3,
    src: '/testimonials/review-3.webp',
    fallbackSrc: '/images/testimonials/review-3.webp',
    title: 'Статистика мен кері байланыс',
    badge: 'Нәтиже #3',
  },
  {
    id: 4,
    src: '/testimonials/review-4.webp',
    fallbackSrc: '/images/testimonials/review-4.webp',
    title: 'Оқушының чаттағы пікірі',
    badge: 'Нәтиже #4',
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [selectedImg, setSelectedImg] = useState<string | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const go = (dir: number) => {
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length)
  }

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 50) {
      go(1)
    } else if (diff < -50) {
      go(-1)
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  const current = testimonials[index]

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 select-none">
      {/* Main card */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => setSelectedImg(current.src)}
        className="group relative aspect-[9/16] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-2xl cursor-pointer"
      >
        <img
          src={current.src}
          onError={(e) => {
            const target = e.currentTarget
            if (current.fallbackSrc && target.src !== window.location.origin + current.fallbackSrc) {
              target.src = current.fallbackSrc
            }
          }}
          alt={current.title}
          className="size-full object-contain bg-zinc-950/80 transition-transform duration-300 group-hover:scale-[1.02]"
          draggable={false}
        />

        {/* Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-xs font-extrabold uppercase tracking-wide text-zinc-950 shadow-lg">
          {current.badge}
        </div>

        {/* Tap to expand hint */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-zinc-200 border border-white/15 shadow-sm">
          <Eye className="size-3.5 text-zinc-300" aria-hidden="true" />
          <span>Үлкейту</span>
        </div>

        {/* Swipe prompt hint on mobile */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-[10px] font-medium text-zinc-300 border border-white/10 sm:hidden">
          Слайдтау үшін сүйреңіз 👈🏻👉🏻
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {testimonials.map((t, i) => (
            <button
              type="button"
              key={t.id}
              onClick={(e) => {
                e.stopPropagation()
                setIndex(i)
              }}
              aria-label={`Нәтиже ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-7 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Алдыңғы пікір"
          className="flex size-14 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:border-white/30 hover:bg-white/20 active:scale-95 touch-manipulation"
        >
          <ChevronLeft className="size-7" aria-hidden="true" />
        </button>
        <span className="text-sm font-bold text-zinc-400">
          {index + 1} / {testimonials.length}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Келесі пікір"
          className="flex size-14 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:border-white/30 hover:bg-white/20 active:scale-95 touch-manipulation"
        >
          <ChevronRight className="size-7" aria-hidden="true" />
        </button>
      </div>

      {/* Fullscreen Image Preview Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImg(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImg(null)}
            className="absolute top-5 right-5 z-50 flex size-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30 active:scale-95"
            aria-label="Жабу"
          >
            <X className="size-6" />
          </button>
          <img
            src={selectedImg}
            alt="Үлкейтілген фото"
            className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  )
}
