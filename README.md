# Heimatklänge — лендинг хора

Одностраничный сайт хора «Heimatklänge» (Кёльн) на русском и немецком языках.
React 19 + TypeScript + Vite, деплой на GitHub Pages.

## Команды

```bash
pnpm install
pnpm dev       # разработка
pnpm lint      # ESLint
pnpm build     # проверка типов + production-сборка в dist/
pnpm preview   # предпросмотр сборки
```

## Структура

- `src/components/` — секции страницы (Header, Hero, About, Leadership, ChoirGallery, Youtube, Contacts, Footer) и юридические страницы (Impressum, Privacy).
- `src/data/ru.ts`, `src/data/de.ts` — тексты. Структура `de.ts` проверяется по типу `Translations` из `ru.ts`: пропущенный ключ — ошибка сборки.
- `public/images/` — фотографии.

## Особенности

- Язык сохраняется в `localStorage`.
- Impressum и Privacy доступны по адресам `#/impressum` и `#/privacy`.
- Шрифты подключены локально (`@fontsource`), видео YouTube загружается только после клика (`youtube-nocookie.com`) — без передачи данных Google до согласия.

## Деплой

Push в `master` запускает `.github/workflows/deploy.yml` (lint → build → GitHub Pages).
Base-путь задан в `vite.config.ts` (`/choir-landing/`).
