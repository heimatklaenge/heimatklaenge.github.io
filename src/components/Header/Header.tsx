import { useEffect, useState } from 'react'
import type { Language } from '../../data'
import './Header.css'

type HeaderProps = {
  text: {
    menuOpen: string
    menuClose: string
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
  language: Language
  setLanguage: (language: Language) => void
}

export function Header({ text, language, setLanguage }: HeaderProps) {
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

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <a
  className="header__logo"
  href="#"
  onClick={closeMenu}
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
  onClick={closeMenu}
>
  {text.nav.about}
</a>
        <a
  href="#gallery"
  onClick={closeMenu}
>
  {text.nav.gallery}
</a>

<a
  href="#youtube"
  onClick={closeMenu}
>
  {text.nav.video}
</a>

<a
  href="#leadership"
  onClick={closeMenu}
>
  {text.nav.leadership}
</a>

<a
  href="#contacts"
  onClick={closeMenu}
>
  {text.nav.contacts}
</a>
      </nav>

      <div className="header__right">
        <div className="header__languages">
  <button
    type="button"
    className={`header__language ${
      language === 'ru' ? 'header__language--active' : ''
    }`}
    onClick={() => setLanguage('ru')}
  >
    RU
  </button>

  <button
    type="button"
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
          aria-label={isMenuOpen ? text.menuClose : text.menuOpen}
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
