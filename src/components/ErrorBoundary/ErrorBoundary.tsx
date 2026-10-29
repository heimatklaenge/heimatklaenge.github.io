import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

type ErrorBoundaryProps = { children: ReactNode }
type ErrorBoundaryState = { hasError: boolean }

// Если приложение упало уже после запуска, показываем понятное сообщение
// вместо белого экрана (стили запасного экрана лежат в index.html — здесь
// они не нужны, поэтому оформление задано инлайн).
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div
        role="alert"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          textAlign: 'center',
        }}
      >
        <svg viewBox="0 0 320 140" role="img" aria-label="404" style={{ width: 'min(320px, 80vw)' }}>
          <text
            x="160"
            y="104"
            textAnchor="middle"
            fontSize="120"
            fontWeight="700"
            fill="none"
            stroke="#c9a46a"
            strokeWidth="2"
            fontFamily="Georgia, serif"
          >
            404
          </text>
          <path d="M40 126h240" stroke="#c9a46a" strokeWidth="1" opacity=".5" />
        </svg>
        <h1>Сайт временно недоступен</h1>
        <p>Мы уже знаем о проблеме и работаем над ней. Пожалуйста, зайдите позже.</p>
        <h2 lang="de" style={{ marginTop: 24, marginBottom: 0 }}>
          Die Seite ist vorübergehend nicht erreichbar
        </h2>
        <p lang="de">Wir kümmern uns bereits darum. Bitte versuchen Sie es später erneut.</p>
      </div>
    )
  }
}
