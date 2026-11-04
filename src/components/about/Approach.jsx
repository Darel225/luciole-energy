import { useEffect, useRef, useState } from 'react'
import { aboutData } from '../../data/about'
import { useReveal } from '../../hooks/useReveal'

function TimelineStepItem({ step, isMasterVisible, isDone, setCircleRef }) {
  const stepRef = useRef(null)
  const isMobileVisible = useReveal(stepRef, { threshold: 0.2 })
  const isItemVisible = isMasterVisible || isMobileVisible

  return (
    <div
      ref={stepRef}
      className={`timeline-step-wrap ${isItemVisible ? 'is-visible is-mobile-visible' : ''} ${isDone ? 'is-done' : ''} flex flex-col h-full`}
    >
      <div className="timeline-step-inner flex flex-col bg-white lg:bg-transparent rounded-[12px] p-5 lg:p-0 border border-[var(--gris-bordure)] lg:border-none shadow-sm lg:shadow-none h-full transition-transform duration-300">
        
        {/* Cercle numéroté 32px posé sur la ligne avec transition fond vert + chiffre blanc */}
        <div className="relative w-8 h-8 mb-4 shrink-0">
          <div
            ref={setCircleRef}
            className={`timeline-circle w-8 h-8 rounded-full font-bold text-[0.75rem] flex items-center justify-center shrink-0 shadow-sm tabular-nums ${isItemVisible ? 'is-visible' : ''}`}
          >
            {step.num}
          </div>

          {/* Anneau d'onde (scale 1 -> 1.9, opacity .45 -> 0, UNE SEULE FOIS) */}
          <span className="timeline-ring" aria-hidden="true" />
        </div>

        {/* Contenu textuel avec fade + translateY(16px) différé de 150ms + stagger 90ms */}
        <div className="timeline-step-content flex flex-col flex-grow">
          {/* Étiquette de phase */}
          <span className="timeline-step-phase text-[var(--fs-micro)] font-semibold uppercase tracking-wider text-[var(--vert-accent)] mb-1.5">
            {step.phase}
          </span>

          {/* Titre H3 de l'étape */}
          <h3 className="timeline-step-title text-[var(--fs-h3)] font-semibold text-[var(--texte-titre)] mb-1.5 leading-[1.3]">
            {step.title}
          </h3>

          {/* Description */}
          <p className="timeline-step-desc text-[var(--fs-small)] leading-[1.6] text-[var(--gris-texte)]">
            {step.description}
          </p>
        </div>

      </div>
    </div>
  )
}

export default function Approach() {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const circleRefs = useRef([])
  const [track, setTrack] = useState({ startX: 16, trackWidth: 800 })
  const isSectionVisible = useReveal(sectionRef, { threshold: 0.15 })
  const isTimelineVisible = useReveal(timelineRef, { threshold: 0.35 })
  const isMasterVisible = isSectionVisible || isTimelineVisible
  const [isDone, setIsDone] = useState(false)

  // Mesure ResizeObserver pour synchroniser pixel-perfect la ligne et le point voyageur
  useEffect(() => {
    const updateTrack = () => {
      const container = timelineRef.current
      const c0 = circleRefs.current[0]
      const c3 = circleRefs.current[3]
      if (container && c0 && c3) {
        const containerRect = container.getBoundingClientRect()
        const c0Rect = c0.getBoundingClientRect()
        const c3Rect = c3.getBoundingClientRect()
        const startX = Math.round(c0Rect.left - containerRect.left + c0Rect.width / 2)
        const endX = Math.round(c3Rect.left - containerRect.left + c3Rect.width / 2)
        const trackWidth = Math.max(0, endX - startX)
        setTrack({ startX, trackWidth })
      }
    }

    updateTrack()
    const ro = new ResizeObserver(updateTrack)
    if (timelineRef.current) ro.observe(timelineRef.current)
    window.addEventListener('resize', updateTrack)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', updateTrack)
    }
  }, [])

  // Timer de fin de chorégraphie pour passer en .is-done (retrait will-change et activation hover)
  useEffect(() => {
    if (isMasterVisible && !isDone) {
      const timer = setTimeout(() => {
        setIsDone(true)
      }, 2800)
      return () => clearTimeout(timer)
    }
  }, [isMasterVisible, isDone])

  const { approach } = aboutData

  return (
    <section
      id="approche-operationnelle"
      ref={sectionRef}
      aria-labelledby="approach-title"
      className="bg-[var(--vert-pale)] border-b border-[var(--gris-bordure)]"
      style={{
        paddingTop: 'var(--espace-section)',
        paddingBottom: 'var(--espace-section)',
      }}
    >
      <div className="container-custom">
        {/* En-tête aligné à gauche (stagger 90ms) */}
        <div className="max-w-[600px] mb-10 sm:mb-12">
          {/* Étiquette */}
          <p className={`reveal ${isMasterVisible ? 'is-visible' : ''} text-[var(--fs-label)] uppercase font-semibold text-[var(--vert-accent)] tracking-[0.22em] mb-3`}>
            {approach.badge}
          </p>

          {/* Titre H2 unifié */}
          <h2
            id="approach-title"
            className={`reveal stagger-1 ${isMasterVisible ? 'is-visible' : ''} font-bold text-[var(--texte-titre)] leading-[1.18] tracking-[-0.015em] max-w-[26ch]`}
            style={{ fontSize: 'var(--fs-h2)' }}
          >
            {approach.title} {approach.titleHighlight}
          </h2>

          {/* Trait d'accent signature (.reveal--line, 700ms) */}
          <div
            className={`reveal--line stagger-2 ${isMasterVisible ? 'is-visible' : ''} w-[40px] h-[3px] bg-[var(--vert-accent)] rounded-[2px]`}
            style={{ margin: '18px 0 22px', transitionDuration: '700ms' }}
            aria-hidden="true"
          />

          {/* Paragraphe d'introduction */}
          <p className={`reveal stagger-3 ${isMasterVisible ? 'is-visible' : ''} text-[var(--fs-body)] leading-[1.7] text-[var(--gris-texte)] max-w-[600px]`}>
            {approach.description}
          </p>
        </div>

        {/* Timeline des 4 étapes */}
        <div
          ref={timelineRef}
          className={`timeline-container relative ${isMasterVisible ? 'timeline--active is-visible' : ''} ${isDone ? 'timeline--is-done is-done' : ''}`}
          style={{
            '--track-start': `${track.startX}px`,
            '--track-width': `${track.trackWidth}px`,
          }}
        >
          {/* Ligne pointillée horizontale desktop (>= 1024px) qui se dessine de gauche à droite (2400ms) */}
          <div
            className={`timeline__line timeline-dashed-line hidden lg:block absolute top-4 h-[2px] border-t-2 border-dashed border-[var(--vert-accent)]/30 z-0 ${isMasterVisible ? 'is-visible' : ''}`}
            style={{
              left: `${track.startX}px`,
              width: `${track.trackWidth}px`,
            }}
            aria-hidden="true"
          />

          {/* Point voyageur 10px avec traîne 28px dégradée (>= 1024px uniquement) */}
          <div
            className={`timeline__traveler hidden lg:block absolute z-20 pointer-events-none ${isMasterVisible ? 'is-visible' : ''}`}
            style={{
              left: `${track.startX}px`,
              top: '16px',
            }}
            aria-hidden="true"
          >
            <div className="timeline__traveler-dot" />
          </div>

          {/* Ligne verticale mobile (< 1024px) qui se dessine de haut en bas (1400ms) */}
          <div
            className={`timeline__line-vertical timeline-vertical-line lg:hidden absolute top-4 bottom-4 left-9 w-[2px] border-l-2 border-dashed border-[var(--vert-accent)]/30 z-0 ${isMasterVisible ? 'is-visible' : ''}`}
            aria-hidden="true"
          />

          {/* Grille des étapes */}
          <div className="timeline-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-6 relative z-10 items-stretch">
            {approach.steps.map((step, idx) => (
              <TimelineStepItem
                key={step.num}
                step={step}
                index={idx}
                isMasterVisible={isMasterVisible}
                isDone={isDone}
                setCircleRef={(el) => {
                  circleRefs.current[idx] = el
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
