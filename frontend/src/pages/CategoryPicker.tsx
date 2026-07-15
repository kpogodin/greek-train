import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { getLearnerName } from '../learner'

interface CategoryCount {
  category: string
  count: number
  learned: number
}

const CATEGORY_ICONS: Record<string, string> = {
  'служебные слова': '🔗',
  глаголы: '🏃',
  прилагательные: '✨',
  'еда и напитки': '🍽️',
  дом: '🏠',
  учёба: '📚',
  'город и направления': '🏙️',
  'досуг и спорт': '⚽',
  время: '🕐',
  'семья и люди': '👪',
  'работа и профессии': '💼',
  числа: '🔢',
  'тело и здоровье': '🩺',
  приветствия: '👋',
  'местоимения и вопросы': '❓',
  'погода и природа': '🌦️',
  'транспорт и путешествия': '🚗',
  'покупки и деньги': '💰',
  одежда: '👕',
  'чувства и характер': '😊',
  цвета: '🌈',
  животные: '🐾',
}

const PREPOSITIONS_CATEGORY = 'служебные слова'

function CategoryPicker() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<CategoryCount[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const learnerName = getLearnerName()
    api
      .get<CategoryCount[]>('/words/categories', {
        params: learnerName ? { learner: learnerName } : {},
      })
      .then((res) => setCategories(res.data))
      .catch(() => setError(true))
  }, [])

  const goToPractice = (category?: string) => {
    const query = category ? `?category=${encodeURIComponent(category)}` : ''
    navigate(`/words/practice${query}`)
  }

  const prepositions = categories.find((c) => c.category === PREPOSITIONS_CATEGORY)
  const rest = categories
    .filter((c) => c.category !== PREPOSITIONS_CATEGORY)
    .sort((a, b) => b.count - a.count)

  return (
    <section className="screen category-screen">
      <button type="button" className="back-btn" onClick={() => navigate('/')}>
        ← Меню
      </button>
      <div className="menu category-menu">
        <button type="button" className="menu-btn category-btn" onClick={() => goToPractice()}>
          Случайно
          <span className="category-icon">🎲</span>
        </button>
        {prepositions && (
          <button
            type="button"
            className="menu-btn category-btn"
            onClick={() => goToPractice(prepositions.category)}
          >
            <span className="category-label">
              Базовые предлоги
              <span className="category-progress">
                {prepositions.learned}/{prepositions.count}
              </span>
            </span>
            <span className="category-icon">{CATEGORY_ICONS[prepositions.category] ?? '🔤'}</span>
          </button>
        )}
        {error && <p className="status">Не удалось загрузить категории.</p>}
        {rest.map((c) => (
          <button
            type="button"
            key={c.category}
            className="menu-btn category-btn"
            onClick={() => goToPractice(c.category)}
          >
            <span className="category-label">
              {c.category}
              <span className="category-progress">
                {c.learned}/{c.count}
              </span>
            </span>
            <span className="category-icon">{CATEGORY_ICONS[c.category] ?? '📘'}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default CategoryPicker
