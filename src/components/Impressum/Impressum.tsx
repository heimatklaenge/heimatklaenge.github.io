type ImpressumProps = {
  title: string
}

export function Impressum({ title }: ImpressumProps) {
  return (
    <section className="section">
      <div className="container">
        <h1>{title}</h1>

        <p>
          <strong>Chor Heimatklänge</strong>
        </p>

        <p>
          c/o integrationAKTIV e.V.
          <br />
          Anna-Langohr-Weg 18
          <br />
          50765 Köln
        </p>

        <p>
          Telefon: +49 177 1638820
          <br />
          E-Mail: eurichdavid1@gmail.com
        </p>

        <h2>Vertreten durch</h2>

        <p>
          Vorstandsvorsitzender: David Eurich
          <br />
          Stellvertretende Vorsitzende: Erna Minor
        </p>

        <h2>Registereintrag</h2>

        <p>
          Vereinsregister Nr. 14557
          <br />
          Amtsgericht Köln
        </p>
      </div>
    </section>
  )
}