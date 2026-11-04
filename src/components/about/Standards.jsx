import { useRef } from 'react'
import { Award, ShieldCheck, Leaf } from 'lucide-react'
import { aboutData } from '../../data/about'
import { useReveal, useCardReveal } from '../../hooks/useReveal'
import { useCountUp } from '../../hooks/useCountUp'

function StandardsRowItem({ item, index, getIcon }) {
  const rowRef = useRef(null)
  const delay = index * 160
  const { isVisible, isDone } = useCardReveal(rowRef, delay)

  return (
    <div
      ref={rowRef}
      style={{ '--delay': `${delay}ms` }}
      className={`standards-row-wrap ${isVisible ? 'is-visible' : ''} ${isDone ? 'is-done' : ''} relative py-5 first:pt-0 last:pb-0`}
    >
      {/* Ligne séparatrice fine qui se dessine avec scaleX (700ms, origin left) */}
      {index > 0 && (
        <div
          className={`reveal--line absolute top-0 left-0 right-0 h-[1px] bg-[var(--gris-bordure)] origin-left ${isVisible ? 'is-visible' : ''}`}
          style={{ transitionDuration: '700ms', '--delay': `${delay}ms` }}
          aria-hidden="true"
        />
      )}

      <div className="standards-row-inner flex items-start gap-4 sm:gap-5">
        {/* Numéro vert --fs-micro */}
        <span
          className={`reveal--fade text-[var(--fs-micro)] font-semibold text-[var(--vert-accent)] tracking-wider uppercase tabular-nums shrink-0 mt-2 sm:mt-2.5 ${isVisible ? 'is-visible' : ''}`}
          style={{ '--delay': `${delay + 100}ms` }}
        >
          {item.num}
        </span>

        {/* Carré blanc icône 40x40px avec scale 0.7 -> 1 (400ms) et hover lift 2px */}
        <div
          className={`standards-icon-box standards-icon-pop w-10 h-10 rounded-[8px] bg-white border border-[var(--gris-bordure)] shadow-xs flex items-center justify-center shrink-0 mt-0.5 sm:mt-1 ${isVisible ? 'is-visible' : ''}`}
          style={{ '--delay': `${delay + 150}ms` }}
        >
          {getIcon(item.icon)}
        </div>

        {/* Bloc texte avec fade-in 500ms différé de 200ms */}
        <div className="standards-content-fade flex flex-col flex-grow">
          <h3 className="standards-row-title text-[var(--fs-h3)] font-semibold text-[var(--texte-titre)] leading-[1.3] mb-1">
            {item.title}
          </h3>
          <p className="text-[var(--fs-small)] leading-[1.6] text-[var(--gris-texte)] max-w-[540px]">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Standards() {
  const sectionRef = useRef(null)
  const isVisible = useReveal(sectionRef, { threshold: 0.15 })

  // Compteur 100% de conformité opérationnelle validée
  const { count: countIso } = useCountUp(100, {
    duration: 1200,
    isTriggered: isVisible,
  })

  const { standards } = aboutData

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Award':
        return <Award size={18} className="text-[var(--vert-principal)]" aria-hidden="true" />
      case 'ShieldCheck':
        return <ShieldCheck size={18} className="text-[var(--vert-principal)]" aria-hidden="true" />
      case 'Leaf':
        return <Leaf size={18} className="text-[var(--vert-principal)]" aria-hidden="true" />
      default:
        return <Award size={18} className="text-[var(--vert-principal)]" aria-hidden="true" />
    }
  }

  return (
    <section
      id="standards-certifications"
      ref={sectionRef}
      aria-labelledby="standards-title"
      className="bg-[var(--gris-fond)] border-y border-[var(--gris-bordure)] relative"
      style={{
        paddingTop: 'var(--espace-section)',
        paddingBottom: 'var(--espace-section)',
      }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Colonne gauche (5 colonnes) */}
          <div className="lg:col-span-5 flex flex-col justify-center max-w-[600px]">
            {/* Étiquette */}
            <p className="reveal text-[var(--fs-label)] uppercase font-semibold text-[var(--vert-accent)] tracking-[0.22em] mb-3">
              {standards.badge}
            </p>

            {/* H2 unifié */}
            <h2
              id="standards-title"
              className="reveal stagger-1 font-bold text-[var(--texte-titre)] leading-[1.18] tracking-[-0.015em] max-w-[26ch]"
              style={{ fontSize: 'var(--fs-h2)' }}
            >
              {standards.title}
            </h2>

            {/* Trait d'accent signature (.reveal--line, 700ms) */}
            <div
              className="reveal--line stagger-2 w-[40px] h-[3px] bg-[var(--vert-accent)] rounded-[2px]"
              style={{ margin: '18px 0 22px', transitionDuration: '700ms' }}
              aria-hidden="true"
            />

            {/* Paragraphe d'introduction */}
            <p className="reveal stagger-3 text-[var(--fs-body)] leading-[1.7] text-[var(--gris-texte)] max-w-[600px] mb-6">
              {standards.description}
            </p>

            {/* Carte sombre ISO compactée avec fade + translateY(20px) + scale 0.98 -> 1 */}
            <div
              className={`iso-card-wrap rounded-[12px] bg-[var(--bleu-nuit)] p-[16px_18px] border border-white/10 shadow-soft max-w-[460px] ${isVisible ? 'is-visible' : ''}`}
              style={{ '--delay': '300ms' }}
            >
              <div className="flex items-center gap-3.5">
                {/* Pictogramme 56px avec scale 0.85 -> 1 en 500ms (délai 300ms) */}
                <div className="iso-picto-pop w-14 h-14 rounded-[8px] bg-[#07382B] border border-[var(--vert-accent)]/40 flex flex-col items-center justify-center shrink-0 p-1 text-center">
                  <span className="text-[0.625rem] font-bold text-white tracking-wider leading-none">
                    ISO
                  </span>
                  <span className="text-[0.875rem] font-extrabold text-[#34D399] leading-tight">
                    9001
                  </span>
                  <span className="text-[0.5625rem] text-white/70 tracking-tight leading-none">
                    2015
                  </span>
                </div>

                {/* Détails accréditation avec fade-in 500ms différé de 250ms */}
                <div className="iso-text-fade flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[var(--fs-micro)] font-semibold uppercase tracking-wider text-[#34D399]">
                      {standards.isoCard.badge}
                    </span>
                    <span className="text-white/40 text-[var(--fs-micro)]">•</span>
                    <span className="text-[var(--fs-micro)] text-white/70">
                      {standards.isoCard.subBadge}
                    </span>
                  </div>

                  <h3 className="card-title-white text-[0.9375rem] font-semibold mb-0.5" style={{ color: '#FFFFFF' }}>
                    {standards.isoCard.title}
                  </h3>

                  <p className="text-[0.8125rem] text-white/70 leading-snug">
                    <span
                      style={{ color: '#34D399', minWidth: '3.2ch' }}
                      className="font-bold tabular-nums inline-block"
                    >
                      {countIso}%
                    </span>{' '}
                    de conformité opérationnelle validée
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite (7 colonnes) : 3 lignes empilées avec cascade et observation individuelle */}
          <div className="lg:col-span-7">
            {standards.items.map((item, idx) => (
              <StandardsRowItem
                key={item.num}
                item={item}
                index={idx}
                getIcon={getIcon}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
