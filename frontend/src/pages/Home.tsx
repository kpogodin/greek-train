import { useCallback, useEffect, useState } from 'react'
import { api } from '../api/client'

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

const DIFFICULTIES = [1, 2, 3, 4, 5]

function Home() {
  const [word, setWord] = useState<Word | null>(null)
  const [error, setError] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [difficulty, setDifficulty] = useState<number | null>(null)

  const fetchWord = useCallback(
    (excludeId?: number) => {
      setError(false)
      api
        .get<Word | null>('/words/random', {
          params: {
            ...(excludeId ? { exclude: excludeId } : {}),
            ...(difficulty ? { difficulty } : {}),
          },
        })
        .then((res) => {
          if (!res.data) {
            setEmpty(true)
            return
          }
          setEmpty(false)
          setWord(res.data)
        })
        .catch(() => setError(true))
    },
    [difficulty],
  )

  useEffect(() => {
    fetchWord(word?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchWord])

  const shuffle = useCallback(() => {
    fetchWord(word?.id)
  }, [fetchWord, word])

  const selectDifficulty = useCallback((d: number) => {
    setDifficulty((current) => (current === d ? null : d))
  }, [])

  let content
  if (error) {
    content = <p className="status">Не удалось загрузить слова.</p>
  } else if (empty) {
    content = <p className="status">Слов пока нет — импортируй CSV на бэкенде.</p>
  } else if (!word) {
    content = <p className="status">Загрузка…</p>
  } else {
    content = (
      <div className="word-display">
        {word.category && (
          <div className="word-category">
            {word.category} (сложность {word.difficulty})
          </div>
        )}
        <div className="word-forms">
          {word.forms.map((f) => (
            <div key={f.id}>{f.form}</div>
          ))}
        </div>
        {word.pronunciation && (
          <div className="word-pronunciation">{word.pronunciation}</div>
        )}
        <div className="word-translation">{word.translationRu}</div>
      </div>
    )
  }

  return (
    <section className="screen" onClick={shuffle}>
      <div className="difficulty-bar" onClick={(e) => e.stopPropagation()}>
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            type="button"
            className={`difficulty-btn${difficulty === d ? ' active' : ''}`}
            onClick={() => selectDifficulty(d)}
          >
            {d}
          </button>
        ))}
      </div>
      {content}
      {word && !error && !empty && <p className="hint">Тапни, чтобы увидеть другое слово</p>}
    </section>
  )
}

export default Home
