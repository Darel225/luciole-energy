import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDevisModal } from '../../context/DevisModalContext'
import { MapPin, ArrowRight } from 'lucide-react'
import { useReveal } from '../../hooks/useReveal'

export default function ProjectRow({ project, isLast = false }) {
  const rowRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const isVisible = useReveal(rowRef, { threshold: 0.15 })

  useEffect(() => {
    setIsReady(true)
  }, [])

  const isReverse = Boolean(project.reverse)

  return (
    <section
      id={project.id}
      ref={rowRef}
      aria-labelledby={`project-${project.id}-title`}
      className={`scroll-mt-28 bg-white ${
        !isLast ? 'border-b border-[var(--gris-bordure)]' : ''
      } ${isReady ? 'js-anim-ready' : ''} ${isVisible ? 'is-visible' : ''}`}
      style={{
        paddingTop: 'calc(var(--espace-section) / 1.4)',
        paddingBottom: 'calc(var(--espace-section) / 1.4)',
      }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-7 lg:gap-y-0 lg:gap-x-[clamp(40px,5vw,72px)]">
          {/* Colonne Image : Sur mobile et tablette (<1024px), systématiquement en premier (order-1) */}
          <div
            className={`w-full order-1 ${
              isReverse ? 'lg:order-2' : 'lg:order-1'
            } lg:col-span-6 expertise-reveal-item`}
          >
            <div
              className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-[var(--gris-fond)]"
              style={{
                borderRadius: 'var(--radius-image-expertise, 6px)',
                boxShadow: '0 12px 40px rgba(14, 26, 20, 0.08)',
              }}
            >
              <img
                src={project.image}
                alt={project.alt || project.titre}
                width="590"
                height="646"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  objectPosition: project.objectPosition || 'center center',
                  borderRadius: 'var(--radius-image-expertise, 6px)',
                }}
              />

              {/* Badge optionnel "Livré clés en main" pour le projet 02 en haut à gauche */}
              {project.hasKeyHandoverBadge && (
                <div className="absolute top-[14px] left-[14px] pointer-events-none z-10">
                  <div
                    className="px-3 py-1.5 rounded-[6px] shadow-sm font-semibold uppercase tracking-wider text-white text-[var(--fs-micro)]"
                    style={{ backgroundColor: 'var(--vert-principal)' }}
                  >
                    Livré clés en main
                  </div>
                </div>
              )}

              {/* Pastille de localisation en bas à gauche de l'image */}
              {project.locationLabel && (
                <div className="absolute bottom-[14px] left-[14px] max-w-[calc(100%-28px)] pointer-events-none z-10">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-[6px] shadow-sm backdrop-blur-[4px] border border-white/40"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    }}
                  >
                    <MapPin
                      size={14}
                      style={{ color: 'var(--vert-accent)' }}
                      className="shrink-0"
                      aria-hidden="true"
                    />
                    <span
                      className="text-[0.625rem] sm:text-[var(--fs-micro)] font-semibold uppercase tracking-wider leading-tight break-words whitespace-normal"
                      style={{ color: '#0E1A14' }}
                    >
                      {project.locationLabel}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Colonne Texte : Centrée face à l'image, max 520px */}
          <div
            className={`w-full order-2 ${
              isReverse ? 'lg:order-1' : 'lg:order-2'
            } lg:col-span-6 expertise-reveal-item`}
          >
            <div className="max-w-[520px] mx-auto lg:mx-0">
              {/* 1. Étiquette avec numéro de projet et catégorie */}
              <div className="flex flex-wrap items-baseline gap-2 mb-2">
                <span
                  className="font-semibold uppercase text-[var(--vert-accent)]"
                  style={{
                    fontSize: 'var(--fs-label)',
                    letterSpacing: '0.22em',
                  }}
                >
                  Projet {project.num}
                </span>
                <span className="text-[var(--vert-accent)]/50" aria-hidden="true">
                  ·
                </span>
                <span
                  className="uppercase tracking-wider text-[var(--gris-texte)] font-medium"
                  style={{ fontSize: 'var(--fs-micro)' }}
                >
                  {project.categorie}
                </span>
              </div>

              {/* 2. Titre H2 monochrome avec text-wrap: balance */}
              <h2
                id={`project-${project.id}-title`}
                className="font-bold tracking-tight text-[var(--texte-titre)] mb-0"
                style={{
                  fontSize: 'var(--fs-h2)',
                  lineHeight: 1.25,
                  textWrap: 'balance',
                }}
              >
                {project.titre}
              </h2>

              {/* 3. Trait d'accent signature */}
              <div
                className="h-[3px] rounded-[2px]"
                style={{
                  width: '40px',
                  backgroundColor: 'var(--vert-accent)',
                  margin: '18px 0 22px 0',
                }}
                aria-hidden="true"
              />

              {/* 4. Fiche Client / Lieu (petite carte fond gris clair) */}
              <div className="bg-[var(--gris-fond)] border border-[var(--gris-bordure)] rounded-[8px] p-3 sm:p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--gris-bordure)]">
                <div className="flex flex-col justify-center">
                  <span
                    className="uppercase text-[var(--gris-texte)] font-semibold tracking-wider mb-0.5"
                    style={{ fontSize: 'var(--fs-micro)' }}
                  >
                    CLIENT
                  </span>
                  <span
                    className="font-semibold text-[var(--texte-titre)] leading-tight"
                    style={{ fontSize: 'var(--fs-small)' }}
                  >
                    {project.client}
                  </span>
                </div>
                <div className="flex flex-col justify-center pt-2 sm:pt-0 sm:pl-4">
                  <span
                    className="uppercase text-[var(--gris-texte)] font-semibold tracking-wider mb-0.5"
                    style={{ fontSize: 'var(--fs-micro)' }}
                  >
                    LIEU
                  </span>
                  <span
                    className="font-semibold text-[var(--texte-titre)] leading-tight"
                    style={{ fontSize: 'var(--fs-small)' }}
                  >
                    {project.lieu}
                  </span>
                </div>
              </div>

              {/* 5. Description Longue */}
              <p
                className="font-normal text-[var(--gris-texte)] mb-5"
                style={{
                  fontSize: 'var(--fs-body)',
                  lineHeight: 1.7,
                }}
              >
                {project.descriptionLongue}
              </p>

              {/* 6. Tags techniques */}
              {project.tags && project.tags.length > 0 && (
                <ul
                  className="flex flex-wrap gap-2 mb-6 m-0 p-0 list-none"
                  aria-label="Spécificités techniques"
                >
                  {project.tags.map((tag, idx) => (
                    <li
                      key={idx}
                      className="inline-flex items-center px-2.5 py-1.5 rounded-[6px] bg-[var(--vert-pale)] text-[var(--vert-principal)] font-semibold tracking-wide"
                      style={{ fontSize: 'var(--fs-micro)' }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              {/* 7. Lien d'action B2B vers /contact */}
              <button
                type="button"
                onClick={() => openDevisModal({ service: project.title })}
                className="group inline-flex items-center gap-2 font-semibold text-[var(--vert-principal)] hover:text-[var(--vert-accent)] hover:underline transition-colors duration-250 cursor-pointer"
                style={{ fontSize: 'var(--fs-small)' }}
              >
                <span>Demander un projet similaire</span>
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-250 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
