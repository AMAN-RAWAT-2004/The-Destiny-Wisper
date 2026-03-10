import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteShell } from './components/SiteShell.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { FortunePage } from './pages/FortunePage.jsx'
import { CompatibilityPage } from './pages/CompatibilityPage.jsx'
import { WheelPage } from './pages/WheelPage.jsx'

export default function App() {
  return (
    <>
      <div className="starfield" />
      <SiteShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fortune/:id" element={<FortunePage />} />
          <Route path="/compatibility" element={<CompatibilityPage />} />
          <Route path="/wheel" element={<WheelPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SiteShell>
    </>
  )
}
