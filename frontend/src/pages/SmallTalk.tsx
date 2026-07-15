import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { getLearnerName } from '../learner'

interface SmallTalkVariant {
  id: number
  phraseGreek: string
  translationRu: string
  pronunciation: string
}

interface SmallTalkPrompt {
  id: number
  promptRu: string
  variants: SmallTalkVariant[]
}

const SWIPE_MIN_DISTANCE = 60
const SWIPE_MAX_TINT_DISTANCE = 200
const KNOW_COLOR = '#22c55e'
const UNKNOWN_COLOR = '#ef4444'

function SmallTalk() {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState<SmallTalkPrompt | null>(null)
  const [error, setError] = useState(false)
  const [empty, setEmpty] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLElement>(null)
  const touchStart = useRef<{ x: number; y: number; dragging: boolean } | null>(null)

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

  const fetchPrompt = useCallback((excludeId?: number) => {
    setError(false)
    api
      .get<SmallTalkPrompt | null>('/smalltalk/random', {
        params: excludeId ? { exclude: excludeId } : {},
      })
      .then((res) => {
        if (!res.data) {
          setEmpty(true)
          return
        }
        setEmpty(false)
        setPrompt(res.data)
        resetCardStyle(false)
      })
      .catch(() => setError(true))
  }, [resetCardStyle])

  useEffect(() => {
    fetchPrompt()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const markKnown = useCallback(() => {
    if (!prompt) return
    const learnerName = getLearnerName()
    if (learnerName) {
      api.post('/progress/smalltalk', { learnerName, promptId: prompt.id }).catch(() => {})
    }
    fetchPrompt(prompt.id)
  }, [prompt, fetchPrompt])

  const markUnknown = useCallback(() => {
    if (!prompt) return
    fetchPrompt(prompt.id)
  }, [prompt, fetchPrompt])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY, dragging: false }
    if (cardRef.current) cardRef.current.style.transition = 'none'
    if (screenRef.current) screenRef.current.style.transition = 'none'
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const start = touchStart.current
    const card = cardRef.current
    if (!start || !card) return
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
      if (!start || !prompt) return
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
    [prompt, markKnown, markUnknown, resetCardStyle, applyDragTint],
  )

  let content
  if (error) {
    content = <p className="status">Не удалось загрузить фразы.</p>
  } else if (empty) {
    content = <p className="status">Фраз пока нет.</p>
  } else if (!prompt) {
    content = <p className="status">Загрузка…</p>
  } else {
    content = (
      <div className="smalltalk-card" ref={cardRef}>
        <div className="smalltalk-prompt">{prompt.promptRu}</div>
        <div className="smalltalk-variants">
          {prompt.variants.map((v) => (
            <div key={v.id} className="smalltalk-variant">
              <div className="smalltalk-phrase">{v.phraseGreek}</div>
              <div className="smalltalk-pronunciation">{v.pronunciation}</div>
              <div className="smalltalk-translation">{v.translationRu}</div>
            </div>
          ))}
        </div>
        <p className="swipe-hint">← Ещё учу · Знаю все →</p>
      </div>
    )
  }

  return (
    <section
      className="screen smalltalk-screen"
      ref={screenRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button type="button" className="back-btn" onClick={() => navigate('/')}>
        ← Меню
      </button>
      {content}
      {prompt && !error && !empty && (
        <div className="tinder-controls">
          <button
            type="button"
            className="tinder-btn tinder-btn-no"
            aria-label="Ещё учу"
            onClick={markUnknown}
          >
            ✕
          </button>
          <button
            type="button"
            className="tinder-btn tinder-btn-yes"
            aria-label="Знаю все"
            onClick={markKnown}
          >
            ✓
          </button>
        </div>
      )}
    </section>
  )
}

export default SmallTalk
