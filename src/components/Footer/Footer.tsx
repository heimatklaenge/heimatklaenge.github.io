import './Footer.css'

type FooterProps = {
  impressum: string
  privacy: string
}

export function Footer({ impressum, privacy }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © {new Date().getFullYear()} Heimatklänge
        </p>

        <div className="footer__links">
          <a className="footer__link" href="#/impressum">
            {impressum}
          </a>

          <span>|</span>

          <a className="footer__link" href="#/privacy">
            {privacy}
          </a>
        </div>
      </div>
    </footer>
  )
}