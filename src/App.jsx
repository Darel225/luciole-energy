import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { DevisModalProvider } from './context/DevisModalContext'
import DevisRequestModal from './components/common/DevisRequestModal'

import Layout from './components/layout/Layout'
import Accueil from './pages/Accueil'
import APropos from './pages/APropos'
import Expertises from './pages/Expertises'
import Realisations from './pages/Realisations'
import Contact from './pages/Contact'
import MentionsLegales from './pages/MentionsLegales'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'

// Remonte en haut de page lors d'un changement d'onglet
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <DevisModalProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Accueil />} />
            <Route path="a-propos" element={<APropos />} />
            <Route path="expertises" element={<Expertises />} />
            <Route path="realisations" element={<Realisations />} />
            <Route path="contact" element={<Contact />} />
            <Route path="mentions-legales" element={<MentionsLegales />} />
            <Route path="politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="confidentialite" element={<PolitiqueConfidentialite />} />
          </Route>
        </Routes>
        <DevisRequestModal />
      </Router>
    </DevisModalProvider>
  )
}
