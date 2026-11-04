import { useRef } from 'react'
import { Check } from 'lucide-react'
import { aboutData } from '../../data/about'
import techElectriqueImg from '../../assets/images/Techniciens-en-intervention-électrique.webp'
import { useReveal } from '../../hooks/useReveal'
import { useParallax } from '../../hooks/useParallax'

export default function WhoWeAre() {
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)
  const isSectionVisible = useReveal(sectionRef, { threshold: 0.15 })
  const isMediaVisible = useReveal(mediaRef, { threshold: 0.15 })
  const isVisible = isSectionVisible || isMediaVisible
  const parallaxOffset = useParallax(mediaRef, 14, isVisible)

  const { whoWeAre } = aboutData

  return (
    <section
      id="qui-sommes-nous"
      ref={sectionRef}
      aria-labelledby="qui-sommes-nous-title"
      className="bg-[var(--gris-fond)] overflow-x-clip border-b border-[var(--gris-bordure)]"
      style={{
        paddingTop: 'var(--espace-section)',
        paddingBottom: 'var(--espace-section)',
      }}
    >
      <div className="container-custom">
        {/* Grille 2 colonnes : texte minmax(0, 1.5fr) / image minmax(0, 1fr) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center"
          style={{ columnGap: 'clamp(48px, 6vw, 88px)', rowGap: '48px' }}
        >
          {/* Colonne Gauche : Bloc texte centré verticalement et compact (stagger 90ms) */}
          <div className="flex flex-col justify-center max-w-[600px]">
            {/* 1. Étiquette */}
            <p className={`reveal ${isVisible ? 'is-visible' : ''} text-[0.75rem] uppercase font-semibold text-[var(--vert-accent)] tracking-[0.22em] mb-3`}>
              {whoWeAre.label}
            </p>

            {/* 2. Titre H2 compact en un seul bloc */}
            <h2
              id="qui-sommes-nous-title"
              className={`reveal stagger-1 ${isVisible ? 'is-visible' : ''} font-bold text-[var(--texte-titre)] leading-[1.18] tracking-[-0.015em] max-w-[26ch]`}
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)' }}
            >
              {whoWeAre.title}
            </h2>

            {/* 3. Trait d'accent signature (.reveal--line, 700ms) */}
            <div
              className={`reveal--line stagger-2 ${isVisible ? 'is-visible' : ''} w-[40px] h-[3px] bg-[var(--vert-accent)] rounded-[2px]`}
              style={{ margin: '18px 0 22px', transitionDuration: '700ms' }}
              aria-hidden="true"
            />

            {/* 4. Deux paragraphes compacts */}
            <div className="flex flex-col gap-3.5 text-[0.9375rem] leading-[1.7] text-[var(--gris-texte)]">
              {whoWeAre.paragraphs.map((p, pIdx) => (
                <p key={p.id} className={`reveal ${pIdx === 0 ? 'stagger-3' : 'stagger-4'} ${isVisible ? 'is-visible' : ''}`}>
                  {p.segments.map((seg, sIdx) =>
                    seg.accent ? (
                      <strong key={sIdx} className="font-semibold text-[var(--texte-titre)]">
                        {seg.text}
                      </strong>
                    ) : (
                      <span key={sIdx}>{seg.text}</span>
                    )
                  )}
                </p>
              ))}
            </div>

            {/* 5. Liste de 3 points avec carrés d'icône compacts (scale 0.6 -> 1 en 400ms) */}
            <ul className="flex flex-col gap-2.5 mt-6 list-none p-0 m-0" aria-label="Engagements techniques">
              {whoWeAre.checklist.map((item, idx) => {
                const staggerClass = idx === 0 ? 'stagger-4' : idx === 1 ? 'stagger-5' : 'stagger-6'
                return (
                  <li key={item} className={`reveal ${staggerClass} ${isVisible ? 'is-visible' : ''} flex items-center gap-3`}>
                    <div className={`check-pop ${staggerClass} ${isVisible ? 'is-visible' : ''} w-7 h-7 rounded-[6px] bg-[var(--vert-pale)] border border-[var(--vert-accent)]/20 flex items-center justify-center shrink-0`}>
                      <Check size={14} strokeWidth={2.25} className="text-[var(--vert-accent)]" aria-hidden="true" />
                    </div>
                    <span className="text-[0.875rem] font-semibold text-[var(--texte-titre)] leading-snug">
                      {item}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Colonne Droite : Image portrait avec conteneur externe .media observé (NON CLIPPÉ) */}
          <div
            ref={mediaRef}
            className={`media relative w-full max-w-[480px] lg:max-w-[520px] mx-auto lg:ml-auto ${isVisible ? 'is-visible' : ''}`}
          >
            {/* Grille de points décorative : fade 600ms, délai 300ms */}
            <div
              className={`reveal--fade absolute -top-7 -right-7 w-24 h-[72px] z-0 hidden sm:block pointer-events-none ${isVisible ? 'is-visible' : ''}`}
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(31, 157, 92, 0.40) 1.6px, transparent 1.8px)',
                backgroundSize: '12px 12px',
                transition: 'opacity 600ms var(--ease-out) 300ms',
              }}
              aria-hidden="true"
            />

            {/* Enfant .media__clip-up : porte le clip-path (bas en haut 1100ms) */}
            <div
              className="media__clip media__clip-up relative z-10 w-full overflow-hidden aspect-[3/4] bg-white border border-[var(--gris-bordure)] rounded-none shadow-sharp-image"
              style={{ borderRadius: '0px' }}
            >
              {/* Image interne : parallaxe douce ±14px via CSS variable, scale(1.12) -> 1 en 1400ms */}
              <div className="w-full h-full overflow-hidden">
                <img
                  src={techElectriqueImg}
                  alt="Deux techniciens Luciole Energy intervenant sur une armoire électrique"
                  className="media-scale-img w-full h-[106%] object-cover rounded-none -mt-[3%]"
                  style={{
                    objectPosition: 'center 40%',
                    borderRadius: '0px',
                    imageRendering: 'auto',
                    '--parallax-y': `${parallaxOffset}px`,
                  }}
                  loading="eager"
                  decoding="async"
                  width="590"
                  height="792"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
