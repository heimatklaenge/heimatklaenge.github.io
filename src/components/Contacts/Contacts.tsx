import { useState } from 'react'
import './Contacts.css'

type ContactsProps = {
  text: {
    title: string
    intro: string
    phoneLabel: string
    phone: string
    email: string
    whatsapp: string
    writeEmail: string
    copyEmail: string
    copied: string
  }
}

export function Contacts({ text }: ContactsProps) {
  const [isCopied, setIsCopied] = useState(false)

  // Письмо открывается сразу в окне написания Gmail — без почтовой программы.
  const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(text.email)}`

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(text.email)
      setIsCopied(true)
      window.setTimeout(() => setIsCopied(false), 2000)
    } catch {
      // буфер обмена недоступен — адрес по-прежнему виден на странице
    }
  }

  return (
    <section id="contacts" className="section">
      <div className="container">
        <h2>{text.title}</h2>

        <div className="contactsCard">
          <p>{text.intro}</p>

          <p>
            <strong>{text.phoneLabel}:</strong> {text.phone}
          </p>

          <p>
            <strong>E-Mail:</strong>{' '}
            <a className="contactsCard__email" href={`mailto:${text.email}`}>
              {text.email}
            </a>
          </p>

          <div className="contactsCard__actions">
            <a
              className="emailButton"
              href={composeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              ✉ {text.writeEmail}
            </a>

            <button type="button" className="emailButton emailButton--ghost" onClick={copyEmail}>
              {isCopied ? text.copied : text.copyEmail}
            </button>
          </div>

          <a
            className="whatsappButton"
            href="https://wa.me/491771638820"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text.whatsapp}
          </a>
        </div>
      </div>
    </section>
  )
}
