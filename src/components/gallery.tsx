import { useState, useRef, type TouchEvent } from 'react'
import { ChevronLeft, ChevronRight, Eye, Grid, Maximize2, X } from 'lucide-react'

import work1 from '../assets/portfolio/work-1.webp'

import img1056 from '../assets/portfolio/IMG_1056.JPG.webp'
import img1057 from '../assets/portfolio/IMG_1057.JPG.webp'
import img1058 from '../assets/portfolio/IMG_1058.JPG.webp'
import img1059 from '../assets/portfolio/IMG_1059.JPG.webp'
import img1060 from '../assets/portfolio/IMG_1060.JPG.webp'
import img1067 from '../assets/portfolio/IMG_1067.webp'
import img1068 from '../assets/portfolio/IMG_1068.JPG.webp'

type Slide = {
  src: string
  alt: string
  label: string
  category: string
}

const slides: Slide[] = [
  { src: img1068, alt: 'Диас Тугамбаев - Рилс продюсер портфолиосы', label: 'Диас Тугамбаев', category: 'Кейс' },
  { src: img1067, alt: 'Сторителл және динамика', label: 'Динамикалық рилс', category: 'Сторителл' },
  { src: img1059, alt: 'Визуалды контент жасау', label: 'Рилс түсірілімі', category: 'Видео съемка' },
  { src: img1060, alt: 'Кәсіби монтаж және эффектілер', label: 'Монтаж & Бояу', category: 'Монтаж' },
  { src: img1056, alt: 'Креативті видео концепт', label: 'Креатив Видео', category: 'Концепт' },
  { src: img1057, alt: 'Контент стратегиясы және визуал', label: 'Визуал Стратегия', category: 'Стратегия' },
  { src: work1, alt: 'Өтімді рилс субтитр', label: 'Өтімді рилс', category: 'Оформление' },
  { src: img1058, alt: 'Мобильді съемка процессоры', label: 'Мобилография', category: 'Мобильдік' },
]

export function Gallery() {
  const [index, setIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider')
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const go = (dir: number) => {
    setIndex((prev) => (prev + dir + slides.length) % slides.length)
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

  const current = slides[index % slides.length] || slides[0]

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 select-none">
      {/* Mode Toggle Bar */}
      <div className="flex items-center justify-between w-full px-2">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Барлығы: {slides.length} жұмыс
        </span>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] p-1 backdrop-blur-md">
          <button
            onClick={() => setViewMode('slider')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all ${
              viewMode === 'slider'
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Maximize2 className="size-3.5" />
            Слайдер
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Grid className="size-3.5" />
            Сетка
          </button>
        </div>
      </div>

      {viewMode === 'slider' ? (
        <div className="w-full flex flex-col items-center gap-4">
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="group relative aspect-[16/9] sm:aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-2xl cursor-grab active:cursor-grabbing"
          >
            <img
              src={current.src}
              alt={current.alt}
              onClick={() => setFullscreenImage(current.src)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
            />

            {/* Eye Zoom Button */}
            <button
              onClick={() => setFullscreenImage(current.src)}
              className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-zinc-950/60 text-white hover:bg-white hover:text-zinc-950 backdrop-blur-md border border-white/10 transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 active:scale-95"
              aria-label="Үлкейту"
            >
              <Eye className="size-4" />
            </button>

            {/* Nav Arrows */}
            <button
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-white/10 bg-zinc-950/60 text-white backdrop-blur-md opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"
              aria-label="Алдыңғы фото"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-white/10 bg-zinc-950/60 text-white backdrop-blur-md opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"
              aria-label="Келесі фото"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 mt-2">
            {slides.map((s, i) => (
              <button
                key={s.src}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Слайд ${i + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
          {slides.map((s, idx) => (
            <div
              key={s.src}
              onClick={() => {
                setIndex(idx)
                setFullscreenImage(s.src)
              }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md cursor-pointer hover:border-white/30 transition-all shadow-md"
            >
              <img
                src={s.src}
                alt={s.alt}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-5 right-5 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-zinc-950 transition-all"
            aria-label="Жабу"
          >
            <X className="size-6" />
          </button>
          <img
            src={fullscreenImage}
            alt="Үлкейтілген сурет"
            className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain border border-white/10 shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  )
}
