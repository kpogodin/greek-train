import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../api/client'
import { getLearnerName } from '../learner'
import { getHideHints, setHideHints } from '../hints'

interface WordForm {
  id: number
  form: string
}

interface Word {
  id: number
  translationRu: string
  pronunciation: string | null
  category: string | null
  difficulty: number
  forms: WordForm[]
}

const SWIPE_MIN_DISTANCE = 60
const SWIPE_MAX_TINT_DISTANCE = 200
const KNOW_COLOR = '#22c55e'
const UNKNOWN_COLOR = '#ef4444'

function Home() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') ?? undefined
  const [word, setWord] = useState<Word | null>(null)
  const [error, setError] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [hideHints, setHideHintsState] = useState(getHideHints)
  const [revealed, setRevealed] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLElement>(null)
  const touchStart = useRef<{ x: number; y: number; onSpoiler: boolean; dragging: boolean } | null>(
    null,
  )

  const resetCardStyle = useCallback((animated: boolean) => {
    const card = cardRef.current
    if (card) {
      card.style.transition = animated ? 'transform 0.2s ease, opacity 0.2s ease' : 'none'
      card.style.transform = 'translateX(0)'
      card.style.opacity = '1'
    }
    const screen = screenRef.current
    if (screen) {
      screen.style.transition = animated ? 'background-color 0.2s ease' : 'none'
      screen.style.backgroundColor = ''
    }
  }, [])

  const applyDragTint = useCallback((deltaX: number) => {
    const screen = screenRef.current
    if (!screen) return
    const intensity = Math.min(Math.abs(deltaX) / SWIPE_MAX_TINT_DISTANCE, 1)
    const color = deltaX > 0 ? KNOW_COLOR : UNKNOWN_COLOR
    screen.style.transition = 'none'
    screen.style.backgroundColor = `color-mix(in srgb, ${color} ${Math.round(intensity * 45)}%, var(--bg))`
  }, [])

  const fetchWord = useCallback(
    (excludeId?: number) => {
      setError(false)
      api
        .get<Word | null>('/words/random', {
          params: {
            ...(excludeId ? { exclude: excludeId } : {}),
            ...(category ? { category } : {}),
          },
        })
        .then((res) => {
          if (!res.data) {
            setEmpty(true)
            return
          }
          setEmpty(false)
          setWord(res.data)
          setRevealed(false)
          resetCardStyle(false)
        })
        .catch(() => setError(true))
    },
    [category, resetCardStyle],
  )

  useEffect(() => {
    fetchWord(word?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchWord])

  const markKnown = useCallback(() => {
    if (!word) return
    const learnerName = getLearnerName()
    if (learnerName) {
      api.post('/progress/word', { learnerName, wordId: word.id }).catch(() => {})
    }
    fetchWord(word.id)
  }, [word, fetchWord])

  const markUnknown = useCallback(() => {
    if (!word) return
    fetchWord(word.id)
  }, [word, fetchWord])

  const toggleHideHints = useCallback(() => {
    setHideHintsState((v) => {
      const next = !v
      setHideHints(next)
      return next
    })
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    const onSpoiler = (e.target as HTMLElement).closest('.word-hints, .hide-hints-toggle') !== null
    touchStart.current = { x: touch.clientX, y: touch.clientY, onSpoiler, dragging: false }
    if (cardRef.current) cardRef.current.style.transition = 'none'
    if (screenRef.current) screenRef.current.style.transition = 'none'
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const start = touchStart.current
    const card = cardRef.current
    if (!start || start.onSpoiler || !card) return
    const touch = e.touches[0]
    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y
    if (!start.dragging && Math.abs(deltaX) < 10) return
    if (!start.dragging && Math.abs(deltaY) > Math.abs(deltaX)) return
    start.dragging = true
    card.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 20}deg)`
    card.style.opacity = `${Math.max(0.4, 1 - Math.abs(deltaX) / 300)}`
    applyDragTint(deltaX)
  }, [applyDragTint])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStart.current
      touchStart.current = null
      if (!start || start.onSpoiler || !word) return
      const card = cardRef.current
      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - start.x
      const deltaY = touch.clientY - start.y
      const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.5

      if (isHorizontal && deltaX > SWIPE_MIN_DISTANCE && card) {
        card.style.transition = 'transform 0.15s ease, opacity 0.15s ease'
        card.style.transform = 'translateX(120%) rotate(15deg)'
        card.style.opacity = '0'
        applyDragTint(SWIPE_MAX_TINT_DISTANCE)
        window.setTimeout(() => markKnown(), 150)
      } else if (isHorizontal && deltaX < -SWIPE_MIN_DISTANCE && card) {
        card.style.transition = 'transform 0.15s ease, opacity 0.15s ease'
        card.style.transform = 'translateX(-120%) rotate(-15deg)'
        card.style.opacity = '0'
        applyDragTint(-SWIPE_MAX_TINT_DISTANCE)
        window.setTimeout(() => markUnknown(), 150)
      } else if (card) {
        resetCardStyle(true)
      }
    },
    [word, markKnown, markUnknown, resetCardStyle, applyDragTint],
  )

  let content
  if (error) {
    content = <p className="status">Не удалось загрузить слова.</p>
  } else if (empty) {
    content = <p className="status">Слов пока нет — импортируй CSV на бэкенде.</p>
  } else if (!word) {
    content = <p className="status">Загрузка…</p>
  } else {
    const blurred = hideHints && !revealed
    content = (
      <div className="word-display" ref={cardRef}>
        <div className="word-forms">
          {word.forms.map((f) => (
            <div key={f.id}>{f.form}</div>
          ))}
        </div>
        <div
          className="word-hints"
          onClick={() => {
            if (blurred) setRevealed(true)
          }}
        >
          {word.pronunciation && (
            <div className="hint-row">
              <span className="hint-icon" aria-label="Произношение">
                🗣️
              </span>
              <span className={`word-pronunciation${blurred ? ' blurred-text' : ''}`}>
                {word.pronunciation}
              </span>
            </div>
          )}
          <div className="hint-row">
            <span className="hint-icon" aria-label="Перевод">
              🌐
            </span>
            <span className={`word-translation${blurred ? ' blurred-text' : ''}`}>
              {word.translationRu}
            </span>
          </div>
        </div>
        <p className="swipe-hint">← Не знаю · Знаю →</p>
      </div>
    )
  }

  return (
    <section
      className="screen word-screen"
      ref={screenRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button type="button" className="back-btn" onClick={() => navigate('/words')}>
        ← Категории
      </button>
      {word?.category && <div className="word-category-badge">{word.category}</div>}
      <button
        type="button"
        className={`hide-hints-toggle${hideHints ? ' active' : ''}`}
        onClick={toggleHideHints}
      >
        {hideHints ? '🙈' : '👁'} Подсказки
      </button>
      {content}
      {word && !error && !empty && (
        <div className="tinder-controls">
          <button
            type="button"
            className="tinder-btn tinder-btn-no"
            aria-label="Не знаю"
            onClick={markUnknown}
          >
            ✕
          </button>
          <button
            type="button"
            className="tinder-btn tinder-btn-yes"
            aria-label="Знаю"
            onClick={markKnown}
          >
            ✓
          </button>
        </div>
      )}
    </section>
  )
}

export default Home
