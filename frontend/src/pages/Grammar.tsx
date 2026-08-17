import { useNavigate } from 'react-router-dom'

function Grammar() {
  const navigate = useNavigate()

  return (
    <section className="screen category-screen">
      <button type="button" className="back-btn" onClick={() => navigate('/')}>
        ← Меню
      </button>
      <div className="menu">
        <button type="button" className="menu-btn" onClick={() => navigate('/grammar/be')}>
          Глагол «быть» (είμαι)
        </button>
        <button type="button" className="menu-btn" onClick={() => navigate('/grammar/verbs-a')}>
          Глаголы A (Α΄ Συζυγία)
        </button>
        <button type="button" className="menu-btn" onClick={() => navigate('/grammar/verbs-b1')}>
          Глаголы B1 (Β1΄ Συζυγία)
        </button>
      </div>
    </section>
  )
}

export default Grammar
