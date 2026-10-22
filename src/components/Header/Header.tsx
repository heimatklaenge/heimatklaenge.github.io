import { useEffect, useState } from 'react'
import './Header.css'

type HeaderProps = {
  text: {
    title: string
    subtitle: string

    nav: {
      about: string
      leadership: string
      gallery: string
      video: string
      contacts: string
      privacy: string
      impressum: string
    }
  }
  language: 'ru' | 'de'
setLanguage: React.Dispatch<React.SetStateAction<'ru' | 'de'>>

setPage: React.Dispatch<
  React.SetStateAction<'home' | 'impressum' | 'privacy'>
>

}

export function Header({
  text,
  language,
  setLanguage,
  setPage,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const goToSection = () => {
    setPage('home')
    setIsMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <a
  className="header__logo"
  href="#"
  onClick={() => goToSection()}
>
  <span className="header__logo-title">
    {text.title}
  </span>

  <span className="header__logo-subtitle">
    {text.subtitle}
  </span>
</a>

      <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
        <a
  href="#about"
  onClick={() => goToSection()}
>
  {text.nav.about}
</a>
        <a
  href="#gallery"
  onClick={() => goToSection()}
>
  {text.nav.gallery}
</a>

<a
  href="#youtube"
  onClick={() => goToSection()}
>
  {text.nav.video}
</a>

<a
  href="#leadership"
  onClick={() => goToSection()}
>
  {text.nav.leadership}
</a>

<a
  href="#contacts"
  onClick={() => goToSection()}
>
  {text.nav.contacts}
</a>
      </nav>

      <div className="header__right">
        <div className="header__languages">
  <button
    className={`header__language ${
      language === 'ru' ? 'header__language--active' : ''
    }`}
    onClick={() => setLanguage('ru')}
  >
    RU
  </button>

  <button
    className={`header__language ${
      language === 'de' ? 'header__language--active' : ''
    }`}
    onClick={() => setLanguage('de')}
  >
    DE
  </button>
</div>

        <button
          type="button"
          className={`header__burger ${isMenuOpen ? 'header__burger--open' : ''}`}
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
