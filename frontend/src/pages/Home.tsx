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
  forms: WordForm[]
}

function Home() {
  const [word, setWord] = useState<Word | null>(null)
  const [error, setError] = useState(false)
  const [empty, setEmpty] = useState(false)

  const fetchWord = useCallback((excludeId?: number) => {
    setError(false)
    api
      .get<Word | null>('/words/random', { params: excludeId ? { exclude: excludeId } : {} })
      .then((res) => {
        if (!res.data) {
          setEmpty(true)
          return
        }
        setEmpty(false)
        setWord(res.data)
      })
      .catch(() => setError(true))
  }, [])

  useEffect(() => {
    fetchWord()
  }, [fetchWord])

  const shuffle = useCallback(() => {
    fetchWord(word?.id)
  }, [fetchWord, word])

  if (error) {
    return (
      <section className="screen" onClick={shuffle}>
        <p className="status">Не удалось загрузить слова.</p>
      </section>
    )
  }

  if (empty) {
    return (
      <section className="screen">
        <p className="status">Слов пока нет — импортируй CSV на бэкенде.</p>
      </section>
    )
  }

  if (!word) {
    return (
      <section className="screen">
        <p className="status">Загрузка…</p>
      </section>
    )
  }

  return (
    <section className="screen" onClick={shuffle}>
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
      <p className="hint">Тапни, чтобы увидеть другое слово</p>
    </section>
  )
}

export default Home
