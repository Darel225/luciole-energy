import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Zap,
  Server,
  Snowflake,
  Sun,
  Lightbulb,
  ArrowUpRight
} from 'lucide-react'
import { expertisesData } from '../../data/homeData'
import { useReveal, useCardReveal } from '../../hooks/useReveal'

// Attribution d'icônes adaptées
const getExpertiseIcon = (id) => {
  switch (id) {
    case '01':
      return <Zap size={20} className="text-[var(--vert-accent-light)]" />
    case '02':
      return <Server size={20} className="text-[var(--vert-accent-light)]" />
    case '03':
      return <Snowflake size={20} className="text-[var(--vert-accent-light)]" />
    case '04':
      return <Sun size={20} className="text-[var(--vert-accent-light)]" />
    case '05':
      return <Lightbulb size={20} className="text-[var(--vert-accent-light)]" />
    default:
      return <Zap size={20} className="text-[var(--vert-accent-light)]" />
  }
}

// Composant unitaire pour chaque carte : Observer individuel (cascade nette) + Hover 60fps séparé du reveal
function ExpertiseCardItem({ card, heightClasses, globalIndex }) {
  const cardRef = useRef(null)
  // Cascade nette avec stagger 160ms : 0, 160, 320, 480, 640 ms
  const delay = globalIndex * 160
  const { isVisible, isDone } = useCardReveal(cardRef, delay)

  return (
    <div
      ref={cardRef}
      style={{
        '--delay': `${delay}ms`,
      }}
      className={`card-reveal-wrap ${isVisible ? 'is-visible' : ''} ${isDone ? 'is-done' : ''} w-full ${heightClasses}`}
    >
      <Link
        to="/expertises"
        className="expertise-card-inner group relative overflow-hidden rounded-[12px] flex flex-col justify-between border border-white/10 shadow-soft w-full h-full block focus:outline-none"
      >
        {/* Image d'arrière-plan avec zoom d'entrée 1.1 -> 1 (1300ms) puis zoom hover 1.05 (800ms) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[12px]">
          <img
            src={card.image}
            alt={card.title}
            className="card-scale-img-entry expertise-img absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            width="600"
            height="400"
          />
        </div>

        {/* Overlay sombre avec opacité fluide au survol (350ms) */}
        <div
          className="expertise-overlay absolute inset-0 z-0 opacity-85"
          style={{
            background:
              'linear-gradient(180deg, rgba(11, 22, 32, 0.40) 0%, rgba(11, 22, 32, 0.70) 50%, rgba(7, 35, 24, 0.96) 100%)',
          }}
        />

        {/* Contenu superpose : fade-in 500ms avec 250ms de retard */}
        <div className="card-content-fade relative z-10 w-full h-full p-5 sm:px-4.5 lg:px-5 sm:py-6 flex flex-col justify-between">
          {/* Ligne du haut : icone & numero/categorie */}
          <div className="flex items-center justify-between gap-2.5 sm:gap-3">
            <div className="w-9 h-9 shrink-0 rounded-[8px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              {getExpertiseIcon(card.id)}
            </div>
            <span className="text-[0.66rem] lg:text-[0.6875rem] whitespace-nowrap uppercase tracking-wide font-semibold text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 shrink-0">
              {card.category}
            </span>
          </div>

          {/* Ligne du bas : Titres, tags & bouton flèche */}
          <div className="pt-3">
            {/* Titre forcé en blanc pur */}
            <h3
              className={`card-title-white font-semibold mb-1 ${
                card.isLarge ? 'text-[1.125rem]' : 'text-[1rem]'
              }`}
              style={{ color: '#FFFFFF' }}
            >
              {card.title}
            </h3>

            {card.subtitle && (
              <p
                className="text-[var(--fs-micro)] font-semibold uppercase tracking-wide mb-1.5"
                style={{ color: '#4ADE80' }}
              >
                {card.subtitle}
              </p>
            )}

            {/* Description en blanc à 85% d'opacité */}
            <p
              className={`leading-relaxed line-clamp-3 mb-3 font-normal ${
                card.isLarge ? 'text-[var(--fs-small)]' : 'text-[0.8125rem]'
              }`}
              style={{ color: 'rgba(255, 255, 255, 0.85)' }}
            >
              {card.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-white/15">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pr-2">
                {card.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block text-[0.6875rem] font-medium text-white/90 bg-white/10 px-2 py-0.5 rounded-full border border-white/15 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bouton rond avec flèche */}
              <span
                className="expertise-arrow-btn w-8 h-8 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white shrink-0"
                aria-hidden="true"
              >
                <ArrowUpRight size={16} className="expertise-arrow-icon" />
              </span>
            </div>

          </div>

        </div>
      </Link>
    </div>
  )
}

export default function Expertise() {
  const headerRef = useRef(null)
  useReveal(headerRef, { threshold: 0.15 })

  const topCards = expertisesData.slice(0, 2)
  const bottomCards = expertisesData.slice(2, 5)

  return (
    <section
      id="expertises"
      className="bg-[var(--gris-fond)] border-y border-[var(--gris-bordure)]"
      style={{
        paddingTop: 'var(--espace-section)',
        paddingBottom: 'var(--espace-section)',
      }}
    >
      <div className="container-custom">
        
        {/* En-tête de section centré (stagger 90ms) */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center">
          <p className="reveal text-[var(--fs-label)] uppercase font-semibold text-[var(--vert-accent)] tracking-[0.22em] mb-3">
            Ingénierie & Solutions Énergétiques de Haute Précision
          </p>
          
          <h2
            className="reveal stagger-1 font-bold text-[var(--texte-titre)] leading-[1.18] tracking-[-0.015em]"
            style={{ fontSize: 'var(--fs-h2)' }}
          >
            Nos Domaines d'Expertise
          </h2>
          
          {/* Trait d'accent signature centré : scaleX depuis le centre (40px x 3px) */}
          <div
            className="reveal--line-center stagger-2 w-[40px] h-[3px] bg-[var(--vert-accent)] rounded-[2px]"
            style={{ margin: '18px auto 22px' }}
            aria-hidden="true"
          />

          <p className="reveal stagger-3 text-[var(--fs-body)] leading-[1.7] text-[var(--gris-texte)] max-w-[60ch] mx-auto text-center">
            Des infrastructures haute tension aux énergies de demain, Luciole Energy déploie l'excellence technique au service des sites industriels et des grands ouvrages.
          </p>
        </div>

        {/* Grille Asymétrique : 2 grandes cartes en haut (0, 1), 3 cartes en bas (2, 3, 4) */}
        <div className="space-y-5">
          {/* Ligne 1 : 2 grandes cartes (0ms, 160ms) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {topCards.map((card, idx) => (
              <ExpertiseCardItem
                key={card.id}
                card={card}
                heightClasses="min-h-[320px] md:h-[340px]"
                globalIndex={idx}
              />
            ))}
          </div>

          {/* Ligne 2 : 3 cartes (320ms, 480ms, 640ms) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {bottomCards.map((card, idx) => (
              <ExpertiseCardItem
                key={card.id}
                card={card}
                heightClasses="min-h-[280px] md:h-[290px]"
                globalIndex={idx + 2}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
