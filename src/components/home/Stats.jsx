import { useRef } from 'react'
import { statsData } from '../../data/homeData'
import { useReveal } from '../../hooks/useReveal'
import { useCountUp } from '../../hooks/useCountUp'

function StatItem({ stat, index, isVisible, isLast }) {
  const { count, suffixVisible } = useCountUp(stat.numericTarget, {
    duration: 1400,
    suffix: stat.suffix,
    isTriggered: isVisible,
  })

  // Largeurs minimales réservées pour éviter tout saut de mise en page (CLS = 0)
  const minWidthMap = {
    'stat-1': '2.2ch',
    'stat-2': '3.2ch',
    'stat-3': '1.3ch',
    'stat-4': '2.2ch',
  }

  return (
    <div
      style={{
        '--delay': `${(index + 1) * 100}ms`,
      }}
      className={`reveal relative flex flex-col items-center text-center px-4 sm:px-6 ${isVisible ? 'is-visible' : ''}`}
    >
      {/* Séparateur vertical : scaleY 0 -> 1, origine haut, 700ms, en cascade */}
      {!isLast && (
        <div
          className={`reveal--line-y hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/20 origin-top pointer-events-none ${isVisible ? 'is-visible' : ''}`}
          style={{
            '--delay': `${(index + 1) * 120}ms`,
            transitionDuration: '700ms',
          }}
          aria-hidden="true"
        />
      )}

      {/* Chiffre clé compacté avec tabular-nums */}
      <div
        className="font-bold text-white tracking-tight leading-none mb-1.5 tabular-nums flex items-baseline justify-center"
        style={{
          fontSize: 'clamp(1.75rem, 2.6vw, 2.25rem)',
        }}
      >
        <span
          className="inline-block text-right"
          style={{ minWidth: minWidthMap[stat.id] || '2ch' }}
        >
          {count}
        </span>
        <span
          style={{ color: '#34D399' }}
          className={`transition-opacity duration-300 ${suffixVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Libellé de la statistique */}
      <p className="text-[0.8125rem] text-emerald-100/90 font-medium max-w-[210px] leading-snug">
        {stat.label}
      </p>
    </div>
  )
}

export default function Stats() {
  const sectionRef = useRef(null)
  // Observer placé sur le conteneur externe NON CLIPPÉ avec seuil accessible (0.15)
  const isVisible = useReveal(sectionRef, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

  return (
    <section
      ref={sectionRef}
      className="relative text-white overflow-hidden bg-[var(--vert-principal)]"
      style={{
        paddingTop: 'clamp(2rem, 3.5vw, 2.75rem)',
        paddingBottom: 'clamp(2rem, 3.5vw, 2.75rem)',
      }}
    >
      {/* Fond vert avec révélation clip-path du bas vers le haut (sur un enfant interne pour ne jamais clipper la section observée) */}
      <div
        className={`reveal--clip-up absolute inset-0 bg-[var(--vert-principal)] pointer-events-none z-0 ${isVisible ? 'is-visible' : ''}`}
        style={{
          transitionDuration: '900ms',
          transitionTimingFunction: 'var(--ease-in-out)',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        
        {/* Étiquette : fade + translateY(14px) */}
        <div className="flex justify-center mb-5">
          <p
            className={`reveal text-[var(--fs-label)] uppercase font-semibold tracking-[0.22em] text-center ${isVisible ? 'is-visible' : ''}`}
            style={{
              '--delay': '0ms',
              color: 'rgba(255, 255, 255, 0.85)',
            }}
          >
            Indicateurs d'excellence & disponibilité
          </p>
        </div>

        {/* Grille des 4 statistiques en stagger 100ms */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 lg:gap-x-0 items-center">
          {statsData.map((stat, index) => (
            <StatItem
              key={stat.id}
              stat={stat}
              index={index}
              isVisible={isVisible}
              isLast={index === statsData.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
