import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../api/client'
import { getLearnerName } from '../learner'

interface CategoryStats {
  total: number
  learned: number
  wrong: number
  unseen: number
}

type Filter = 'unlearned' | 'wrong' | 'all'
type Limit = '10' | 'all'

function ReviewStart() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') ?? ''
  const [stats, setStats] = useState<CategoryStats | null>(null)
  const [error, setError] = useState(false)
  const [filter, setFilter] = useState<Filter>('all')
  const [limit, setLimit] = useState<Limit>('10')

  useEffect(() => {
    if (!category) {
      navigate('/words')
      return
    }
    const learnerName = getLearnerName()
    api
      .get<CategoryStats>('/words/category-stats', {
        params: { category, ...(learnerName ? { learner: learnerName } : {}) },
      })
      .then((res) => {
        setStats(res.data)
        setFilter(res.data.learned > 0 || res.data.wrong > 0 ? 'unlearned' : 'all')
      })
      .catch(() => setError(true))
  }, [category, navigate])

  if (!category) {
    return null
  }

  const hasProgress = !!stats && (stats.learned > 0 || stats.wrong > 0)

  const filterCount = (f: Filter) => {
    if (!stats) return 0
    if (f === 'unlearned') return stats.total - stats.learned
    if (f === 'wrong') return stats.wrong
    return stats.total
  }

  const start = () => {
    navigate(
      `/words/practice?category=${encodeURIComponent(category)}&filter=${filter}&limit=${limit}`,
    )
  }

  const disabled = !stats || filterCount(filter) === 0

  return (
    <section className="screen review-start-screen">
      <button type="button" className="back-btn" onClick={() => navigate('/words')}>
        ← Категории
      </button>
      <h2 className="review-title">{category}</h2>
      {error && <p className="status">Не удалось загрузить прогресс.</p>}
      {!error && !stats && <p className="status">Загрузка…</p>}
      {stats && (
        <div className="review-form">
          {hasProgress && (
            <div className="review-group">
              <p className="review-group-label">Что повторяем?</p>
              <div className="review-chip-row">
                <button
                  type="button"
                  className={`review-chip${filter === 'unlearned' ? ' active' : ''}`}
                  onClick={() => setFilter('unlearned')}
                >
                  Незаученные
                  <span className="review-chip-count">{filterCount('unlearned')}</span>
                </button>
                <button
                  type="button"
                  className={`review-chip${filter === 'wrong' ? ' active' : ''}`}
                  onClick={() => setFilter('wrong')}
                >
                  Ошибочные
                  <span className="review-chip-count">{filterCount('wrong')}</span>
                </button>
                <button
                  type="button"
                  className={`review-chip${filter === 'all' ? ' active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  Все
                  <span className="review-chip-count">{filterCount('all')}</span>
                </button>
              </div>
            </div>
          )}
          <div className="review-group">
            <p className="review-group-label">Сколько слов?</p>
            <div className="review-chip-row">
              <button
                type="button"
                className={`review-chip${limit === '10' ? ' active' : ''}`}
                onClick={() => setLimit('10')}
              >
                10
              </button>
              <button
                type="button"
                className={`review-chip${limit === 'all' ? ' active' : ''}`}
                onClick={() => setLimit('all')}
              >
                Все слова
              </button>
            </div>
          </div>
          <button type="button" className="action-btn review-start-btn" disabled={disabled} onClick={start}>
            Начать
          </button>
        </div>
      )}
    </section>
  )
}

export default ReviewStart
