import './Hero.css'

type HeroProps = {
  text: {
    quote: string
    author: string
  }
}

export function Hero({ text }: HeroProps) {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}images/hero/hero.jpg)`,
      }}
    >
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="heroQuote">
          „{text.quote}“
        </p>

        <p className="heroAuthor">
          — {text.author}
        </p>
      </div>

      <a
        className="hero__scroll"
        href="#about"
        aria-label="Перейти к разделу О нас"
      >
        <span />
      </a>
    </section>
  )
}