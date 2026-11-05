import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDevisModal } from '../../context/DevisModalContext'
import { ArrowRight } from 'lucide-react'
import heroImg from '../../assets/images/hero-acceuil.webp'

export default function Hero() {
  const { openDevisModal } = useDevisModal()
  const [isReady, setIsReady] = useState(false)
  const [parallaxY, setParallaxY] = useState(0)
  const sectionRef = useRef(null)

  // 1. Déclenchement de la chorégraphie une seule fois au chargement
  useEffect(() => {
    // Si reduced-motion, affichage direct
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsReady(true)
      document.documentElement.classList.add('hero-ready')
      return
    }

    const img = new Image()
    img.src = heroImg

    const triggerIntro = () => {
      // Petite temporisation de 50ms pour laisser le navigateur peindre avant les transitions
      requestAnimationFrame(() => {
        setIsReady(true)
        document.documentElement.classList.add('hero-ready')
      })
    }

    if (img.complete) {
      triggerIntro()
    } else {
      img.onload = triggerIntro
      // Fallback de sécurité si l'événement tarde
      setTimeout(triggerIntro, 400)
    }

    return () => {
      // Nettoyage si démontage
    }
  }, [])

  // 2. Parallaxe douce de l'image de fond (translateY max 40px vers le bas, desktop >= 1024px)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const isDesktop = window.innerWidth >= 1024
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isDesktop || prefersReducedMotion) return

    let rafId = null

    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        if (scrollY <= 800) {
          // Décalage max 40px vers le bas
          const offset = Math.min(40, Math.round(scrollY * 0.12))
          setParallaxY(offset)
        }
        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[560px] max-h-[720px] h-[85vh] flex items-center overflow-hidden bg-[var(--bleu-nuit)]"
    >
      {/* Image de fond pleine largeur avec scale intro et parallaxe douce */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            transform: `translate3d(0, ${parallaxY}px, 0)`,
            willChange: parallaxY ? 'transform' : 'auto',
          }}
        >
          <img
            src={heroImg}
            alt="Technicien en ingénierie électrique industrielle sur site Luciole Energy"
            className="hero-bg-img w-full h-[108%] object-cover object-right md:object-center -mt-[4%]"
            width="1920"
            height="1080"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Overlay renforcé : de rgba(6,14,11,.85) à gauche vers rgba(6,14,11,.25) à droite (visible dès t=0, aucun flash) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(6, 14, 11, 0.85) 0%, rgba(6, 14, 11, 0.72) 45%, rgba(6, 14, 11, 0.25) 100%)',
          }}
        />
      </div>

      {/* Contenu textuel */}
      <div className="container-custom relative z-10 w-full py-12">
        <div className="max-w-[620px] flex flex-col items-start text-left">
          
          {/* t=250ms : Étiquette / Pastille discrète */}
          <div className="section-badge-dark mb-5 hero-badge-anim">
            <span className="w-2 h-2 rounded-full bg-[var(--vert-accent-light)] animate-pulse" aria-hidden="true" />
            <span>Ingénierie & Énergies Industrielles</span>
          </div>

          {/* t=380ms : Titre Principal H1 forcé en blanc + filtre blur(8px) -> 0 + ombre douce */}
          <h1 className="hero-title-white mb-6 hero-h1-anim">
            L'expertise au service<br />
            de vos{' '}
            <span className="hero-highlight-word">projets énergétiques</span>.
          </h1>

          {/* t=650ms : Description en blanc à 88% d'opacité */}
          <p
            className="hero-p-anim text-[1rem] sm:text-[1.0625rem] leading-[1.65] mb-8 font-normal"
            style={{ color: 'rgba(255, 255, 255, 0.88)' }}
          >
            De l'étude à la réalisation, Luciole Energy accompagne les entreprises et les industries avec des solutions énergétiques fiables, performantes et durables.
          </p>

          {/* t=800ms & t=900ms : Groupe de deux boutons d'action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => openDevisModal()}
              className="hero-btn-1 group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[8px] bg-[var(--vert-principal)] hover:bg-[#0B472C] text-white text-[0.875rem] font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vert-accent)] focus-visible:ring-offset-2 cursor-pointer"
            >
              <span>Demander une étude de projet</span>
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <a
              href="#expertises"
              className="hero-btn-2 inline-flex items-center justify-center px-6 py-3.5 rounded-[8px] bg-white/10 hover:bg-white/15 text-white border border-white/25 hover:border-white/40 text-[0.875rem] font-semibold backdrop-blur-sm transition-all duration-300 hover:-translate-y-[1px]"
            >
              Découvrir nos expertises
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
