import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu'
import CategoryPicker from './pages/CategoryPicker'
import Home from './pages/Home'
import Declension1 from './pages/Declension1'
import SmallTalk from './pages/SmallTalk'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/words" element={<CategoryPicker />} />
        <Route path="/words/practice" element={<Home />} />
        <Route path="/declension-1" element={<Declension1 />} />
        <Route path="/small-talk" element={<SmallTalk />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
