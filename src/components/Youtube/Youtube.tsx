import { useState } from 'react'
import './Youtube.css'

const VIDEO_ID = 'azG1TB7YB_s'

type YoutubeProps = {
  title: string
  labels: {
    title: string
    play: string
    notice: string
  }
}

// Видео загружается только после клика (DSGVO): до этого к YouTube
// не отправляется ни одного запроса.
export function Youtube({ title, labels }: YoutubeProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <section id="youtube" className="section">
      <div className="container">
        <h2>{title}</h2>

        <div className="videoWrapper">
          {isLoaded ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1`}
              title={labels.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="videoConsent">
              <button
                type="button"
                className="videoConsent__button"
                onClick={() => setIsLoaded(true)}
              >
                ▶ {labels.play}
              </button>
              <p className="videoConsent__notice">{labels.notice}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
