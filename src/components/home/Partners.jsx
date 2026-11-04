import { useRef } from 'react'
import {
  Zap,
  ShieldCheck,
  Factory,
  Cpu,
  Network
} from 'lucide-react'
import { partnersData } from '../../data/homeData'
import { useReveal } from '../../hooks/useReveal'

export default function Partners() {
  const sectionRef = useRef(null)
  useReveal(sectionRef, { threshold: 0.15 })

  // Association d'icônes vectorielles aux références
  const getIcon = (id) => {
    switch (id) {
      case 'schneider':
        return <Zap size={18} className="text-[var(--vert-principal)]" />
      case 'cie':
        return <Network size={18} className="text-[var(--vert-principal)]" />
      case 'saph':
        return <Factory size={18} className="text-[var(--vert-principal)]" />
      case 'siemens':
        return <Cpu size={18} className="text-[var(--vert-principal)]" />
      case 'iso':
        return <ShieldCheck size={18} className="text-[var(--vert-principal)]" />
      default:
        return <Zap size={18} className="text-[var(--vert-principal)]" />
    }
  }

  // Rendu unitaire d'une carte de marque / référence compacte
  const renderCard = (item, keySuffix = '', isAriaHidden = false) => (
    <div
      key={`${item.id}-${keySuffix}`}
      aria-hidden={isAriaHidden}
      className="marquee-card flex items-center gap-3.5 p-[12px_16px] bg-white rounded-[12px] border border-[var(--gris-bordure)] shadow-[0_1px_3px_rgba(0,0,0,0.03)] min-w-[240px] flex-shrink-0 select-none group"
    >
      <div className="w-9 h-9 rounded-[8px] bg-[#EAF7EE] flex items-center justify-center shrink-0 border border-[var(--vert-accent)]/15 group-hover:scale-105 transition-transform duration-300">
        {getIcon(item.id)}
      </div>
      <div className="flex flex-col text-left overflow-hidden">
        <span className="text-[0.875rem] font-semibold text-[var(--texte-titre)] leading-snug truncate">
          {item.name}
        </span>
        <span className="text-[0.75rem] text-[var(--gris-texte)] leading-tight truncate">
          {item.role}
        </span>
      </div>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--gris-fond)] border-b border-[var(--gris-bordure)] overflow-hidden"
      style={{
        paddingTop: 'calc(0.6 * var(--espace-section))',
        paddingBottom: 'calc(0.6 * var(--espace-section))',
      }}
    >
      <div className="container-custom mb-5">
        {/* Entrée étiquette : fade + translateY(12px) */}
        <p className="reveal text-center text-[var(--fs-label)] uppercase tracking-[0.22em] font-semibold text-[var(--gris-texte)]">
          Quelques marques, références et agréments
        </p>
      </div>

      {/* Piste du marquee : fade en 800ms, vitesse constante, pause au survol */}
      <div className="reveal--fade stagger-2 relative w-full marquee-mask marquee-scroll-container overflow-hidden">
        <div className="animate-marquee-track flex gap-5 sm:gap-6 py-2">
          {/* Jeu 1 (Primaire - accessible) */}
          <div className="flex gap-5 sm:gap-6 flex-shrink-0">
            {partnersData.map((item) => renderCard(item, 'primary', false))}
          </div>

          {/* Jeu 2 (Duplicata 1 - invisible lecteur d'écran pour boucle infinie parfaite) */}
          <div className="flex gap-5 sm:gap-6 flex-shrink-0" aria-hidden="true">
            {partnersData.map((item) => renderCard(item, 'dup-1', true))}
          </div>

          {/* Jeu 3 (Duplicata 2 - assure une couverture totale sans coupure sur très grands écrans) */}
          <div className="flex gap-5 sm:gap-6 flex-shrink-0" aria-hidden="true">
            {partnersData.map((item) => renderCard(item, 'dup-2', true))}
          </div>

          {/* Jeu 4 (Duplicata 3 - boucle symétrique à 50% de décalage) */}
          <div className="flex gap-5 sm:gap-6 flex-shrink-0" aria-hidden="true">
            {partnersData.map((item) => renderCard(item, 'dup-3', true))}
          </div>
        </div>
      </div>
    </section>
  )
}
