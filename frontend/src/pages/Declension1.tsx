import { useNavigate } from 'react-router-dom'

function Declension1() {
  const navigate = useNavigate()

  return (
    <section className="screen">
      <button type="button" className="back-btn" onClick={() => navigate('/')}>
        ← Меню
      </button>
      <p className="status">Склонение 1 — скоро здесь что-то будет</p>
    </section>
  )
}

export default Declension1
