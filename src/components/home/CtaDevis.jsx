import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDevisModal } from '../../context/DevisModalContext'
import { ArrowRight, Clock, CheckCircle2, Award } from 'lucide-react'
import ctaDevisImg from '../../assets/images/image-devis.webp'
import { useReveal } from '../../hooks/useReveal'
import { useParallax } from '../../hooks/useParallax'

export default function CtaDevis() {
  const { openDevisModal } = useDevisModal()
  const sectionRef = useRef(null)
  const isVisible = useReveal(sectionRef, { threshold: 0.15 })
  const parallaxOffset = useParallax(sectionRef, 12, isVisible)

  return (
    <section
      ref={sectionRef}
      className="bg-white"
      style={{
        paddingTop: 'clamp(1rem, 2vw, 1.5rem)',
        paddingBottom: 'var(--espace-section)',
      }}
    >
      <div className="container-custom">
        {/* Grand bloc arrondi : fade + translateY(20px), 800ms */}
        <div
          className="reveal rounded-[12px] bg-[var(--gris-fond)] border border-[var(--gris-bordure)] p-8 sm:p-10 lg:p-12 shadow-soft"
          style={{ transitionDuration: '800ms' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Colonne Gauche : Texte & Action en stagger 90ms */}
            <div className="lg:col-span-7 flex flex-col items-start max-w-[600px]">
              
              {/* Étiquette */}
              <p className="reveal text-[var(--fs-label)] uppercase font-semibold text-[var(--vert-accent)] tracking-[0.22em] mb-2">
                Démarrer un projet
              </p>

             

              {/* Titre H2 monochrome */}
              <h2
                className="reveal stagger-2 font-bold text-[var(--texte-titre)] leading-[1.18] tracking-[-0.015em] mb-3"
                style={{ fontSize: 'var(--fs-h2)' }}
              >
                Transformez votre besoin en solution concrète.
              </h2>

              {/* Trait d'accent signature (.reveal--line) */}
              <div
                className="reveal--line stagger-3 w-[40px] h-[3px] bg-[var(--vert-accent)] rounded-[2px]"
                style={{ margin: '14px 0 18px', transitionDuration: '700ms' }}
                aria-hidden="true"
              />

              {/* Paragraphe en --fs-body */}
              <p className="reveal stagger-4 text-[var(--fs-body)] leading-[1.7] text-[var(--gris-texte)] mb-6 max-w-[600px]">
                Un projet industriel ou tertiaire en Côte d'Ivoire ? Nos ingénieurs sont prêts à vous accompagner avec rigueur et haute disponibilité.
              </p>

              {/* Bouton avec impulsion halo unique + Mention Réponse sous 24h ouvrées */}
              <div className="reveal stagger-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => openDevisModal()}
                  className={`${isVisible ? 'cta-button-pulse' : ''} group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[8px] bg-[var(--vert-principal)] hover:bg-[#0B472C] text-white text-[0.875rem] font-semibold transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vert-accent)] cursor-pointer`}
                >
                  <span>Demander un devis</span>
                  <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <div className="flex items-center gap-2 text-[var(--fs-small)] text-[var(--gris-texte)] font-medium">
                  <Clock size={16} className="text-[var(--vert-principal)] shrink-0" aria-hidden="true" />
                  <span>Réponse sous 24h ouvrées</span>
                </div>
              </div>

              {/* 2 mentions de réassurance sous le bouton */}
              <div className="reveal stagger-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-[var(--gris-bordure)] w-full">
                <div className="flex items-center gap-2.5 text-[var(--fs-small)] text-[var(--texte-titre)] font-medium">
                  <CheckCircle2 size={16} className="text-[var(--vert-principal)] shrink-0" aria-hidden="true" />
                  <span>Études d'ingénierie</span>
                </div>
                <div className="flex items-center gap-2.5 text-[var(--fs-small)] text-[var(--texte-titre)] font-medium">
                  <CheckCircle2 size={16} className="text-[var(--vert-principal)] shrink-0" aria-hidden="true" />
                  <span>Normes ISO 9001 & Sécurité</span>
                </div>
              </div>

            </div>

            {/* Colonne Droite : Image avec clip-up, scale interne 1.12 -> 1, parallaxe ±12px */}
            <div className="lg:col-span-5 relative w-full max-w-[440px] mx-auto lg:ml-auto">
              <div
                className="reveal--clip-up relative overflow-hidden aspect-[4/5] bg-white border border-[var(--gris-bordure)] rounded-none shadow-soft"
                style={{ borderRadius: '0px', transitionDuration: '900ms' }}
              >
                <div
                  className="w-full h-full overflow-hidden"
                  style={{
                    transform: `translate3d(0, ${parallaxOffset}px, 0)`,
                    willChange: parallaxOffset ? 'transform' : 'auto',
                  }}
                >
                  <img
                    src={ctaDevisImg}
                    alt="Ingénieure de terrain Luciole Energy sur site photovoltaïque industriel"
                    className="w-full h-[106%] object-cover rounded-none -mt-[3%] transition-transform duration-700 ease-out"
                    style={{
                      borderRadius: '5px',
                      objectPosition: 'center 30%',
                    }}
                    loading="lazy"
            decoding="async"
                    width="896"
                    height="1200"
                  />
                </div>

                {/* Badge flottant compact en dernier (délai 800ms) */}
                <div
                  className="reveal absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-[10px_14px] rounded-[8px] border border-white/60 shadow-md flex items-center gap-2.5 z-20"
                  style={{
                    transition: 'opacity 600ms var(--ease-out) 800ms, transform 600ms var(--ease-out) 800ms',
                  }}
                >
                  <Award size={15} className="text-[var(--vert-principal)] shrink-0" aria-hidden="true" />
                  <span
                    className="text-[0.8125rem] font-semibold leading-tight"
                    style={{ color: '#0E1A14' }}
                  >
                    Équipes certifiées sur le terrain
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
