import { useNavigate } from 'react-router-dom'
import LearnerBadge from '../components/LearnerBadge'

function Menu() {
  const navigate = useNavigate()

  return (
    <section className="screen">
      <LearnerBadge />
      <div className="menu">
        <button type="button" className="menu-btn" onClick={() => navigate('/words')}>
          Слова
        </button>
        <button type="button" className="menu-btn" onClick={() => navigate('/declension-1')}>
          Склонение 1
        </button>
      </div>
    </section>
  )
}

export default Menu
