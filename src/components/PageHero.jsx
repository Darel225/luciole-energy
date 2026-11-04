import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

/**
 * Formate le titre pour insérer un saut de ligne propre sur desktop
 * après les phrases clés identifiées dans la charte, tout en restant masqué sur mobile.
 */
function formatHeroTitle(rawTitle, isAnimated = false) {
  if (!rawTitle) return null

  // Si c'est déjà un élément JSX (ex: fragment avec <br />), on le retourne directement
  if (typeof rawTitle !== 'string') {
    return rawTitle
  }

  // Normalisation préalable des sauts de ligne
  const text = rawTitle.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim()

  // Titre d'expertises : deux lignes avec points vert clair animés en fondu (+600ms)
  if (text.includes("L'énergie maîtrisée.") && text.includes("La performance garantie.")) {
    return (
      <>
        <span className="block">
          L'énergie maîtrisée
          <span className={isAnimated ? 'page-hero-dot' : ''} style={{ color: '#3DDC84' }}>.</span>
        </span>
        <span className="block mt-1 sm:mt-0">
          La performance garantie
          <span className={isAnimated ? 'page-hero-dot' : ''} style={{ color: '#3DDC84' }}>.</span>
        </span>
      </>
    )
  }

  // Titre de réalisations : deux lignes avec point vert clair en fondu à la fin (+600ms)
  if (text.includes("L'impact en action.") && text.includes("Des infrastructures qui durent.")) {
    return (
      <>
        <span className="block">
          L'impact en action.
        </span>
        <span className="block mt-1 sm:mt-0">
          Des infrastructures qui durent
          <span className={isAnimated ? 'page-hero-dot' : ''} style={{ color: '#3DDC84' }}>.</span>
        </span>
      </>
    )
  }

  const breakPhrases = [
    "L'énergie maîtrisée.",
    "L'impact en action.",
    "L'ingénierie ivoirienne de pointe,",
  ]

  for (const phrase of breakPhrases) {
    if (text.includes(phrase)) {
      const parts = text.split(phrase)
      const after = parts.slice(1).join(phrase).trim()
      return (
        <>
          <span className="block">{parts[0]}{phrase}</span>
          {after ? <span className="block mt-1 sm:mt-0">{after}</span> : null}
        </>
      )
    }
  }

  return rawTitle
}

export default function PageHero({
  badge,
  title,
  titleDot = '.',
  description,
  breadcrumbs = [],
  image,
  imageAlt = "Image d'en-tête Luciole Energy",
  imagePosition = 'center 35%',
  animate = true,
}) {
  const location = useLocation()
  // L'animation est activable par prop et ciblée sur /a-propos, /expertises, /realisations et /contact
  const isTargetPage =
    location.pathname === '/a-propos' ||
    location.pathname === '/a-propos/' ||
    location.pathname === '/expertises' ||
    location.pathname === '/expertises/' ||
    location.pathname === '/realisations' ||
    location.pathname === '/realisations/' ||
    location.pathname === '/contact' ||
    location.pathname === '/contact/'
  const isAnimated = animate && isTargetPage
  const [isReady, setIsReady] = useState(!isAnimated)
  const [parallaxY, setParallaxY] = useState(0)
  const sectionRef = useRef(null)

  // 1. Déclenchement de la chorégraphie d'intro après chargement/décodage de l'image
  useEffect(() => {
    if (!isAnimated) return

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsReady(true)
      document.documentElement.classList.add('page-hero-ready')
      return
    }

    const img = new Image()
    img.src = image

    const triggerIntro = () => {
      requestAnimationFrame(() => {
        setIsReady(true)
        document.documentElement.classList.add('page-hero-ready')
      })
    }

    if (img.complete) {
      triggerIntro()
    } else {
      img.onload = triggerIntro
      setTimeout(triggerIntro, 400)
    }

    return () => {
      document.documentElement.classList.remove('page-hero-ready')
    }
  }, [isAnimated, image])

  // 2. Parallaxe douce de l'image au scroll (translateY max 40px vers le bas, desktop >= 1024px)
  useEffect(() => {
    if (!isAnimated || typeof window === 'undefined') return

    const isDesktop = window.innerWidth >= 1024
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isDesktop || prefersReducedMotion) return

    let rafId = null

    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        if (scrollY <= 700) {
          const offset = Math.min(40, Math.round(scrollY * 0.12))
          setParallaxY(offset)
        }
        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isAnimated])

  return (
    <section ref={sectionRef} className="page-hero-section">
      {/* Image de fond pleine largeur avec cadrage adapté et parallaxe douce */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            transform: isAnimated && parallaxY ? `translate3d(0, ${parallaxY}px, 0)` : 'none',
            willChange: isAnimated && parallaxY ? 'transform' : 'auto',
          }}
        >
          <img
            src={image}
            alt={imageAlt}
            className={`w-full ${
              isAnimated ? 'page-hero-bg-img h-[108%] -mt-[4%]' : 'h-full'
            } object-cover`}
            style={{ objectPosition: imagePosition }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="1376"
            height="768"
          />
        </div>
        {/* Overlay vert très sombre de rgba(6,24,16,.85) à rgba(6,24,16,.65) visible dès t=0 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(6, 24, 16, 0.85) 0%, rgba(6, 24, 16, 0.65) 100%)',
          }}
        />
      </div>

      {/* Contenu centré verticalement et horizontalement au-dessus du fil d'Ariane */}
      <div className="container-custom relative z-10 w-full flex flex-col items-center justify-center text-center">
        {/* 1. Étiquette (badge) : t=250ms */}
        {badge && (
          <div
            className={`section-badge-dark ${isAnimated ? 'page-hero-badge' : ''}`}
            style={{ marginBottom: '24px' }}
          >
            <span
              className="w-2 h-2 rounded-full bg-[var(--vert-accent-light)] animate-pulse"
              aria-hidden="true"
            />
            <span>{badge}</span>
          </div>
        )}

        {/* 2. Titre Principal H1 en un seul bloc : t=380ms avec point final vert en fondu à +600ms */}
        <h1 className={`page-hero-title-white ${isAnimated ? 'page-hero-h1' : ''}`}>
          {formatHeroTitle(title, isAnimated)}
          {titleDot && (
            <span
              style={{ color: '#3DDC84' }}
              className={isAnimated ? 'page-hero-dot' : ''}
            >
              {titleDot}
            </span>
          )}
        </h1>

        {/* 3. Paragraphe descriptif : t=650ms */}
        {description && (
          <p
            className={`text-[1rem] leading-[1.65] font-normal ${isAnimated ? 'page-hero-p' : ''}`}
            style={{
              color: 'rgba(255, 255, 255, 0.88)',
              maxWidth: '56ch',
              textWrap: 'balance',
              margin: 0,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* 4. Fil d'Ariane ancré en bas : t=850ms (trait scaleX 0->1 puis nav fade 500ms) */}
      {breadcrumbs.length > 0 && (
        <div className="page-hero-breadcrumb-container">
          {/* Fin trait translucide : width 200px, 1px */}
          <div
            className={isAnimated ? 'page-hero-breadcrumb-line' : ''}
            style={{
              width: '200px',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
              marginBottom: '14px',
            }}
            aria-hidden="true"
          />
          <nav
            aria-label="Fil d'Ariane"
            className={isAnimated ? 'page-hero-breadcrumb-nav' : ''}
          >
            <ol className="flex items-center justify-center gap-2 text-[0.8125rem] font-medium">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1
                return (
                  <li key={idx} className="flex items-center gap-2">
                    {isLast ? (
                      <span style={{ color: '#3DDC84' }} aria-current="page">
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <Link
                          to={crumb.path}
                          className="text-white/70 hover:text-white transition-colors duration-250 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--vert-accent)] rounded"
                        >
                          {crumb.label}
                        </Link>
                        <span className="text-white/40" aria-hidden="true">
                          ›
                        </span>
                      </>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        </div>
      )}
    </section>
  )
}
