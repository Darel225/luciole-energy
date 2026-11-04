import { useRef, useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { useReveal } from '../../hooks/useReveal'

export default function ExpertiseRow({
  pole,
  numero,
  etiquette,
  titre,
  description,
  liste,
  image,
  alt,
  legende,
  sens,
  isLast = false,
}) {
  const rowRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const isVisible = useReveal(rowRef, { threshold: 0.15 })

  useEffect(() => {
    setIsReady(true)
  }, [])

  // Extraction robuste pour supporter soit l'objet pole, soit les props unitaires
  const id = pole?.id || numero || '01'
  const labelText = pole?.label || etiquette || `Pôle d'expertise ${id}`
  const titleText = pole?.title || titre || ''
  const descText = pole?.description || description || ''
  const listItems = pole?.list || liste || []
  const imageSrc = pole?.image || image
  const altText = pole?.alt || alt || ''
  const legendText = pole?.legend || legende || ''
  const isReverse = pole?.reverse ?? (sens === 'image-droite')
  const width = pole?.width || 1200
  const height = pole?.height || 896
  const objectPosition = pole?.objectPosition || 'center center'

  return (
    <section
      id={`pole-${id}`}
      ref={rowRef}
      aria-labelledby={`pole-${id}-title`}
      className={`bg-white ${!isLast ? 'border-b border-[var(--gris-bordure)]' : ''} ${
        isReady ? 'js-anim-ready' : ''
      } ${isVisible ? 'is-visible' : ''}`}
      style={{
        paddingTop: 'calc(var(--espace-section) / 1.4)',
        paddingBottom: 'calc(var(--espace-section) / 1.4)',
      }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-7 lg:gap-y-0 lg:gap-x-[clamp(40px,5vw,72px)]">
          {/* Colonne Image : Sur mobile et tablette (<1024px), toujours en premier (order-1) */}
          <div
            className={`w-full order-1 ${
              isReverse ? 'lg:order-2' : 'lg:order-1'
            } lg:col-span-5 expertise-reveal-item`}
          >
            <div
              className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-[var(--gris-fond)]"
              style={{
                borderRadius: 'var(--radius-image-expertise, 6px)',
                boxShadow: '0 12px 40px rgba(14, 26, 20, 0.08)',
              }}
            >
              <img
                src={imageSrc}
                alt={altText}
                width={width}
                height={height}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  objectPosition: objectPosition,
                  borderRadius: 'var(--radius-image-expertise, 6px)',
                }}
              />

              {/* Légende en bas de l'image */}
              {legendText && (
                <div className="absolute bottom-[14px] left-[14px] max-w-[calc(100%-28px)] pointer-events-none">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-[6px] shadow-sm backdrop-blur-[4px]"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--vert-accent)' }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-[0.625rem] sm:text-[var(--fs-micro)] font-semibold uppercase tracking-wider leading-tight break-words whitespace-normal"
                      style={{ color: '#0E1A14' }}
                    >
                      {legendText}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Colonne Texte : Centré face à l'image, max 560px */}
          <div
            className={`w-full order-2 ${
              isReverse ? 'lg:order-1' : 'lg:order-2'
            } lg:col-span-7 expertise-reveal-item`}
          >
            <div className="max-w-[560px] mx-auto lg:mx-0">
              {/* 1. Étiquette */}
              <p
                className="font-semibold uppercase text-[var(--vert-accent)] mb-3"
                style={{
                  fontSize: 'var(--fs-label)',
                  letterSpacing: '0.22em',
                }}
              >
                {labelText}
              </p>

              {/* 2. Titre H2 monochrome */}
              <h2
                id={`pole-${id}-title`}
                className="font-bold tracking-tight text-[var(--texte-titre)] mb-0"
                style={{
                  fontSize: 'var(--fs-h2)',
                  lineHeight: 1.25,
                }}
              >
                {titleText}
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

              {/* 4. Description */}
              <p
                className="font-normal text-[var(--gris-texte)] mb-6 max-w-[600px]"
                style={{
                  fontSize: 'var(--fs-body)',
                  lineHeight: 1.7,
                }}
              >
                {descText}
              </p>

              {/* 5. Liste technique de 3 cartes */}
              <ul className="space-y-2 m-0 p-0 list-none">
                {listItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-[var(--gris-fond)] border border-[var(--gris-bordure)] rounded-[8px] p-[11px_14px] flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-3 transition-colors duration-250 hover:border-[var(--vert-accent)]/40 hover:bg-white"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: 'var(--vert-pale)' }}
                        aria-hidden="true"
                      >
                        <Check
                          size={14}
                          strokeWidth={2.5}
                          style={{ color: 'var(--vert-accent)' }}
                          aria-hidden="true"
                        />
                      </div>
                      <span
                        className="font-semibold text-[var(--texte-titre)]"
                        style={{ fontSize: 'var(--fs-small)' }}
                      >
                        {item.label}
                      </span>
                    </div>

                    <span
                      className="text-left sm:text-right font-medium uppercase tracking-wider pl-[34px] sm:pl-0 sm:shrink-0 text-[var(--fs-micro)]"
                      style={{
                        color: 'rgba(74, 85, 96, 0.70)',
                      }}
                    >
                      {item.mention}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
