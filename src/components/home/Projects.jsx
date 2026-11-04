import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'
import { projectsData } from '../../data/homeData'
import { useReveal, useCardReveal } from '../../hooks/useReveal'

function ProjectCardItem({ project, index }) {
  const cardRef = useRef(null)
  // Cascade nette avec stagger 180ms : 0, 180, 360 ms
  const delay = index * 180
  const { isVisible, isDone } = useCardReveal(cardRef, delay)

  return (
    <div
      ref={cardRef}
      style={{
        '--delay': `${delay}ms`,
      }}
      className={`card-reveal-wrap ${isVisible ? 'is-visible' : ''} ${isDone ? 'is-done' : ''} h-full`}
    >
      <Link
        to="/realisations"
        className="project-card-inner group bg-white rounded-[12px] overflow-hidden border border-[var(--gris-bordure)] shadow-soft flex flex-col h-full block focus:outline-none"
      >
        {/* Image en haut ratio 4/3 avec scale 1.1 -> 1 (1300ms) puis zoom hover 1.04 (800ms) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--gris-fond)] shrink-0">
          <img
            src={project.image}
            alt={`Réalisation Luciole Energy : ${project.titre}`}
            className="card-scale-img-entry project-img w-full h-full object-cover"
            style={{
              objectPosition: project.objectPosition,
              imageRendering: 'auto',
            }}
            loading="lazy"
            width="480"
            height="360"
          />

          {/* Pastille blanche translucide : apparition 400ms après la carte */}
          <div
            className="absolute bottom-3 left-3 bg-white/92 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/60 shadow-sm flex items-center gap-1.5 text-[0.6875rem] font-semibold text-[var(--texte-titre)] transition-all duration-500 ease-[var(--ease-out)]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
              transitionDelay: `${delay + 400}ms`,
            }}
          >
            <MapPin size={12} className="text-[var(--vert-principal)] shrink-0" aria-hidden="true" />
            <span>{project.locationLabel}</span>
          </div>
        </div>

        {/* Contenu en bas : fade-in 500ms avec 250ms de retard */}
        <div className="card-content-fade p-5 sm:p-6 flex flex-col flex-grow justify-between">
          <div>
            {/* Catégorie */}
            <span className="block text-[var(--fs-micro)] uppercase font-semibold tracking-wider text-[var(--vert-principal)] mb-1.5">
              {project.categorie}
            </span>

            {/* Titre H3 avec hauteur minimale réservée */}
            <h3 className="project-card-title text-[var(--fs-h3)] font-semibold text-[var(--texte-titre)] leading-[1.3] line-clamp-2 min-h-[2.75rem] flex items-start mb-2">
              {project.titre}
            </h3>

            {/* Description courte (3 lignes max) */}
            <p className="text-[var(--fs-small)] text-[var(--gris-texte)] leading-[1.6] line-clamp-3 mb-5">
              {project.descriptionCourte}
            </p>
          </div>

          {/* Lien Voir le projet poussé en bas avec flèche +3px au hover */}
          <div className="pt-3.5 border-t border-[var(--gris-bordure)] mt-auto flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-[0.875rem] font-semibold text-[var(--vert-principal)] group-hover:text-[var(--vert-accent)] transition-colors duration-250">
              <span>Voir le projet</span>
              <ArrowRight size={15} className="project-arrow-icon" aria-hidden="true" />
            </span>
          </div>
        </div>

      </Link>
    </div>
  )
}

export default function Projects() {
  const headerRef = useRef(null)
  useReveal(headerRef, { threshold: 0.15 })

  return (
    <section
      id="projets"
      className="bg-white"
      style={{
        paddingTop: 'var(--espace-section)',
        paddingBottom: 'var(--espace-section)',
      }}
    >
      <div className="container-custom">
        
        {/* En-tête de section centré (stagger 90ms) */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center">
          <p className="reveal text-[var(--fs-label)] uppercase font-semibold text-[var(--vert-accent)] tracking-[0.22em] mb-3">
            Portfolio & Expérience terrain
          </p>
          
          <h2
            className="reveal stagger-1 font-bold text-[var(--texte-titre)] leading-[1.18] tracking-[-0.015em]"
            style={{ fontSize: 'var(--fs-h2)' }}
          >
            Projets Phares
          </h2>
          
          {/* Trait d'accent signature centré : scaleX depuis le centre (40px x 3px) */}
          <div
            className="reveal--line-center stagger-2 w-[40px] h-[3px] bg-[var(--vert-accent)] rounded-[2px]"
            style={{ margin: '18px auto 22px' }}
            aria-hidden="true"
          />

          <p className="reveal stagger-3 text-[var(--fs-body)] leading-[1.7] text-[var(--gris-texte)] max-w-[600px] mx-auto text-center">
            Découvrez une sélection de nos interventions majeures dans l'industrie, le tertiaire et les infrastructures stratégiques en Côte d'Ivoire.
          </p>
        </div>

        {/* Grille de 3 projets équilibrés : chaque carte observée individuellement (0, 180, 360 ms) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projectsData.map((project, index) => (
            <ProjectCardItem
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
