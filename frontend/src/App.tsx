import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu'
import CategoryPicker from './pages/CategoryPicker'
import Home from './pages/Home'
import Declension1 from './pages/Declension1'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/words" element={<CategoryPicker />} />
        <Route path="/words/practice" element={<Home />} />
        <Route path="/declension-1" element={<Declension1 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
