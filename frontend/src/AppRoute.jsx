import { Routes, Route } from 'react-router-dom'
import Landingpage from './landingpage'  // Fix the typo in the import
import About from './pages/preview/About'

function AppRoute() {
  console.log('AppRoute rendering') // Keep debug log
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default AppRoute