import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../api/client'
import { getLearnerName } from '../learner'

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

function Home() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') ?? undefined
  const [word, setWord] = useState<Word | null>(null)
  const [error, setError] = useState(false)
  const [empty, setEmpty] = useState(false)

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
          const learnerName = getLearnerName()
          if (learnerName && res.data) {
            api.post('/progress/word', { learnerName, wordId: res.data.id }).catch(() => {})
          }
        })
        .catch(() => setError(true))
    },
    [category],
  )

  useEffect(() => {
    fetchWord(word?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchWord])

  const shuffle = useCallback(() => {
    fetchWord(word?.id)
  }, [fetchWord, word])

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
        {word.category && <div className="word-category">{word.category}</div>}
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
      <button
        type="button"
        className="back-btn"
        onClick={(e) => {
          e.stopPropagation()
          navigate('/words')
        }}
      >
        ← Категории
      </button>
      {content}
      {word && !error && !empty && <p className="hint">Тапни, чтобы увидеть другое слово</p>}
    </section>
  )
}

export default Home
