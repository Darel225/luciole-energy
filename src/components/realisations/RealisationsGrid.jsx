import { useRef, useEffect, useState } from 'react'
import { useDevisModal } from '../../context/DevisModalContext'
import { MapPin, ArrowRight } from 'lucide-react'
import { useReveal } from '../../hooks/useReveal'
import real1Img from '../../assets/images/realisation1.webp'
import real2Img from '../../assets/images/realisation2.webp'
import real3Img from '../../assets/images/realisation3.webp'

function BentoCardItem({
  id,
  image,
  alt,
  badges,
  title,
  location,
  description,
  buttonText = 'Étudier un projet similaire',
  delay = 0,
  minHeightClass = 'min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]',
  imagePosition = 'center 40%',
  onButtonClick,
}) {
  const cardRef = useRef(null)
  const isCardVisible = useReveal(cardRef, {
    threshold: 0.2,
    rootMargin: '0px 0px -8% 0px',
  })
  const [isDone, setIsDone] = useState(false)

  // Révélation immédiate si l'utilisateur arrive directement par cette ancre URL
  const isHashTarget = typeof window !== 'undefined' && window.location.hash === `#${id}`
  const isVisible = isHashTarget || isCardVisible

  useEffect(() => {
    if (isVisible && !isDone) {
      const timer = setTimeout(() => {
        setIsDone(true)
      }, 1400 + delay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, isDone, delay])

  return (
    <article
      id={id}
      ref={cardRef}
      style={{ '--delay': `${delay}ms` }}
      className={`bento-card-wrap scroll-mt-28 relative rounded-[16px] overflow-hidden group shadow-soft hover:shadow-card-hover ${minHeightClass} flex flex-col justify-end ${
        isVisible ? 'is-visible' : ''
      } ${isDone ? 'is-done' : ''}`}
    >
      {/* Image de fond avec clip et scale */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={image}
          alt={alt}
          loading="lazy" decoding="async" className="bento-card-img w-full h-full object-cover select-none will-change-transform"
          style={{ objectPosition: imagePosition }}
          loading={delay === 0 ? 'eager' : 'lazy'}
          decoding="async"
          width="1376"
          height="768"
        />
        {/* Overlay sombre dégradé d'origine garantissant une lisibilité parfaite */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(6, 21, 15, 0.10) 0%, rgba(6, 21, 15, 0.55) 40%, rgba(6, 21, 15, 0.94) 100%)',
          }}
        />
        {/* Couche de hover dédiée : opacité 0 -> 1, liseré vert inset, assombrissement subtil */}
        <div className="bento-card-hover-layer" aria-hidden="true" />
      </div>

      {/* Badges en haut à gauche */}
      <div className="bento-card-content absolute top-5 left-5 sm:top-6 sm:left-6 z-20 flex flex-wrap items-center gap-2.5">
        {badges}
      </div>

      {/* Contenu textuel sur le bas de l'image (fade-in 500ms différé de 250ms) */}
      <div className="bento-card-content relative z-10 p-6 sm:p-8 lg:p-10 text-white flex flex-col items-start">
        <h3
          className="text-xl sm:text-2xl lg:text-[1.875rem] font-bold mb-2 leading-snug tracking-tight"
          style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          {title}
        </h3>
        <div className="flex items-center gap-2 text-[#3DDC84] text-[0.8125rem] sm:text-[0.875rem] font-semibold mb-3">
          <MapPin size={15} className="shrink-0" aria-hidden="true" />
          <span>{location}</span>
        </div>
        <p className="text-white/85 text-[0.84375rem] sm:text-[0.9375rem] max-w-3xl leading-relaxed mb-4">
          {description}
        </p>
        <button
          type="button"
          onClick={onButtonClick}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-[var(--vert-principal)] border border-white/25 hover:border-transparent text-white text-[0.8125rem] font-semibold backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5 group w-fit cursor-pointer"
        >
          <span>{buttonText}</span>
          <ArrowRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-1 text-[#3DDC84] group-hover:text-white"
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  )
}

export default function RealisationsGrid() {
  const { openDevisModal } = useDevisModal()
  const headerRef = useRef(null)
  const isHeaderVisible = useReveal(headerRef, { threshold: 0.25 })

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container-custom">
        {/* En-tête de section avec cascade stagger 90ms */}
        <div ref={headerRef} className="mb-10 text-left">
          {/* Badge avec point vert */}
          <div
            className={`real-header-badge reveal ${
              isHeaderVisible ? 'is-visible' : ''
            } inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7EE] text-[var(--vert-accent)] text-[0.75rem] font-bold uppercase tracking-wider mb-3 border border-[var(--vert-accent)]/20`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--vert-accent)]" aria-hidden="true" />
            <span>PROJETS EMBLÉMATIQUES / CÔTE D'IVOIRE</span>
          </div>

          {/* Titre H2 fort */}
          <h2
            className={`real-header-h2 reveal stagger-1 ${
              isHeaderVisible ? 'is-visible' : ''
            } text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-[var(--texte-titre)] leading-tight mb-3`}
          >
            L'Excellence Technique sur le Terrain
          </h2>

          {/* Trait d'accent vert signature */}
          <div
            className={`reveal--line stagger-2 ${
              isHeaderVisible ? 'is-visible' : ''
            } h-[3px] rounded-[2px] bg-[var(--vert-accent)]`}
            style={{
              width: '40px',
              margin: '14px 0 18px 0',
              transitionDuration: '700ms',
            }}
            aria-hidden="true"
          />

          {/* Description */}
          <p
            className={`reveal stagger-3 ${
              isHeaderVisible ? 'is-visible' : ''
            } text-[var(--gris-texte)] text-[0.9375rem] sm:text-[1rem] max-w-2xl leading-relaxed mb-0`}
          >
            Découvrez nos déploiements industriels d'envergure livrés clés en main à travers les grands pôles économiques ivoiriens.
          </p>
        </div>

        {/* Grille Bento des réalisations */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* CARTE 1 : Pleine largeur (Système Solaire Photovoltaïque 8 kWc) */}
          <BentoCardItem
            id="solaire-photovoltaique-sassandra"
            image={real1Img}
            alt="Installation solaire photovoltaïque à Sassandra"
            delay={0}
            minHeightClass="min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]"
            imagePosition="center 40%"
            title="Système Solaire Photovoltaïque (8 kWc)"
            location="SAPH, Sassandra • Agro-Industrie SIFCA"
            description="Fourniture et installation d'une centrale solaire photovoltaïque de 8 kWc complète conçue pour garantir l'autonomie énergétique et une alimentation continue d'un site industriel en Côte d'Ivoire."
            buttonText="Étudier un projet similaire"
            onButtonClick={() => openDevisModal()}
            badges={
              <>
                <span className="px-3.5 py-1.5 rounded-full bg-[#082B1B]/85 backdrop-blur-md text-[#3DDC84] border border-[#3DDC84]/30 text-[0.6875rem] font-bold uppercase tracking-wider shadow-sm">
                  Énergie Renouvelable
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#2EE07B] text-[#062414] text-[0.6875rem] font-black uppercase tracking-wider shadow-md">
                  Livré Clés en Main
                </span>
              </>
            }
          />

          {/* RANGÉE DU BAS : 2 colonnes égales (Cartes 2 et 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* CARTE 2 : Réseau de Lampadaires Solaires (Maferé) */}
            <BentoCardItem
              id="lampadaires-solaires-mafere"
              image={real2Img}
              alt="Réseau de lampadaires solaires à Maferé"
              delay={180}
              minHeightClass="min-h-[340px] sm:min-h-[380px] lg:min-h-[400px]"
              imagePosition="center 35%"
              title="Réseau de Lampadaires Solaires"
              location="SAPH, Maferé"
              description="Déploiement d'un réseau autonome de lampadaires solaires haute performance assurant un éclairage sécurisé et durable pour un centre de collecte."
              buttonText="Étudier un projet similaire"
              onButtonClick={() => openDevisModal()}
              badges={
                <span className="px-3.5 py-1.5 rounded-full bg-[#082B1B]/85 backdrop-blur-md text-[#3DDC84] border border-[#3DDC84]/30 text-[0.6875rem] font-bold uppercase tracking-wider shadow-sm">
                  Éclairage Public
                </span>
              }
            />

            {/* CARTE 3 : Maintenance & Mise aux Normes TGBT (OLAM) */}
            <BentoCardItem
              id="maintenance-tgbt-olam"
              image={real3Img}
              alt="Maintenance et mise aux normes TGBT pour OLAM"
              delay={360}
              minHeightClass="min-h-[340px] sm:min-h-[380px] lg:min-h-[400px]"
              imagePosition="center 20%"
              title="Maintenance & Mise aux Normes TGBT"
              location="OLAM, Côte d'Ivoire"
              description="Intervention technique sur les cellules et le TGBT incluant le contrôle, la vérification et la remise en état pour un fonctionnement performant et sans coupure."
              buttonText="Étudier un projet similaire"
              onButtonClick={() => openDevisModal()}
              badges={
                <span className="px-3.5 py-1.5 rounded-full bg-[#082B1B]/85 backdrop-blur-md text-[#3DDC84] border border-[#3DDC84]/30 text-[0.6875rem] font-bold uppercase tracking-wider shadow-sm">
                  Ingénierie Électrique
                </span>
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}
