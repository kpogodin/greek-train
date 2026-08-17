import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu'
import CategoryPicker from './pages/CategoryPicker'
import ReviewStart from './pages/ReviewStart'
import Home from './pages/Home'
import Grammar from './pages/Grammar'
import VerbToBe from './pages/VerbToBe'
import VerbsA from './pages/VerbsA'
import VerbsB1 from './pages/VerbsB1'
import SmallTalk from './pages/SmallTalk'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/words" element={<CategoryPicker />} />
        <Route path="/words/review" element={<ReviewStart />} />
        <Route path="/words/practice" element={<Home />} />
        <Route path="/grammar" element={<Grammar />} />
        <Route path="/grammar/be" element={<VerbToBe />} />
        <Route path="/grammar/verbs-a" element={<VerbsA />} />
        <Route path="/grammar/verbs-b1" element={<VerbsB1 />} />
        <Route path="/small-talk" element={<SmallTalk />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
