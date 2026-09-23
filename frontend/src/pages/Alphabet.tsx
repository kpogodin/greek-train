import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Letter {
  gr: string
  name: string
  sound: string
}

const LETTERS: Letter[] = [
  { gr: 'Α α', name: 'альфа', sound: 'а' },
  { gr: 'Β β', name: 'вита', sound: 'в (как англ. v)' },
  { gr: 'Γ γ', name: 'гамма', sound: 'мягкое «г»/«й» (перед ε, ι — как «й»)' },
  { gr: 'Δ δ', name: 'дельта', sound: 'мягкое «д», как англ. th в this' },
  { gr: 'Ε ε', name: 'эпсилон', sound: 'э' },
  { gr: 'Ζ ζ', name: 'зита', sound: 'з' },
  { gr: 'Η η', name: 'ита', sound: 'и' },
  { gr: 'Θ θ', name: 'тхита', sound: 'глухое, как англ. th в think' },
  { gr: 'Ι ι', name: 'йота', sound: 'и' },
  { gr: 'Κ κ', name: 'капа', sound: 'к' },
  { gr: 'Λ λ', name: 'лямда', sound: 'л' },
  { gr: 'Μ μ', name: 'ми', sound: 'м' },
  { gr: 'Ν ν', name: 'ни', sound: 'н' },
  { gr: 'Ξ ξ', name: 'кси', sound: 'кс' },
  { gr: 'Ο ο', name: 'омикрон', sound: 'о' },
  { gr: 'Π π', name: 'пи', sound: 'п' },
  { gr: 'Ρ ρ', name: 'ро', sound: 'р (раскатистое)' },
  { gr: 'Σ σ/ς', name: 'сигма', sound: 'с (ς — в конце слова)' },
  { gr: 'Τ τ', name: 'таф', sound: 'т' },
  { gr: 'Υ υ', name: 'ипсилон', sound: 'и' },
  { gr: 'Φ φ', name: 'фи', sound: 'ф' },
  { gr: 'Χ χ', name: 'хи', sound: 'твёрдое «х», как в «ах»' },
  { gr: 'Ψ ψ', name: 'пси', sound: 'пс' },
  { gr: 'Ω ω', name: 'омега', sound: 'о' },
]

function Alphabet() {
  const navigate = useNavigate()
  const [revealed, setRevealed] = useState<Set<string>>(new Set())

  const toggle = (gr: string) => {
    setRevealed((prev) => {
      const next = new Set(prev)
      if (next.has(gr)) {
        next.delete(gr)
      } else {
        next.add(gr)
      }
      return next
    })
  }

  return (
    <div className="words-page">
      <button type="button" className="back-btn" onClick={() => navigate('/')}>
        ← Меню
      </button>
      <h1 className="rules-heading">Алфавит</h1>

      <div className="standalone-content">
        <p className="rule-note">
          24 буквы греческого алфавита. Нажми на произношение, чтобы открыть подсказку.
        </p>

        <ul className="alphabet-list">
          {LETTERS.map((letter) => {
            const isRevealed = revealed.has(letter.gr)
            return (
              <li key={letter.gr}>
                <span className="alphabet-letter">{letter.gr}</span>
                <span
                  className={`alphabet-sound${isRevealed ? '' : ' blurred-text'}`}
                  onClick={() => toggle(letter.gr)}
                >
                  {letter.name} — {letter.sound}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Alphabet
