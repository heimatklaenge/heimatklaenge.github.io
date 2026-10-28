type PrivacyProps = {
  title: string
}

export function Privacy({ title }: PrivacyProps) {
  return (
    <section className="section">
      <div className="container">
        <h1>{title}</h1>

        <p>
          Nachfolgend informieren wir Sie über die
          Verarbeitung personenbezogener Daten bei
          der Nutzung dieser Website.
        </p>

        <h2>Verantwortliche Stelle</h2>

        <p>
          Chor Heimatklänge
          <br />
          c/o integrationAKTIV e.V.
          <br />
          Anna-Langohr-Weg 18
          <br />
          50765 Köln
        </p>

        <h2>Kontakt</h2>

        <p>
          E-Mail:
          eurichdavid1@gmail.com
          <br />
          Telefon:
          +49 177 1638820
        </p>

        <h2>Erhebung von Daten</h2>

        <p>
          Diese Website dient ausschließlich der
          Information über den Chor Heimatklänge.
          Es werden keine Kontaktformulare,
          keine Benutzerkonten und keine
          Analyse-Tools verwendet.
        </p>

        <h2>Ihre Rechte</h2>

        <p>
          Sie haben das Recht auf Auskunft,
          Berichtigung, Löschung und Einschränkung
          der Verarbeitung Ihrer personenbezogenen
          Daten gemäß den gesetzlichen Vorschriften.
        </p>
      </div>
    </section>
  )
}