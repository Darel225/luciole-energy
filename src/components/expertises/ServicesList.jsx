import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDevisModal } from '../../context/DevisModalContext'
import { Check } from 'lucide-react'

// ---------------------------------------------------------------------------
// IMAGES DES SERVICES
// ---------------------------------------------------------------------------
import pole1Image from '../../assets/images/expertise1.png'
import pole2Image from '../../assets/images/engagemant-photo.png'
import pole3Image from '../../assets/images/expertise3.png'
import pole4Image from '../../assets/images/expertise4.png'
import pole5Image from '../../assets/images/expertise5.png'

const SERVICES_IMAGES = {
  pole1: pole1Image,
  pole2: pole2Image,
  pole3: pole3Image,
  pole4: pole4Image,
  pole5: pole5Image,
}

const SERVICES_DATA = [
  {
    num: '01',
    label: "PÔLE D'EXPERTISE 01",
    title: 'Ingénierie Électrique HT/BT',
    paragraph:
      'Conception, dimensionnement, installation et déploiement de réseaux électriques haute et basse tension, adaptés aux exigences des infrastructures industrielles, minières et tertiaires. Nous assurons des solutions fiables et performantes, intégrant les équipements de distribution, les postes de transformation et les systèmes de protection pour garantir une alimentation électrique continue et sécurisée.',
    points: [
      { label: 'Postes de transformation', mention: 'HTA / BT' },
      { label: 'Tableaux généraux (TGBT)', mention: 'Norme IEC 61439' },
      { label: 'Réseaux de distribution', mention: 'Continu & sécurisé' },
    ],
    image: SERVICES_IMAGES.pole1,
    alt: 'Techniciens Luciole Energy devant un poste de transformation haute tension',
    legend: 'Infrastructure HT/BT · Sécurité opérationnelle',
    bgLight: false, // Fond blanc
  },
  {
    num: '02',
    label: "PÔLE D'EXPERTISE 02",
    title: 'Énergies Renouvelables & Solaire',
    paragraph:
      'Accompagnement dans votre transition énergétique à travers la conception, l\'installation et l\'intégration de centrales solaires photovoltaïques et de systèmes de stockage adaptés à vos besoins. Nous développons des solutions énergétiques performantes, combinant production solaire, stockage et gestion intelligente de l\'énergie afin de réduire vos coûts, optimiser votre consommation et renforcer votre autonomie énergétique.',
    points: [
      { label: 'Centrales solaires B2B', mention: 'Sol / Toiture' },
      { label: 'Stockage d\'énergie', mention: 'BESS hybride' },
      { label: 'Audit d\'efficacité énergétique', mention: 'ISO 50001' },
    ],
    image: SERVICES_IMAGES.pole2,
    alt: 'Centrale solaire photovoltaïque au coucher du soleil',
    legend: 'Transition énergétique · Autonomie industrielle',
    bgLight: true, // Fond #F6F8F7
  },
  {
    num: '03',
    label: "PÔLE D'EXPERTISE 03",
    title: 'Climatisation & Froid Industriel',
    paragraph:
      'Conception, installation et maintenance de systèmes de climatisation centralisée et de froid industriel adaptés aux exigences des environnements tertiaires et industriels. Nous proposons des solutions performantes intégrant la régulation thermique, le contrôle de l\'humidité et la gestion des températures afin de garantir le confort des espaces, la conservation des produits et la continuité de vos processus industriels.',
    points: [
      { label: 'Systèmes HVAC & VRV', mention: 'Tertiaire & industrie' },
      { label: 'Chambres froides', mention: 'Positives & négatives' },
      { label: 'Contrôle hygrométrique', mention: 'Process précision' },
    ],
    image: SERVICES_IMAGES.pole3,
    alt: 'Installation de froid industriel et de climatisation sur un site industriel',
    legend: 'Génie climatique · Froid de process',
    bgLight: false, // Fond blanc
  },
  {
    num: '04',
    label: "PÔLE D'EXPERTISE 04",
    title: 'Énergie de Secours & Groupes Électrogènes',
    paragraph:
      'Déploiement et installation de solutions d\'alimentation électrique de secours à travers des groupes électrogènes de différentes puissances, adaptés aux exigences de vos infrastructures. Nos équipements garantissent une alimentation fiable et continue, tout en limitant les interruptions et en assurant la disponibilité permanente de vos installations.',
    points: [
      { label: 'Dimensionnement & Installation', mention: 'Toutes puissances' },
      { label: 'Inverseurs de source', mention: 'Commutation auto' },
      { label: 'Maintenance préventive', mention: 'Contrats 24/7 B2B' },
    ],
    image: SERVICES_IMAGES.pole4,
    alt: 'Équipements de secours électrique et groupes électrogènes sur site',
    legend: 'Continuité critique · Data centers & usines',
    bgLight: true, // Fond #F6F8F7
  },
  {
    num: '05',
    label: "PÔLE D'EXPERTISE 05",
    title: 'Éclairage Public & Infrastructures',
    paragraph:
      'Conception, installation et déploiement de solutions d\'éclairage performantes et durables pour les espaces publics, les voiries et les sites industriels. Nous intégrons des technologies LED, des systèmes d\'éclairage solaire autonome et des dispositifs intelligents de gestion afin d\'améliorer la visibilité, renforcer la sécurité des infrastructures et optimiser la consommation énergétique.',
    points: [
      { label: 'Réseaux d\'éclairage LED', mention: 'Haute efficacité' },
      { label: 'Infrastructures souterraines', mention: 'Voiries & sites' },
      { label: 'Éclairage solaire autonome', mention: 'Hybride · Smart sensors' },
    ],
    image: SERVICES_IMAGES.pole5,
    alt: 'Éclairage public solaire le long d\'une avenue à Abidjan',
    legend: 'Éclairage intelligent · Infrastructures',
    bgLight: false, // Fond blanc
    hasCTA: true,
    ctaText: 'DEMANDER UNE ÉTUDE PERSONNALISÉE',
    ctaLink: '/contact',
  },
]

function ServiceBlock({ service, index, prefersReduced }) {
  const { openDevisModal } = useDevisModal()
  const rowRef = useRef(null)
  const [isRevealed, setIsRevealed] = useState(prefersReduced)

  useEffect(() => {
    if (prefersReduced) {
      return
    }

    const node = rowRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [prefersReduced])

  const isEven = index % 2 === 1 // Blocs pairs (02, 04)
  const easeCurve = 'cubic-bezier(0.22, 1, 0.36, 1)'

  const photoRevealStyle = prefersReduced
    ? {}
    : {
        clipPath: isRevealed
          ? 'inset(0% 0% 0% 0% round 1.5rem)'
          : isEven
            ? 'inset(0% 0% 0% 100% round 1.5rem)'
            : 'inset(0% 100% 0% 0% round 1.5rem)',
        transition: `clip-path 1.05s ${easeCurve}`,
      }

  const imageScaleStyle = prefersReduced
    ? {}
    : {
        transform: isRevealed ? 'scale(1)' : 'scale(1.08)',
        transition: `transform 1.2s ${easeCurve}`,
      }

  const textFadeClass = (delayClass) =>
    prefersReduced
      ? 'opacity-100 translate-y-0'
      : `transition-all duration-700 ${easeCurve} ${delayClass} ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`

  return (
    <section
      id={`service-${service.num}`}
      ref={rowRef}
      className={`w-full py-10 md:py-14 lg:py-16 border-b border-gray-100 scroll-mt-24 md:scroll-mt-28 ${
        service.bgLight ? 'bg-[var(--gris-fond)]' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center">
          {/* Colonne Image (~58% desktop, lg:col-span-7) */}
          <div
            className={`w-full lg:col-span-7 order-1 ${
              isEven ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <div
              style={photoRevealStyle}
              className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-xl aspect-[4/3] group cursor-pointer"
            >
              <div
                style={imageScaleStyle}
                className="w-full h-full overflow-hidden"
              >
                <img
                  src={service.image}
                  alt={service.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover select-none transition-transform duration-1000 ease-out will-change-transform motion-safe:group-hover:scale-[1.035]"
                />
              </div>

              {/* Pastille de légende discrète en bas de l'image */}
              {service.legend && (
                <div className="absolute bottom-4 left-4 z-10 max-w-[calc(100%-32px)] pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-md bg-white/95 border border-white/40">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[var(--vert-accent)] shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-[0.625rem] sm:text-[0.6875rem] font-semibold uppercase tracking-wider text-[var(--texte-titre)] leading-tight">
                      {service.legend}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Colonne Texte (~42% desktop, lg:col-span-5) */}
          <div
            className={`w-full lg:col-span-5 flex flex-col justify-center order-2 ${
              isEven ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            {/* Entête de service : Étiquette verte + Grand numéro élégant */}
            <div
              className={`flex items-baseline justify-between gap-4 mb-2 ${textFadeClass(
                'delay-100'
              )}`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[var(--vert-accent)] shrink-0"
                  aria-hidden="true"
                />
                <span className="text-[0.6rem] font-heading font-bold uppercase tracking-[0.18em] text-[var(--vert-accent)]">
                  {service.label}
                </span>
              </div>

              <span
                className="font-heading font-black text-3xl sm:text-4xl text-gray-200/90 select-none tracking-tight leading-none"
                aria-hidden="true"
              >
                {service.num}
              </span>
            </div>

            {/* Titre fort du service */}
            <h2
              className={`font-heading font-bold text-[1.125rem] sm:text-[1.25rem] text-[var(--texte-titre)] leading-snug ${textFadeClass(
                'delay-200'
              )}`}
            >
              {service.title}
            </h2>

            {/* Filet vert animé qui se trace sous le titre */}
            <div
              className="h-0.5 bg-[var(--vert-accent)] mt-2 origin-left"
              style={{
                width: '32px',
                transform:
                  isRevealed || prefersReduced ? 'scaleX(1)' : 'scaleX(0)',
                transition: prefersReduced
                  ? 'none'
                  : `transform 0.8s ${easeCurve} 300ms`,
              }}
              aria-hidden="true"
            />

            {/* Paragraphe descriptif : typographie rigoureusement identique */}
            <p
              className={`text-[0.8125rem] sm:text-[0.84375rem] text-gray-600 leading-[1.65] mt-3.5 mb-5 font-normal ${textFadeClass(
                'delay-350'
              )}`}
            >
              {service.paragraph}
            </p>

            {/* Points clés séparés par de fins filets gris */}
            <div
              className={`border-y border-gray-200/70 divide-y divide-gray-200/70 mb-6 ${textFadeClass(
                'delay-500'
              )}`}
            >
              {service.points.map((point, pIdx) => {
                const label = typeof point === 'object' ? point.label : point
                const mention = typeof point === 'object' ? point.mention : null
                return (
                  <div key={pIdx} className="py-2.5 flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="h-4 w-4 rounded-full border border-[var(--vert-accent)]/30 bg-[var(--vert-accent)]/10 flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <Check
                          size={10}
                          strokeWidth={2.8}
                          className="text-[var(--vert-accent)]"
                        />
                      </div>
                      <span className="font-heading font-semibold text-[0.8125rem] sm:text-[0.84375rem] text-gray-700 tracking-wide truncate sm:whitespace-normal">
                        {label}
                      </span>
                    </div>
                    {mention && (
                      <span className="text-[0.6875rem] font-medium uppercase tracking-wider text-gray-400 shrink-0 text-right pl-2">
                        {mention}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Bouton du service 05 */}
            {service.hasCTA && (
              <div className={`mt-6 pt-1 ${textFadeClass('delay-650')}`}>
                <button
                  type="button"
                  onClick={() => openDevisModal({ service: service.title })}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--vert-principal)] hover:bg-[#0B472C] text-white text-[0.8125rem] font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vert-accent)] cursor-pointer"
                >
                  {service.ctaText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ServicesList() {
  const [prefersReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  return (
    <div className="flex flex-col w-full">
      {/* Rendu des 5 blocs de services en zig-zag */}
      {SERVICES_DATA.map((service, index) => (
        <ServiceBlock
          key={service.num}
          service={service}
          index={index}
          prefersReduced={prefersReduced}
        />
      ))}
    </div>
  )
}
