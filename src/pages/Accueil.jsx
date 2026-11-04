import Hero from '../components/home/Hero'
import Partners from '../components/home/Partners'
import Identity from '../components/home/Identity'
import Expertise from '../components/home/Expertise'
import Stats from '../components/home/Stats'
import Projects from '../components/home/Projects'
import CtaDevis from '../components/home/CtaDevis'

export default function Accueil() {
  return (
    <main className="w-full overflow-hidden">
      {/* 1. Hero : Chorégraphie d'intro au chargement & parallaxe douce */}
      <Hero />

      {/* 2. Bandeau marques, références et agréments : Marquee fluide & hover */}
      <Partners />

      {/* 3. Notre identité et engagement : Révélation clip-left, stagger texte & check pop */}
      <Identity />

      {/* 4. Nos Domaines d'Expertise : En-tête centré & cascade de cartes avec images dynamiques */}
      <Expertise />

      {/* 5. Indicateurs d'excellence et disponibilité : Clip-up vert, compteurs useCountUp & séparateurs scaleY */}
      <Stats />

      {/* 6. Projets Phares : Cartes avec zoom hover & pastilles différées */}
      <Projects />

      {/* 7. CTA final Devis & Accompagnement : Trait scaleX, badge retardé & impulsion halo unique */}
      <CtaDevis />
    </main>
  )
}
