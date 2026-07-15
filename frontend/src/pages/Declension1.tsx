import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { getLearnerName } from '../learner'

interface ConjugationSentence {
  id: number
  before: string
  after: string
  correctAnswer: string
  verbLemma: string
  translationRu: string
  pronunciation: string
}

type Status = 'idle' | 'correct' | 'incorrect'

const HINT_ROWS = [
  ['Εγώ', '-ω'],
  ['Εσύ', '-εις'],
  ['Αυτός', '-ει'],
  ['Εμείς', '-ουμε'],
  ['Εσείς', '-ετε'],
  ['Αυτοί', '-ουν(ε)'],
]

const SWIPE_MIN_DISTANCE = 60

function Declension1() {
  const navigate = useNavigate()
  const [sentence, setSentence] = useState<ConjugationSentence | null>(null)
  const [error, setError] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [showHint, setShowHint] = useState(false)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef<{ x: number; y: number; onInput: boolean } | null>(null)

  const fetchSentence = useCallback((excludeId?: number) => {
    setError(false)
    api
      .get<ConjugationSentence | null>('/conjugation/random', {
        params: { group: 1, ...(excludeId ? { exclude: excludeId } : {}) },
      })
      .then((res) => {
        if (!res.data) {
          setEmpty(true)
          return
        }
        setEmpty(false)
        setSentence(res.data)
        setAnswer('')
        setStatus('idle')
      })
      .catch(() => setError(true))
  }, [])

  useEffect(() => {
    fetchSentence()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const check = useCallback(() => {
    if (!sentence) return
    const normalize = (s: string) => s.trim().toLowerCase().normalize('NFC')
    const isCorrect = normalize(answer) === normalize(sentence.correctAnswer)
    setStatus(isCorrect ? 'correct' : 'incorrect')

    const learnerName = getLearnerName()
    if (isCorrect && learnerName) {
      api.post('/progress/conjugation', { learnerName, sentenceId: sentence.id }).catch(() => {})
    }
  }, [answer, sentence])

  const next = useCallback(() => {
    fetchSentence(sentence?.id)
  }, [fetchSentence, sentence])

  // Keep the Check/Дальше bar above the iOS on-screen keyboard: position:fixed
  // elements are anchored to the layout viewport, which doesn't shrink when
  // the keyboard opens, so the bar ends up hidden below it unless we track
  // the visual viewport ourselves.
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv || !bottomBarRef.current) return

    const reposition = () => {
      if (!bottomBarRef.current) return
      const keyboardInset = window.innerHeight - vv.height - vv.offsetTop
      bottomBarRef.current.style.bottom = `${Math.max(20, keyboardInset + 20)}px`
    }

    reposition()
    vv.addEventListener('resize', reposition)
    vv.addEventListener('scroll', reposition)
    return () => {
      vv.removeEventListener('resize', reposition)
      vv.removeEventListener('scroll', reposition)
    }
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    const onInput = (e.target as HTMLElement).closest('.conjugation-input') !== null
    touchStart.current = { x: touch.clientX, y: touch.clientY, onInput }
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStart.current
      touchStart.current = null
      if (!start || start.onInput || !sentence) return
      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - start.x
      const deltaY = touch.clientY - start.y
      if (deltaX < -SWIPE_MIN_DISTANCE && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        next()
      }
    },
    [next, sentence],
  )

  let content
  if (error) {
    content = <p className="status">Не удалось загрузить упражнения.</p>
  } else if (empty) {
    content = <p className="status">Предложений пока нет.</p>
  } else if (!sentence) {
    content = <p className="status">Загрузка…</p>
  } else {
    content = (
      <div className="conjugation-exercise">
        <div className="conjugation-sentence">
          {sentence.before}
          <input
            type="text"
            className="conjugation-input"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value)
              setStatus('idle')
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') check()
            }}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          {sentence.after}
        </div>
        <div className="verb-hint">({sentence.verbLemma})</div>
        <div className="conjugation-translation">{sentence.translationRu}</div>
        {status === 'correct' && (
          <div className="conjugation-pronunciation">{sentence.pronunciation}</div>
        )}
        <p className="swipe-hint">← Свайп для следующего</p>
      </div>
    )
  }

  return (
    <section
      className={`screen conjugation-screen ${status}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button type="button" className="back-btn" onClick={() => navigate('/')}>
        ← Меню
      </button>
      <button
        type="button"
        className="hint-btn"
        onClick={() => setShowHint((v) => !v)}
        aria-label="Подсказка по спряжению"
      >
        ?
      </button>
      {showHint && (
        <div className="hint-popover">
          <table>
            <tbody>
              {HINT_ROWS.map(([pronoun, ending]) => (
                <tr key={pronoun}>
                  <td>{pronoun}</td>
                  <td>{ending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {content}
      {sentence && !error && !empty && (
        <div className="bottom-bar" ref={bottomBarRef}>
          <button type="button" className="action-btn" onClick={check}>
            Check
          </button>
          <button type="button" className="action-btn" onClick={next}>
            Дальше
          </button>
        </div>
      )}
    </section>
  )
}

export default Declension1
