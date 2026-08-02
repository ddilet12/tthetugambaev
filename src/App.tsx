import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Check, Clock, Camera, MessageCircle, Zap, CreditCard, ArrowDown } from 'lucide-react'
import { CtaBlock } from './components/cta-block'
import { Gallery } from './components/gallery'
import { Testimonials } from './components/testimonials'
import { ModulesSection } from './components/modules-section'
import { BonusesSection } from './components/bonuses-section'
import heroImg from './assets/hero-creator.webp'

const KASPI_URL = 'https://pay.kaspi.kz/pay/gnbxjkqt'
const WHATSAPP_URL = 'https://wa.me/77086908909'

const accessInfo = [
  { icon: Zap, label: 'Доступ', value: 'Бірден беріледі' },
  { icon: Clock, label: 'Формат', value: 'Онлайн сабақтар Telegram каналда сақталған' },
  { icon: Check, label: 'Доступ мерзімі', value: 'Шексіз доступ' },
]

export default function App() {
  const [showStickyBar, setShowStickyBar] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowStickyBar(true)
      } else {
        setShowStickyBar(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground pb-28 sm:pb-16 selection:bg-white/20">
      {/* Translucent neutral background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] sm:h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_70%)]"
      />

      {/* Floating Sticky Mobile Quick Action Bar */}
      <div
        className={`fixed bottom-3 inset-x-3 z-50 transition-all duration-300 transform sm:hidden ${
          showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2 p-2 rounded-full border border-white/20 bg-zinc-950/90 backdrop-blur-xl shadow-2xl">
          <a
            href={KASPI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 rounded-full bg-white py-3 px-4 text-xs font-extrabold uppercase tracking-wide text-zinc-950 active:scale-95 transition-transform"
          >
            <CreditCard className="size-4 shrink-0" aria-hidden="true" />
            <span>Оплата жасау</span>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp чек жіберу"
            className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white active:scale-95 shrink-0"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto flex max-w-2xl flex-col items-center px-4 sm:px-6 pt-10 sm:pt-14 text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 sm:mb-4 inline-flex items-center justify-center gap-2.5 sm:gap-3.5 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.25)]"
        >
          <Zap className="size-7 sm:size-9 md:size-10 text-white shrink-0 fill-white/20" aria-hidden="true" />
          <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
            Reels Terminator
          </span>
        </motion.span>

        {/* Small blocks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-md mx-auto"
        >
          {[
            'Блог',
            'Рилс',
            'Личный бренд',
            'Орта',
            'Тұрақтылық',
            'Жүйе',
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-md px-3.5 py-2 text-xs sm:text-sm font-bold tracking-wide text-zinc-100 shadow-sm hover:border-white/20 hover:bg-white/10 transition-all"
            >
              <span className="size-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative mt-8 sm:mt-10 w-full max-w-[280px] xs:max-w-xs"
        >
          <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-white/10 blur-3xl" />
          <div className="overflow-hidden rounded-[2rem] border-4 border-white/10 shadow-2xl">
            <img
              src={heroImg}
              onError={(e) => {
                const target = e.currentTarget
                if (target.src !== window.location.origin + '/hero-creator.webp') {
                  target.src = '/hero-creator.webp'
                }
              }}
              alt="REELS TERMINATOR курсының авторы рилс жазып жатыр"
              className="aspect-[3/4] w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 w-full flex justify-center"
        >
          <a
            href="#payment"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('payment')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group flex w-full max-w-md min-h-[56px] items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base sm:text-lg font-extrabold uppercase tracking-wide text-zinc-950 shadow-[0_0_35px_-5px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-zinc-100 hover:shadow-[0_0_45px_-2px_rgba(255,255,255,0.5)] active:scale-95 touch-manipulation"
          >
            <span>Тіркелемін</span>
            <ArrowDown className="size-5 shrink-0 transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </section>

      {/* Modules Program */}
      <motion.section
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mx-auto mt-16 sm:mt-24 max-w-3xl px-4 sm:px-6"
      >
        <div className="mb-2 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            Бағдарлама
          </span>
        </div>
        <h2 className="mb-8 sm:mb-10 text-balance text-center text-2xl xs:text-3xl font-extrabold uppercase tracking-tight sm:text-4xl text-white">
          Курс бағдарламасы
        </h2>

        <ModulesSection />
      </motion.section>

      {/* Access info */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-16 sm:mt-20 max-w-2xl px-4 sm:px-6"
      >
        <div className="grid gap-3 sm:gap-4">
          {accessInfo.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 sm:p-5 transition-all duration-300 hover:border-white/20"
            >
              <span className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                <item.icon className="size-4 sm:size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {item.label}
                </p>
                <p className="text-sm sm:text-base font-semibold text-white">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Special offer + CTA */}
      <motion.section
        id="payment"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mx-auto mt-16 sm:mt-20 max-w-2xl px-4 sm:px-6"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-12 text-center shadow-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_70%)]"
          />
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 shadow-inner mb-3">
            <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Арнайы ұсыныс</span>
          </div>
          <h2 className="text-balance text-2xl xs:text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl text-white">
            Алғашқы <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">100 адамға</span> арнайы ұсыныс
          </h2>

          {/* High-impact Price Card */}
          <div className="my-6 sm:my-8 inline-flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 backdrop-blur-md shadow-xl w-full max-w-md">
            <div className="flex items-center justify-center gap-3">
              <span className="text-lg sm:text-xl font-bold text-zinc-500 line-through decoration-red-500/80 decoration-2">
                50 000 ₸
              </span>
              <span className="inline-flex items-center rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-extrabold text-red-400 border border-red-500/30">
                -70%
              </span>
            </div>
            <div className="mt-1 flex items-baseline justify-center gap-1">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]">
                14 990
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-300">₸</span>
            </div>
          </div>
          <div className="mt-6 sm:mt-8">
            <CtaBlock />
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mx-auto mt-16 sm:mt-24 max-w-4xl px-4 sm:px-6"
      >
        <div className="mb-2.5 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            Нәтижелер
          </span>
        </div>
        <h2 className="mb-8 sm:mb-10 text-balance text-center text-2xl xs:text-3xl font-extrabold uppercase tracking-tight sm:text-4xl text-white">
          Студенттердің <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent underline decoration-white/20 underline-offset-4 sm:underline-offset-8">пікірлері</span>
        </h2>
        <Testimonials />
      </motion.section>

      {/* Gallery */}
      <motion.section
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mx-auto mt-16 sm:mt-24 max-w-4xl px-4 sm:px-6"
      >
        <h2 className="mb-8 sm:mb-10 text-balance text-center text-2xl xs:text-3xl font-extrabold uppercase tracking-tight sm:text-4xl text-white">
          Портфолио
        </h2>
        <Gallery />
      </motion.section>

      {/* Bonuses Section */}
      <motion.section
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mx-auto mt-16 sm:mt-24 max-w-3xl px-4 sm:px-6"
      >
        <BonusesSection />
      </motion.section>

      {/* Repeat CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-16 sm:mt-24 max-w-2xl px-4 sm:px-6"
      >
        <CtaBlock />
      </motion.section>

      {/* Closing */}
      <motion.section
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-16 sm:mt-24 max-w-2xl px-4 sm:px-6 text-center"
      >
        <h2 className="text-balance text-xl xs:text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-3xl text-white">
          Бұл курс арқылы рилсты тұрақты бастап кетеді деген{' '}
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent underline decoration-white/20 underline-offset-4 sm:underline-offset-8">
            сенімдемін!
          </span>
        </h2>
        <p className="mt-3.5 sm:mt-4 text-pretty text-base sm:text-lg text-zinc-400">
          Керекті барлық ақпарат қамтылған! Ал курста кездескенше{' '}
          <span aria-hidden="true">✌🏻</span>
        </p>
        <p className="mt-5 sm:mt-6 text-sm sm:text-base font-semibold text-zinc-300">
          Менің Instagram парақшама тіркеліп ал{' '}
          <span aria-hidden="true">👇🏻</span>
        </p>

        <div className="mx-auto mt-5 sm:mt-6 flex w-full max-w-md flex-col gap-3.5 sm:flex-row">
          <a
            href="https://www.instagram.com/thetugambaev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-white px-6 py-4 font-extrabold uppercase tracking-wide text-zinc-950 shadow-[0_0_25px_-5px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-zinc-100 active:scale-95 touch-manipulation min-h-[52px]"
          >
            <Camera className="size-5 shrink-0" aria-hidden="true" />
            <span>Instagram</span>
          </a>
          <a
            href="https://wa.me/77086908909"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-6 py-4 font-extrabold uppercase tracking-wide text-white transition-all duration-300 hover:border-white/25 hover:bg-white/10 active:scale-95 touch-manipulation min-h-[52px]"
          >
            <MessageCircle className="size-5 text-zinc-300 shrink-0" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
        </div>
      </motion.section>

      <footer className="mt-16 sm:mt-24 border-t border-white/10 py-8 sm:py-10 text-center">
        <p className="text-base sm:text-lg font-extrabold uppercase tracking-[0.2em] text-white">
          Reels <span className="text-zinc-400">Terminator</span>
        </p>
        <p className="mt-2 text-xs sm:text-sm text-zinc-500">
          {'© '}
          {new Date().getFullYear()} thetugambaev
        </p>
      </footer>
    </main>
  )
}

