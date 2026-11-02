import type { Language } from './index'

type Localized = Record<Language, string>

export type EventItem = {
  id: string
  /** Путь к афише относительно public/ */
  image: string
  /**
   * Объявление показывается до этого момента включительно (локальное время
   * посетителя). Формат ISO без часового пояса: 'YYYY-MM-DDTHH:mm:ss'.
   */
  expires: string
  title: Localized
  description: Localized
  date: Localized
  time: Localized
  place: Localized
  note: Localized
  imageAlt: Localized
}

// Чтобы добавить объявление — допишите объект в массив и положите афишу
// в public/images/events/. Просроченные объявления скрываются сами;
// если не осталось ни одного — исчезает вся секция.
export const events: EventItem[] = [
  {
    id: 'jubilee-30',
    image: 'images/events/jubilee-30.jpg',
    expires: '2026-11-06T23:59:59',
    title: {
      ru: 'Юбилейный концерт — нам 30 лет!',
      de: 'Jubiläumskonzert — Wir werden 30!',
    },
    description: {
      ru: 'Приглашаем вас отпраздновать этот праздник вместе с нами, послушать прекрасные песни и подпевать!',
      de: 'Wir laden Sie herzlich ein, gemeinsam mit uns zu feiern, zuzuhören und mitzusingen.',
    },
    date: { ru: '6 ноября 2026 года', de: '6. November 2026' },
    time: { ru: '18:00', de: '18:00 Uhr' },
    place: {
      ru: 'Евангелическая церковь в Хорвайлере, Pariser Platz 32, 50765 Köln',
      de: 'Evangelische Kirche Chorweiler, Pariser Platz 32, 50765 Köln',
    },
    note: {
      ru: 'Вход свободный. Концерт пройдёт на русском и немецком языках.',
      de: 'Freier Eintritt. Auf Russisch und Deutsch.',
    },
    imageAlt: {
      ru: 'Афиша юбилейного концерта хора Heimatklänge',
      de: 'Plakat zum Jubiläumskonzert des Chors Heimatklänge',
    },
  },
]

export function getActiveEvents(now: Date): EventItem[] {
  return events.filter((event) => new Date(event.expires).getTime() >= now.getTime())
}
