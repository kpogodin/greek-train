import { useCallback, useEffect, useState } from 'react'
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

function Declension1() {
  const navigate = useNavigate()
  const [sentence, setSentence] = useState<ConjugationSentence | null>(null)
  const [error, setError] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [showHint, setShowHint] = useState(false)

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
      </div>
    )
  }

  return (
    <section className={`screen conjugation-screen ${status}`}>
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
        <div className="bottom-bar">
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
