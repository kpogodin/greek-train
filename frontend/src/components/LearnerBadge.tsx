import { useState } from 'react'
import { getLearnerName, setLearnerName } from '../learner'

function LearnerBadge() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(getLearnerName() ?? '')
  const current = getLearnerName()

  const save = () => {
    setLearnerName(name)
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className="learner-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Пользователь"
      >
        👤
      </button>
      {open && (
        <>
          <div className="learner-backdrop" onClick={() => setOpen(false)} />
          <div className="learner-popover">
            <p className="learner-current">
              {current ? `Сейчас: ${current}` : 'Имя не задано'}
            </p>
            <input
              type="text"
              className="learner-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save()
              }}
              placeholder="Твоё имя"
              autoFocus
            />
            <button type="button" className="action-btn" onClick={save}>
              Сохранить
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default LearnerBadge
