import { useNavigate } from 'react-router-dom'
import LearnerBadge from '../components/LearnerBadge'

function Menu() {
  const navigate = useNavigate()

  return (
    <section className="screen">
      <LearnerBadge />
      <div className="menu">
        <button type="button" className="menu-btn" onClick={() => navigate('/words')}>
          Слова (Λέξεις)
        </button>
        <button type="button" className="menu-btn" onClick={() => navigate('/grammar')}>
          Грамматика
        </button>
        <button type="button" className="menu-btn" onClick={() => navigate('/small-talk')}>
          Small Talk (Κουβεντούλα)
        </button>
      </div>
    </section>
  )
}

export default Menu
