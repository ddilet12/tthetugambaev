import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, BookOpen, Gift, Sparkles, CheckCircle2 } from 'lucide-react'

import filmingImg from '../assets/modules/filming.webp'
import editingImg from '../assets/modules/editing.webp'
import growthImg from '../assets/modules/growth.webp'

type Lesson = {
  code: string
  text: string
}

type ModuleData = {
  id: number
  badge: string
  title: string
  subtitle: string
  image?: string
  fallbackImage?: string
  lessons: Lesson[]
  bonus?: string
}

const modulesData: ModuleData[] = [
  {
    id: 1,
    badge: 'Модуль 1',
    title: 'Дайындық & Сенімділік',
    subtitle: 'Рилс бастауға дайындық және қорқынышты жеңу',
    image: filmingImg,
    fallbackImage: '/modules/filming.webp',
    lessons: [
      {
        code: '0.1',
        text: 'Осы сабақтардан қалай 100% пайда алуға болады. Рилсты не үшін дәл қазір бастау керек.',
      },
      {
        code: '0.2',
        text: 'Рилс бастауға кедергілер. Қорқынышты жеңуге арналған техника.',
      },
      {
        code: '0.3',
        text: 'Камераға деген сенімділік. Қорқынышты жою!',
      },
    ],
  },
  {
    id: 2,
    badge: 'Модуль 2',
    title: 'Идея, Сценарий & Контент',
    subtitle: 'Ататын рилстарға идея табу және сторителл жазу',
    image: editingImg,
    fallbackImage: '/modules/editing.webp',
    lessons: [
      {
        code: '0.1',
        text: 'Распаковка личности. Өзіміздің историямыздан контент алу жолы.',
      },
      {
        code: '0.2',
        text: 'Формат рилс. Өзімізге ыңғайлы формат таңдау.',
      },
      {
        code: '0.3',
        text: 'Идея табу жолдары. Күніне 7 рилсқа идея қайдан аламыз?',
      },
      {
        code: '0.4',
        text: 'Идеяны нақты өзімізге бұрып сценарий құру.',
      },
      {
        code: '0.5',
        text: 'Настройка рекомендации.',
      },
      {
        code: '0.6',
        text: 'Сторителл жазу.',
      },
      {
        code: '0.7',
        text: 'Өтімді рилс сценарий құрау. Структура!',
      },
      {
        code: '0.8',
        text: 'Аналитика жасау! Атқан рилстарға разбор!',
      },
    ],
  },
  {
    id: 3,
    badge: 'Модуль 3',
    title: 'Түсірілім & Монтаж',
    subtitle: 'Әдемі ракурс, жеңіл сьемка және кәсіби монтаж',
    image: growthImg,
    fallbackImage: '/modules/growth.webp',
    lessons: [
      {
        code: '0.1',
        text: 'Ракурс қою. Өзімізге ыңғайлы ракурспен түсіру. Кез-келген жерден әдемі локация құрап алу.',
      },
      {
        code: '0.2',
        text: 'Рилс түсірілімі. Қалай жеңіл сьемка жасаймыз? Күніне 7 рилс сьемкасын ұйымдастыру.',
      },
      {
        code: '0.3',
        text: 'Монтажға керек приложениялар! Орнату.',
      },
      {
        code: '0.4',
        text: 'Рилс монтаж! Кадрды кесу, Субтитр жазу. Шрифттарды орнату. Музыка таңдау. Видеоны қалай қымбат бояймыз!',
      },
      {
        code: '0.5',
        text: 'Сторителл рилс монтажы. ЗКТ.',
      },
    ],
  },
  {
    id: 4,
    badge: 'Модуль 4',
    title: 'Инстаграмға жүктеу & Монетизация',
    subtitle: 'Рилсты дұрыс орналастыру, алгоритмдер және воронка',
    lessons: [
      {
        code: '0.1',
        text: 'Рилсты инстаграмға дұрыс салу. Уақыты. Керек настройкалары. Запланировать.',
      },
      {
        code: '0.2',
        text: 'Пробный рилспен жұмыс.',
      },
    ],
    bonus: 'Рилс арқылы табыс табу / клиент табу. Воронка 📈',
  },
]

export function ModulesSection() {
  // Allow toggling accordions, by default module 1 is open or all are openable
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  })

  const toggleModule = (id: number) => {
    setOpenModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleAll = () => {
    const allOpen = Object.values(openModules).every(Boolean)
    const newState: Record<number, boolean> = {}
    modulesData.forEach((m) => {
      newState[m.id] = !allOpen
    })
    setOpenModules(newState)
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <BookOpen className="size-4 text-white" />
          <span>Практикалық сабақтар</span>
        </div>
        <button
          onClick={toggleAll}
          className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
        >
          {Object.values(openModules).every(Boolean) ? 'Бәрін жинау' : 'Бәрін ашу'}
        </button>
      </div>

      <div className="space-y-3.5">
        {modulesData.map((mod) => {
          const isOpen = !!openModules[mod.id]
          return (
            <div
              key={mod.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:border-white/20"
            >
              {/* Header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 transition-colors hover:bg-white/[0.02]"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  {mod.image && (
                    <div className="hidden xs:block shrink-0 size-12 sm:size-14 rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-md">
                      <img
                        src={mod.image}
                        onError={(e) => {
                          const target = e.currentTarget
                          if (mod.fallbackImage && target.src !== window.location.origin + mod.fallbackImage) {
                            target.src = mod.fallbackImage
                          }
                        }}
                        alt={mod.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <span className="shrink-0 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white shadow-sm">
                    {mod.badge}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-white truncate">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-zinc-400 truncate mt-0.5 font-normal">
                      {mod.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-block text-[11px] font-semibold text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    {mod.lessons.length} сабақ {mod.bonus ? '+ Бонус' : ''}
                  </span>
                  <div
                    className={`flex size-8 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-white/10 text-white' : ''
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </div>
              </button>

              {/* Lessons Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="border-t border-white/10 bg-black/20 p-4 sm:p-5 pt-3 space-y-2.5">
                      {mod.lessons.map((lesson) => (
                        <div
                          key={lesson.code}
                          className="flex items-start gap-3 rounded-xl bg-white/[0.02] border border-white/5 p-3 text-xs sm:text-sm text-zinc-200 transition-colors hover:bg-white/[0.04]"
                        >
                          <span className="shrink-0 flex items-center justify-center rounded-md bg-white/10 font-mono text-[11px] font-bold text-white px-2 py-0.5 border border-white/10 mt-0.5">
                            {lesson.code}
                          </span>
                          <p className="leading-relaxed font-normal text-zinc-300 flex-1">
                            {lesson.text}
                          </p>
                          <CheckCircle2 className="size-4 text-zinc-500 shrink-0 mt-0.5" />
                        </div>
                      ))}

                      {/* Bonus Lesson if available */}
                      {mod.bonus && (
                        <div className="mt-3 flex items-start gap-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 p-3.5 text-xs sm:text-sm text-amber-200 shadow-inner">
                          <div className="shrink-0 flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-1 text-[11px] font-extrabold text-amber-300 border border-amber-500/40">
                            <Gift className="size-3.5" />
                            <span>БОНУС</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                              <span>Бонус сабақ</span>
                              <Sparkles className="size-3.5 text-amber-400" />
                            </p>
                            <p className="mt-0.5 text-xs text-amber-200/90 leading-relaxed font-medium">
                              {mod.bonus}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
