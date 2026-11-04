import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight, Shield } from 'lucide-react'
import identiteImg from '../../assets/images/identité-img.png'
import { useReveal } from '../../hooks/useReveal'
import { useParallax } from '../../hooks/useParallax'

const engagementPoints = [
  "Présence locale ancrée avec 7 agences déployées en Côte d'Ivoire.",
  "Maîtrise technique globale des réseaux HT/BT, froid industriel et solaire.",
  "Exigence de management qualité certifiée ISO 9001:2015.",
]

export default function Identity() {
  const sectionRef = useRef(null)
  const isVisible = useReveal(sectionRef, { threshold: 0.15 })
  const parallaxOffset = useParallax(sectionRef, 14, isVisible)

  return (
    <section
      id="identite"
      ref={sectionRef}
      className="bg-white overflow-x-clip"
      style={{
        paddingTop: 'var(--espace-section)',
        paddingBottom: 'var(--espace-section)',
      }}
    >
      <div className="container-custom">
        {/* Grille 2 colonnes : Texte à gauche, Image à droite */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center"
          style={{ columnGap: 'clamp(48px, 6vw, 88px)', rowGap: '48px' }}
        >
          
          {/* Colonne Gauche : Texte & Engagements (stagger 90ms) */}
          <div className="order-1 lg:order-1 flex flex-col justify-center max-w-[600px]">
            {/* 1. Étiquette */}
            <p className="reveal text-[var(--fs-label)] uppercase font-semibold text-[var(--vert-accent)] tracking-[0.22em] mb-3">
              Notre identité & engagement
            </p>

            {/* 2. Titre H2 unifié en un seul bloc */}
            <h2
              className="reveal stagger-1 font-bold text-[var(--texte-titre)] leading-[1.18] tracking-[-0.015em] max-w-[26ch]"
              style={{ fontSize: 'var(--fs-h2)' }}
            >
              L'ingénierie ivoirienne au standard international.
            </h2>

            {/* 3. Trait d'accent signature (.reveal--line, 700ms) */}
            <div
              className="reveal--line stagger-2 w-[40px] h-[3px] bg-[var(--vert-accent)] rounded-[2px]"
              style={{ margin: '16px 0 20px', transitionDuration: '700ms' }}
              aria-hidden="true"
            />

            {/* 4. Paragraphe principal */}
            <p className="reveal stagger-3 text-[var(--fs-body)] leading-[1.7] text-[var(--gris-texte)] max-w-[600px] mb-6">
              Luciole Energy est votre partenaire stratégique pour la conception, la réalisation et la maintenance de vos infrastructures énergétiques. Nous garantissons fiabilité, sécurité et conformité aux normes ISO 9001:2015.
            </p>

            {/* 5. 3 points d'engagement avec icône Check animée (scale 0.6 -> 1) */}
            <ul className="space-y-3 mb-7 w-full list-none p-0 m-0" aria-label="Engagements clés Luciole Energy">
              {engagementPoints.map((point, index) => {
                const staggerClass = index === 0 ? 'stagger-4' : index === 1 ? 'stagger-5' : 'stagger-6'
                return (
                  <li key={index} className={`reveal ${staggerClass} flex items-start gap-3`}>
                    <div className={`check-pop ${staggerClass} w-7 h-7 rounded-[6px] bg-[var(--vert-pale)] border border-[var(--vert-accent)]/20 flex items-center justify-center shrink-0 mt-0.5`}>
                      <Check size={14} strokeWidth={2.25} className="text-[var(--vert-accent)]" aria-hidden="true" />
                    </div>
                    <span className="text-[0.875rem] font-semibold text-[var(--texte-titre)] leading-snug">
                      {point}
                    </span>
                  </li>
                )
              })}
            </ul>

            {/* 6. Bouton contour "Découvrir notre entreprise" */}
            <div className="reveal stagger-6 pt-1">
              <Link
                to="/a-propos"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[8px] border border-[var(--vert-principal)] text-[var(--vert-principal)] hover:bg-[var(--vert-principal)] hover:text-white transition-all duration-300 text-[0.875rem] font-semibold shadow-sm hover:shadow hover:-translate-y-[1px]"
              >
                <span>Découvrir notre entreprise</span>
                <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Colonne Droite : Image portrait avec révélation clip-left & parallaxe */}
          <div className="order-2 lg:order-2 relative w-full max-w-full sm:max-w-[480px] lg:max-w-[520px] mx-auto lg:ml-auto identity-image-wrap">
            {/* Grille de points décorative : fade 600ms délai 300ms */}
            <div
              className="reveal--fade absolute -top-7 -right-7 w-24 h-[72px] z-0 hidden lg:block pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(31, 157, 92, 0.40) 1.6px, transparent 1.8px)',
                backgroundSize: '12px 12px',
                transition: 'opacity 600ms var(--ease-out) 300ms',
              }}
              aria-hidden="true"
            />

            {/* Conteneur image : clip-left 1100ms, border-radius 10px intact */}
            <div
              className="reveal--clip-left relative z-10 w-full overflow-hidden aspect-[4/5] lg:aspect-[3/4] bg-white border border-[var(--gris-bordure)] rounded-[10px]"
              style={{
                boxShadow: '0 12px 40px rgba(14, 26, 20, 0.08)',
                borderRadius: '10px',
              }}
            >
              {/* Image interne : agrandie de 6% pour le décalage, scale(1.12) -> 1 en 1400ms, zoom hover 1.04 */}
              <div
                className="w-full h-full overflow-hidden"
                style={{
                  transform: `translate3d(0, ${parallaxOffset}px, 0)`,
                  willChange: parallaxOffset ? 'transform' : 'auto',
                }}
              >
                <img
                  src={identiteImg}
                  alt="Équipe d'ingénieurs et techniciens de Luciole Energy collaborant sur plan"
                  className="w-full h-[106%] object-cover -mt-[3%] transition-transform duration-700 ease-out"
                  style={{
                    objectPosition: 'center 40%',
                    imageRendering: 'auto',
                  }}
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="896"
                />
              </div>
              
              {/* Badge flottant : fade + translateY(10px), 600ms, délai 900ms */}
              <div
                className="reveal absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-[10px_14px] rounded-[8px] border border-white/60 shadow-lg flex items-center gap-2.5 z-20"
                style={{
                  transition: 'opacity 600ms var(--ease-out) 900ms, transform 600ms var(--ease-out) 900ms',
                }}
              >
                <span className="w-6 h-6 rounded-full bg-[var(--vert-accent)]/15 flex items-center justify-center shrink-0 text-[var(--vert-principal)]">
                  <Shield size={14} className="text-[var(--vert-principal)]" />
                </span>
                <span
                  className="text-[0.8125rem] font-semibold leading-tight"
                  style={{ color: '#0E1A14' }}
                >
                  Excellence technique & Rigueur locale
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
