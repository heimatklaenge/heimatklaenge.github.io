import { ru } from './ru'
import { de } from './de'
import type { Translations } from './ru'

export const translations: Record<'ru' | 'de', Translations> = {
  ru,
  de,
}

export type Language = keyof typeof translations
export type Page = 'home' | 'impressum' | 'privacy'
export type { Translations }
