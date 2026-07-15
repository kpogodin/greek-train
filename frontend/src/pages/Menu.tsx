import { useNavigate } from 'react-router-dom'

function Menu() {
  const navigate = useNavigate()

  return (
    <section className="screen">
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
