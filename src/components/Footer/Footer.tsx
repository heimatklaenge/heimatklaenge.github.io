import './Footer.css'

type FooterProps = {
  impressum: string
  privacy: string
  setPage: React.Dispatch<
    React.SetStateAction<'home' | 'impressum' | 'privacy'>
  >
}

export function Footer({
  impressum,
  privacy,
  setPage,
}: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © {new Date().getFullYear()} Heimatklänge
        </p>

        <div className="footer__links">
          <button
  className="footer__link"
  onClick={() => setPage('impressum')}
>
  {impressum}
</button>

          <span>|</span>

          <button
  className="footer__link"
  onClick={() => setPage('privacy')}
>
  {privacy}
</button>
        </div>
      </div>
    </footer>
  )
}