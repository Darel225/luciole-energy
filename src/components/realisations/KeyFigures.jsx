import { useRef } from 'react'
import { useCountUp } from '../../hooks/useCountUp'
import { useReveal } from '../../hooks/useReveal'

export default function KeyFigures() {
  const containerRef = useRef(null)
  const isVisible = useReveal(containerRef, { threshold: 0.25 })

  const { count: count1 } = useCountUp(3, { duration: 1200, isTriggered: isVisible })
  const { count: count2, suffixVisible } = useCountUp(8, {
    duration: 1200,
    suffix: ' kWc',
    isTriggered: isVisible,
  })
  const { count: count3 } = useCountUp(7, { duration: 1200, isTriggered: isVisible })

  return (
    <div
      ref={containerRef}
      className={`key-figures-section relative my-8 sm:my-10 py-5 sm:py-6 ${
        isVisible ? 'is-visible' : ''
      }`}
      role="region"
      aria-label="Chiffres clés des réalisations"
    >
      {/* Bordure haute qui se dessine en scaleX (800ms) */}
      <div
        className={`key-figures-line-h absolute top-0 left-0 right-0 h-[1px] bg-[var(--gris-bordure)] origin-left ${
          isVisible ? 'is-visible' : ''
        }`}
        style={{ transitionDuration: '800ms' }}
        aria-hidden="true"
      />

      {/* Bordure basse qui se dessine en scaleX (800ms) */}
      <div
        className={`key-figures-line-h absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--gris-bordure)] origin-left ${
          isVisible ? 'is-visible' : ''
        }`}
        style={{ transitionDuration: '800ms', transitionDelay: '100ms' }}
        aria-hidden="true"
      />

      {/* Grille des 3 chiffres avec séparateurs verticaux */}
      <div className="grid grid-cols-1 sm:grid-cols-3 relative divide-y sm:divide-y-0 divide-[var(--gris-bordure)]">
        {/* Colonne 1 : 3 Projets */}
        <div
          className={`key-figures-col stagger-1 ${
            isVisible ? 'is-visible' : ''
          } py-3 sm:py-0 sm:pr-6 flex flex-col justify-center`}
        >
          <div className="font-bold text-[var(--texte-titre)] leading-none mb-1.5 tabular-nums text-[1.875rem] sm:text-[2.25rem]">
            <span>{count1}</span>
          </div>
          <span className="font-normal text-[var(--gris-texte)] leading-snug text-[var(--fs-small)]">
            Projets présentés
          </span>
        </div>

        {/* Séparateur vertical 1 : scaleY 0 -> 1 origine haut (700ms) */}
        <div
          className={`key-figures-sep-v hidden sm:block absolute left-1/3 top-1 bottom-1 w-[1px] bg-[var(--gris-bordure)] origin-top ${
            isVisible ? 'is-visible' : ''
          }`}
          style={{ transitionDuration: '700ms', transitionDelay: '180ms' }}
          aria-hidden="true"
        />

        {/* Colonne 2 : 8 kWc Centrale */}
        <div
          className={`key-figures-col stagger-2 ${
            isVisible ? 'is-visible' : ''
          } py-3 sm:py-0 sm:px-6 flex flex-col justify-center`}
        >
          <div className="font-bold text-[var(--texte-titre)] leading-none mb-1.5 tabular-nums text-[1.875rem] sm:text-[2.25rem] flex items-baseline">
            <span>{count2}</span>
            <span
              className={`text-[1.125rem] sm:text-[1.25rem] font-semibold text-[var(--vert-accent)] ml-1.5 transition-opacity duration-400 ${
                suffixVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              kWc
            </span>
          </div>
          <span className="font-normal text-[var(--gris-texte)] leading-snug text-[var(--fs-small)]">
            Centrale photovoltaïque livrée clés en main
          </span>
        </div>

        {/* Séparateur vertical 2 : scaleY 0 -> 1 origine haut (700ms, en cascade) */}
        <div
          className={`key-figures-sep-v hidden sm:block absolute left-2/3 top-1 bottom-1 w-[1px] bg-[var(--gris-bordure)] origin-top ${
            isVisible ? 'is-visible' : ''
          }`}
          style={{ transitionDuration: '700ms', transitionDelay: '280ms' }}
          aria-hidden="true"
        />

        {/* Colonne 3 : 7 Agences */}
        <div
          className={`key-figures-col stagger-3 ${
            isVisible ? 'is-visible' : ''
          } py-3 sm:py-0 sm:pl-6 flex flex-col justify-center`}
        >
          <div className="font-bold text-[var(--texte-titre)] leading-none mb-1.5 tabular-nums text-[1.875rem] sm:text-[2.25rem]">
            <span>{count3}</span>
          </div>
          <span className="font-normal text-[var(--gris-texte)] leading-snug text-[var(--fs-small)]">
            Agences en Côte d'Ivoire
          </span>
        </div>
      </div>
    </div>
  )
}
