import { CreditCard, MessageCircle } from 'lucide-react'

const KASPI_URL = 'https://pay.kaspi.kz/pay/gnbxjkqt'
const WHATSAPP_URL = 'https://wa.me/77086908909'

interface CtaBlockProps {
  compact?: boolean
}

export function CtaBlock({ compact = false }: CtaBlockProps) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3.5 sm:gap-4">
      <a
        href={KASPI_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-full min-h-[54px] items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-base sm:text-lg font-extrabold uppercase tracking-wide text-zinc-950 shadow-[0_0_30px_-5px_rgba(255,255,255,0.25)] transition-all duration-300 hover:bg-zinc-100 hover:shadow-[0_0_40px_-2px_rgba(255,255,255,0.4)] active:scale-95 touch-manipulation"
      >
        <CreditCard className="size-5 sm:size-6 shrink-0" aria-hidden="true" />
        <span>Оплата жасаймын</span>
      </a>

      {!compact && (
        <p className="text-pretty px-2 text-center text-xs sm:text-sm leading-relaxed text-zinc-400">
          Төлем жасағаннан кейін осы ватсап сілтемеге кіріп, чекті жіберіңіз{' '}
          <span aria-hidden="true">👇🏻</span>
        </p>
      )}

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full min-h-[54px] items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-6 py-4 text-base sm:text-lg font-extrabold uppercase tracking-wide text-white transition-all duration-300 hover:border-white/25 hover:bg-white/10 active:scale-95 touch-manipulation"
      >
        <MessageCircle className="size-5 sm:size-6 text-zinc-300 shrink-0" aria-hidden="true" />
        <span>Чек жіберемін</span>
      </a>
    </div>
  )
}
