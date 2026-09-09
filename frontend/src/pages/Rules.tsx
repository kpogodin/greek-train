import { useNavigate } from 'react-router-dom'
import { ruleSections } from './rules/sections'

function Rules() {
  const navigate = useNavigate()

  return (
    <div className="rules-page">
      <button type="button" className="back-btn" onClick={() => navigate('/')}>
        ← Меню
      </button>
      <h1 className="rules-heading">Правила</h1>

      <div className="rules-layout">
        <nav className="rules-toc">
          {ruleSections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>

        <main className="rules-content">
          {ruleSections.map((section) => (
            <section key={section.id} id={section.id} className="rule-section">
              <h2 className="rule-section-title">{section.title}</h2>
              {section.content}
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}

export default Rules
