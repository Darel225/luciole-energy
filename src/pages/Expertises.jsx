import { useEffect, useRef } from 'react'
import PageHero from '../components/PageHero'
import ServicesList from '../components/expertises/ServicesList'
import CtaBanner from '../components/CtaBanner'
import { expertisesPageData } from '../data/expertises'
import { useReveal } from '../hooks/useReveal'

export default function Expertises() {
  useEffect(() => {
    // Scroll en haut à l'arrivée sur la page
    window.scrollTo(0, 0)

    // SEO : Balise Title & Meta description
    document.title = 'Expertises | Luciole Energy'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Électricité HT/BT, énergies renouvelables, climatisation et froid industriel, groupes électrogènes, éclairage public : les pôles d\'expertise de Luciole Energy en Côte d\'Ivoire.'
      )
    }
  }, [])

  const { hero, intro } = expertisesPageData
  const introRef = useRef(null)
  const isIntroVisible = useReveal(introRef, { threshold: 0.25 })

  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero interne réutilisant PageHero */}
      <PageHero
        badge={hero.badge}
        title={hero.title}
        titleDot={hero.titleDot}
        description={hero.description}
        breadcrumbs={hero.breadcrumbs}
        image={hero.image}
        imageAlt={hero.imageAlt}
        animate={true}
      />

      {/* 2. Introduction avant les pôles */}
      <section
        id="introduction-expertises"
        ref={introRef}
        aria-labelledby="intro-expertises-title"
        className="bg-white text-center"
        style={{
          paddingTop: 'var(--espace-section)',
          paddingBottom: 'calc(var(--espace-section) * 0.4)',
        }}
      >
        <div className="container-custom">
          {/* Étiquette : fade + translateY(12px), 600ms */}
          <p
            className={`intro-expertises-label reveal ${isIntroVisible ? 'is-visible' : ''} font-semibold uppercase text-[var(--vert-accent)] mb-3`}
            style={{
              fontSize: 'var(--fs-label)',
              letterSpacing: '0.22em',
            }}
          >
            {intro.label}
          </p>

          {/* H2 centré sur 2 lignes max : fade + translateY(20px) + blur(6px) -> 0, 800ms */}
          <h2
            id="intro-expertises-title"
            className={`intro-expertises-h2 reveal stagger-1 ${isIntroVisible ? 'is-visible' : ''} font-bold tracking-tight text-[var(--texte-titre)] mx-auto mb-0 max-w-[22ch]`}
            style={{
              fontSize: 'var(--fs-h2)',
              lineHeight: 1.25,
            }}
          >
            {intro.title}
          </h2>

          {/* Trait d'accent centré : scaleX 0 -> 1 depuis le centre, 700ms */}
          <div
            className={`intro-expertises-line reveal--line-center stagger-2 ${isIntroVisible ? 'is-visible' : ''} h-[3px] rounded-[2px] mx-auto`}
            style={{
              width: '40px',
              backgroundColor: 'var(--vert-accent)',
              margin: '18px auto 22px auto',
              transitionDuration: '700ms',
            }}
            aria-hidden="true"
          />

          {/* Paragraphe centré : fade + translateY(16px), 700ms */}
          <p
            className={`intro-expertises-p reveal stagger-3 ${isIntroVisible ? 'is-visible' : ''} font-normal text-[var(--gris-texte)] mx-auto max-w-[60ch]`}
            style={{
              fontSize: 'var(--fs-body)',
              lineHeight: 1.7,
            }}
          >
            {intro.description}
          </p>
        </div>
      </section>

      {/* 3. Les 5 pôles d'expertise en zig-zag (modèle ServicesList) */}
      <ServicesList />

      {/* 4. Bloc CTA final */}
      <CtaBanner animate={true} />
    </main>
  )
}
