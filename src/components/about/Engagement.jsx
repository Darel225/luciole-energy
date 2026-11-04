import { useRef } from 'react'
import { Zap } from 'lucide-react'
import { aboutData } from '../../data/about'
import { useReveal, useCardReveal } from '../../hooks/useReveal'
import { useParallax } from '../../hooks/useParallax'

function PillarItem({ pillar, index }) {
  const pillarRef = useRef(null)
  const delay = index * 160
  const { isVisible, isDone } = useCardReveal(pillarRef, delay)

  return (
    <li
      ref={pillarRef}
      style={{ '--delay': `${delay}ms` }}
      className={`relative card-reveal-wrap ${isVisible ? 'is-visible' : ''} ${isDone ? 'is-done' : ''}`}
    >
      {/* Petit nœud rond 8px qui s'agrandit de 0.4 -> 1 en 400ms */}
      <span
        className={`pillar-node-pop absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-white border-2 border-[var(--vert-accent)] ${isVisible ? 'is-visible' : ''}`}
        style={{ '--delay': `${delay}ms` }}
        aria-hidden="true"
      />

      {/* Contenu du pilier avec fade + translateY(14px) */}
      <div className="card-content-fade">
        <div className="mb-0.5">
          <span className="text-[var(--fs-micro)] font-semibold tracking-wider text-[var(--vert-accent)] uppercase tabular-nums">
            {pillar.tag}
          </span>
        </div>

        <h3 className="text-[var(--fs-h3)] font-semibold text-[var(--texte-titre)] leading-[1.3] mb-0.5">
          {pillar.title}
        </h3>

        <p className="text-[var(--fs-small)] leading-[1.6] text-[var(--gris-texte)]">
          {pillar.text}
        </p>
      </div>
    </li>
  )
}

export default function Engagement() {
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)
  const isSectionVisible = useReveal(sectionRef, { threshold: 0.15 })
  const isMediaVisible = useReveal(mediaRef, { threshold: 0.15 })
  const isVisible = isSectionVisible || isMediaVisible
  const parallaxOffset = useParallax(mediaRef, 14, isVisible)

  const { engagement } = aboutData

  return (
    <section
      id="notre-engagement"
      ref={sectionRef}
      aria-labelledby="engagement-title"
      className="bg-white overflow-x-clip"
      style={{
        paddingTop: 'var(--espace-section)',
        paddingBottom: 'var(--espace-section)',
      }}
    >
      <div className="container-custom">
        {/* Grille 2 colonnes : Image à GAUCHE, Texte à DROITE */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-center"
          style={{ columnGap: 'clamp(48px, 6vw, 88px)', rowGap: '48px' }}
        >
          {/* Colonne Image (Gauche sur desktop) : conteneur externe .media observé (NON CLIPPÉ) */}
          <div
            ref={mediaRef}
            className={`media order-2 lg:order-1 relative w-full max-w-[480px] lg:max-w-[520px] mx-auto lg:mr-auto ${isVisible ? 'is-visible' : ''}`}
          >
            {/* Grille de points décorative en haut à gauche */}
            <div
              className={`reveal--fade absolute -top-7 -left-7 w-24 h-[72px] z-0 hidden sm:block pointer-events-none ${isVisible ? 'is-visible' : ''}`}
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(31, 157, 92, 0.40) 1.6px, transparent 1.8px)',
                backgroundSize: '12px 12px',
                transition: 'opacity 600ms var(--ease-out) 300ms',
              }}
              aria-hidden="true"
            />

            {/* Enfant .media__clip : porte le clip-path de gauche à droite (1100ms) */}
            <div
              className="media__clip media__clip-left relative z-10 w-full overflow-hidden aspect-[4/5] lg:aspect-[3/4] bg-white border border-[var(--gris-bordure)] rounded-none shadow-sharp-image"
              style={{ borderRadius: '0px' }}
            >
              {/* Image interne avec parallaxe ±14px via variable CSS et hover scale(1.04) */}
              <div className="w-full h-full overflow-hidden">
                <img
                  src={engagement.image}
                  alt={engagement.imageAlt}
                  className="media-scale-img w-full h-[106%] object-cover rounded-none -mt-[3%]"
                  style={{
                    objectPosition: 'center 35%',
                    borderRadius: '0px',
                    imageRendering: 'auto',
                    '--parallax-y': `${parallaxOffset}px`,
                  }}
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="896"
                />
              </div>
            </div>

            {/* Badge flottant : SIBLING de .media__clip (RÈGLE A), jamais rogné par le clip-path */}
            <div
              className={`media__badge absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-[12px_14px] rounded-[8px] border border-white/60 shadow-lg flex items-center justify-between gap-3 z-20 ${isVisible ? 'is-visible' : ''}`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[6px] bg-[var(--vert-pale)] flex items-center justify-center shrink-0 border border-[var(--vert-accent)]/20 text-[var(--vert-principal)]">
                  <Zap size={16} aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span
                    className="uppercase font-semibold tracking-wider text-[0.625rem] leading-none mb-1"
                    style={{ color: '#4A5560' }}
                  >
                    Excellence Opérationnelle
                  </span>
                  <span
                    className="font-semibold text-[0.8125rem] leading-tight"
                    style={{ color: '#0E1A14' }}
                  >
                    Infrastructures Énergétiques Durables
                  </span>
                </div>
              </div>

              <span className="w-7 h-7 rounded-full bg-[var(--vert-principal)] text-white text-[0.6875rem] font-bold flex items-center justify-center shrink-0 ml-1">
                CI
              </span>
            </div>
          </div>

          {/* Colonne Texte (Droite sur desktop) */}
          <div className="order-1 lg:order-2 flex flex-col justify-center max-w-[600px]">
            {/* 1. Étiquette */}
            <p className={`reveal ${isVisible ? 'is-visible' : ''} text-[var(--fs-label)] uppercase font-semibold text-[var(--vert-accent)] tracking-[0.22em] mb-3`}>
              {engagement.badge}
            </p>

            {/* 2. Titre H2 unifié */}
            <h2
              id="engagement-title"
              className={`reveal stagger-1 ${isVisible ? 'is-visible' : ''} font-bold text-[var(--texte-titre)] leading-[1.18] tracking-[-0.015em] max-w-[26ch]`}
              style={{ fontSize: 'var(--fs-h2)' }}
            >
              {engagement.title}
            </h2>

            {/* 3. Trait d'accent signature (.reveal--line, 700ms) */}
            <div
              className={`reveal--line stagger-2 ${isVisible ? 'is-visible' : ''} w-[40px] h-[3px] bg-[var(--vert-accent)] rounded-[2px]`}
              style={{ margin: '16px 0 20px', transitionDuration: '700ms' }}
              aria-hidden="true"
            />

            {/* 4. Paragraphe d'introduction */}
            <p className={`reveal stagger-3 ${isVisible ? 'is-visible' : ''} text-[var(--fs-body)] leading-[1.7] text-[var(--gris-texte)] max-w-[600px] mb-4`}>
              {engagement.description}
            </p>

            {/* 5. Les 3 piliers avec ligne fine verticale dessinée de haut en bas (1000ms) */}
            <div className="relative ml-2.5 pl-5 mb-5">
              {/* Ligne verticale qui se dessine avec scaleY(0 -> 1) */}
              <div
                className={`pillar-line-y absolute left-0 top-1 bottom-1 w-[1px] bg-[var(--gris-bordure)] ${isVisible ? 'is-visible' : ''}`}
                aria-hidden="true"
              />

              <ol className="space-y-4 list-none m-0 p-0">
                {engagement.pillars.map((pillar, idx) => (
                  <PillarItem key={pillar.num} pillar={pillar} index={idx} />
                ))}
              </ol>
            </div>

            {/* 6. Rangée de 3 mentions en bas avec bordure supérieure qui se dessine en scaleX */}
            <div className="relative mt-2 pt-3.5">
              <div
                className={`reveal--line absolute top-0 left-0 right-0 h-[1px] bg-[var(--gris-bordure)] origin-left ${isVisible ? 'is-visible' : ''}`}
                style={{ transitionDuration: '700ms' }}
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-center gap-5 text-[var(--fs-small)] leading-[1.6] text-[var(--gris-texte)] font-medium">
                {engagement.highlights.map((item, idx) => {
                  const staggerClass = idx === 0 ? 'stagger-4' : idx === 1 ? 'stagger-5' : 'stagger-6'
                  return (
                    <div key={idx} className={`reveal ${staggerClass} ${isVisible ? 'is-visible' : ''} flex items-center gap-2`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--vert-accent)] shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
