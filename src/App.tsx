import { useCallback, useEffect, useState } from 'react'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Leadership } from './components/Leadership/Leadership'
import { ChoirGallery } from './components/ChoirGallery/ChoirGallery'
import { Youtube } from './components/Youtube/Youtube'
import { Contacts } from './components/Contacts/Contacts'
import { Footer } from './components/Footer/Footer'
import { Impressum } from './components/Impressum/Impressum'
import { Privacy } from './components/Privacy/Privacy'
import { translations } from './data'
import type { Language, Page } from './data'

const LANGUAGE_KEY = 'language'

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY)
    if (saved === 'ru' || saved === 'de') return saved
  } catch {
    // localStorage может быть недоступен
  }
  return 'ru'
}

// Юридические страницы живут на hash-адресах (#/impressum, #/privacy),
// поэтому у них есть собственный URL и работает кнопка «Назад».
function getPageFromHash(): Page {
  if (window.location.hash === '#/impressum') return 'impressum'
  if (window.location.hash === '#/privacy') return 'privacy'
  return 'home'
}

function App() {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)
  const [page, setPage] = useState<Page>(getPageFromHash)
  const t = translations[language]

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
    try {
      localStorage.setItem(LANGUAGE_KEY, next)
    } catch {
      // игнорируем
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // После смены страницы: на главной — к секции из хэша, иначе — наверх.
  useEffect(() => {
    if (page !== 'home') {
      window.scrollTo(0, 0)
      return
    }
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [page])

  return (
    <>
      <Header text={t.header} language={language} setLanguage={setLanguage} />

      <main>
        {page === 'home' && (
          <>
            <Hero text={t.hero} />
            <About text={t.about} />
            <Leadership text={t.leadership} />
            <ChoirGallery
              title={t.gallery.title}
              text={t.gallery.text}
              labels={t.gallery.labels}
            />
            <Youtube title={t.header.nav.video} labels={t.video} />
            <Contacts text={t.contacts} />
          </>
        )}

        {page === 'impressum' && <Impressum title={t.impressum.title} />}
        {page === 'privacy' && <Privacy title={t.privacy.title} />}
      </main>

      <Footer impressum={t.impressum.title} privacy={t.privacy.title} />
    </>
  )
}

export default App
