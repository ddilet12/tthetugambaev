import { useState } from 'react'
import { Eye, X } from 'lucide-react'

import bonusImg from '../assets/bonus-image.webp'

export function BonusesSection() {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  return (
    <div className="w-full flex justify-center">
      {/* Clean Bonus Photo Container */}
      <div className="group relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-zinc-950 shadow-2xl">
        <img
          src={bonusImg}
          alt="Бонустар фотосы"
          className="w-full h-auto object-cover cursor-pointer transition-transform duration-500 group-hover:scale-[1.02]"
          onClick={() => setFullscreenImage(bonusImg)}
        />

        {/* Zoom button on hover */}
        <button
          onClick={() => setFullscreenImage(bonusImg)}
          className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-zinc-950/70 text-white hover:bg-white hover:text-zinc-950 border border-white/20 backdrop-blur-md transition-all shadow-lg active:scale-95"
          aria-label="Үлкейту"
        >
          <Eye className="size-5" />
        </button>
      </div>

      {/* Lightbox Modal */}
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
            alt="Бонустар фотосы"
            className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain border border-white/10 shadow-2xl"
          />
        </div>
      )}
    </div>
  )
}
