import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import RealisationsGrid from '../components/realisations/RealisationsGrid'
import Partners from '../components/home/Partners'
import CtaBanner from '../components/CtaBanner'
import heroRealImage from '../assets/images/hero-realisation.png'

export default function Realisations() {
  useEffect(() => {
    // SEO : Balise Title & Meta description
    document.title = 'Réalisations | Luciole Energy'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Découvrez les réalisations de Luciole Energy en Côte d\'Ivoire : lampadaires solaires, centrale photovoltaïque de 8 kWc, maintenance et mise aux normes de cellules et TGBT.'
      )
    }

    // Gestion fluide du scroll ou des ancres
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 150)
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero interne avec image de fond & overlay vert sombre */}
      <PageHero
        badge="Nos réalisations"
        title="L'impact en action.&#10;Des infrastructures qui durent."
        titleDot=""
        description="Découvrez une sélection de nos projets majeurs déployés pour les industries, les mines et les institutions en Côte d'Ivoire."
        breadcrumbs={[
          { label: 'Accueil', path: '/' },
          { label: 'Réalisations', path: '/realisations' },
        ]}
        image={heroRealImage}
        imageAlt="Centrale solaire photovoltaïque Luciole Energy en Côte d'Ivoire"
        animate={true}
      />

      {/* 2. Grille Bento des réalisations conforme au pixel près à la maquette */}
      <RealisationsGrid />

      {/* 3. Section Marques, Références & Agréments conforme à la maquette */}
      <Partners />

      {/* 4. Bloc CTA final sombre */}
      <CtaBanner
        animate={true}
        secondaryButton={{
          text: 'Découvrir nos expertises',
          url: '/expertises',
        }}
      />
    </main>
  )
}
