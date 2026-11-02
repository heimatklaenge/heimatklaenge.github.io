import type { Language } from '../../data'
import type { EventItem } from '../../data/events'
import './Events.css'

type EventsProps = {
  events: EventItem[]
  language: Language
  text: {
    title: string
    date: string
    time: string
    place: string
    openPoster: string
  }
}

// Секция скрывается целиком, если актуальных объявлений нет.
export function Events({ events, language, text }: EventsProps) {
  if (events.length === 0) return null

  return (
    <section id="events" className="events">
      <div className="events__container">
        <h2 className="events__title">{text.title}</h2>

        {events.map((event) => {
          const imageUrl = `${import.meta.env.BASE_URL}${event.image}`

          return (
            <article key={event.id} className="event-card">
              <a
                className="event-card__poster"
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={text.openPoster}
              >
                <img
                  src={imageUrl}
                  alt={event.imageAlt[language]}
                  loading="lazy"
                  decoding="async"
                />
              </a>

              <div className="event-card__content">
                <h3 className="event-card__title">{event.title[language]}</h3>
                <p className="event-card__description">{event.description[language]}</p>

                <dl className="event-card__details">
                  <dt>{text.date}</dt>
                  <dd>{event.date[language]}</dd>

                  <dt>{text.time}</dt>
                  <dd>{event.time[language]}</dd>

                  <dt>{text.place}</dt>
                  <dd>{event.place[language]}</dd>
                </dl>

                <p className="event-card__note">{event.note[language]}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
