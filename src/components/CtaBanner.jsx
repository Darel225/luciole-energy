import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDevisModal } from '../context/DevisModalContext'
import { ArrowRight, LayoutGrid } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

export default function CtaBanner({
  badge = "Passez à l'action • Bureau d'études",
  title = "Prêt à concrétiser vos ambitions énergétiques ?",
  description = "Contactez notre bureau d'études pour une évaluation personnalisée de vos infrastructures industrielles et tertiaires en Côte d'Ivoire et en Afrique de l'Ouest.",
  primaryButton = {
    text: 'Contactez-nous',
    url: '/contact',
  },
  secondaryButton = {
    text: 'Découvrir nos réalisations',
    url: '/realisations',
  },
  animate = true,
}) {
  const location = useLocation()
  const isTargetPage =
    location.pathname === '/a-propos' ||
    location.pathname === '/a-propos/' ||
    location.pathname === '/expertises' ||
    location.pathname === '/expertises/' ||
    location.pathname === '/realisations' ||
    location.pathname === '/realisations/'
  const shouldAnimate = animate && isTargetPage

  const { openDevisModal } = useDevisModal()
  const sectionRef = useRef(null)
  const isRevealVisible = useReveal(sectionRef, { threshold: 0.15 })
  const isVisible = !shouldAnimate || isRevealVisible
  const [isPulsed, setIsPulsed] = useState(false)

  // Impulsion halo unique déclenchée 600ms après l'entrée du bouton
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsPulsed(true)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      className="bg-white"
      style={{
        paddingTop: 'var(--espace-section)',
        paddingBottom: 'var(--espace-section)',
      }}
    >
      <div className="container-custom">
        {/* Bloc entier : fade + translateY(20px) en 800ms */}
        <div
          className={`reveal rounded-[16px] px-6 py-10 sm:px-10 sm:py-14 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-soft border border-white/10 ${
            isVisible ? 'is-visible' : ''
          }`}
          style={{
            background: 'linear-gradient(135deg, #0B1620 0%, #072318 100%)',
            transitionDuration: '800ms',
          }}
        >
          {/* Étiquette simple en vert clair */}
          {badge && (
            <p
              className={`reveal ${isVisible ? 'is-visible' : ''} text-[var(--fs-label)] uppercase font-semibold tracking-[0.22em] mb-3`}
              style={{ color: '#3DDC84', '--delay': '0ms' }}
            >
              {badge}
            </p>
          )}

          {/* Titre H2 forcé en blanc pur en un seul bloc */}
          <h2
            className={`reveal stagger-1 ${isVisible ? 'is-visible' : ''} cta-title-white max-w-2xl mx-auto mb-3`}
            style={{
              color: '#FFFFFF',
              fontSize: 'var(--fs-h2)',
              lineHeight: 1.18,
              fontWeight: 700,
            }}
          >
            {title}
          </h2>

          {/* Description en blanc à 80% */}
          {description && (
            <p
              className={`reveal stagger-2 ${isVisible ? 'is-visible' : ''} max-w-2xl mx-auto mb-7 font-normal`}
              style={{
                color: 'rgba(255, 255, 255, 0.80)',
                fontSize: 'var(--fs-body)',
                lineHeight: 1.7,
              }}
            >
              {description}
            </p>
          )}

          {/* Boutons d'action : visibles et stables */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {primaryButton && (
              primaryButton.url && primaryButton.url !== '/contact' ? (
                <Link
                  to={primaryButton.url}
                  className={`cta-primary-btn ${isVisible ? 'is-visible' : ''} ${
                    isPulsed ? 'is-pulsed' : ''
                  } group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[8px] bg-[var(--vert-principal)] hover:bg-[#0B472C] text-white text-[0.875rem] font-semibold transition-all duration-250 shadow-sm hover:shadow hover:-translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vert-accent)] cursor-pointer`}
                >
                  <span style={{ color: '#FFFFFF' }}>{primaryButton.text}</span>
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-250 group-hover:translate-x-[3px] text-white"
                  />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => openDevisModal()}
                  className={`cta-primary-btn ${isVisible ? 'is-visible' : ''} ${
                    isPulsed ? 'is-pulsed' : ''
                  } group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[8px] bg-[var(--vert-principal)] hover:bg-[#0B472C] text-white text-[0.875rem] font-semibold transition-all duration-250 shadow-sm hover:shadow hover:-translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vert-accent)] cursor-pointer`}
                >
                  <span style={{ color: '#FFFFFF' }}>{primaryButton.text}</span>
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-250 group-hover:translate-x-[3px] text-white"
                  />
                </button>
              )
            )}

            {secondaryButton && (
              <Link
                to={secondaryButton.url}
                className={`cta-secondary-btn ${isVisible ? 'is-visible' : ''} w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[8px] bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/35 text-[0.875rem] font-semibold backdrop-blur-sm transition-all duration-250 hover:-translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white`}
              >
                <LayoutGrid size={16} aria-hidden="true" className="text-white/80" />
                <span style={{ color: '#FFFFFF' }}>{secondaryButton.text}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
