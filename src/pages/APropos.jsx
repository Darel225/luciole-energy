import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import WhoWeAre from '../components/about/WhoWeAre'
import Engagement from '../components/about/Engagement'
import Standards from '../components/about/Standards'
import Approach from '../components/about/Approach'
import CtaBanner from '../components/CtaBanner'
import { aboutData } from '../data/about'

export default function APropos() {
  // Mise à jour des métadonnées SEO spécifiques à la page À Propos
  useEffect(() => {
    document.title = 'À propos | Luciole Energy'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Découvrez l\'histoire, la vision et les engagements d\'excellence de Luciole Energy, acteur majeur de l\'ingénierie énergétique et des réseaux industriels en Côte d\'Ivoire.'
      )
    }
  }, [])

  const { hero, cta } = aboutData

  return (
    <main className="w-full overflow-hidden bg-white">
      {/* 1. Hero interne avec image, overlay vert sombre et fil d'Ariane */}
      <PageHero
        badge={hero.badge}
        title={hero.title}
        titleDot="."
        description={hero.description}
        image={hero.image}
        imageAlt={hero.imageAlt}
        breadcrumbs={[
          { label: 'Accueil', path: '/' },
          { label: 'À Propos', path: '/a-propos' },
        ]}
      />

      {/* 2. Section Qui sommes-nous ? (placée immédiatement après le Hero) */}
      <WhoWeAre />

      {/* 3. Section Engagement pour l'Avenir */}
      <Engagement />

      {/* 4. Section Standards & Certifications */}
      <Standards />

      {/* 5. Section Notre Approche Opérationnelle */}
      <Approach />

      {/* 6. Bloc CTA Final */}
      <CtaBanner
        badge={cta.badge}
        title={cta.title}
        description={cta.description}
        primaryButton={cta.primaryButton}
        secondaryButton={cta.secondaryButton}
      />
    </main>
  )
}