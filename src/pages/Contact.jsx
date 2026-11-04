import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import ContactInfo from '../components/contact/ContactInfo'
import ContactForm from '../components/contact/ContactForm'
import { contactPageData } from '../data/contact'

export default function Contact() {
  useEffect(() => {
    // Scroll en haut dès l'arrivée sur la page
    window.scrollTo(0, 0)

    // SEO : Titre & Meta description
    document.title = 'Contact | Luciole Energy'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Contactez Luciole Energy à Abidjan pour une étude ou un devis : électricité HT/BT, énergies renouvelables, climatisation, groupes électrogènes, éclairage public.'
      )
    }
  }, [])

  const { hero } = contactPageData

  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero interne harmonisé avec les autres pages */}
      <PageHero
        badge={hero.badge}
        title={hero.title}
        titleDot={hero.titleDot}
        description={hero.description}
        breadcrumbs={hero.breadcrumbs}
        image={hero.image}
        imageAlt={hero.imageAlt}
        animate={true}
      />

      {/* 2. Section principale 2 colonnes dans conteneur 1200px */}
      <section
        id="section-contact"
        aria-labelledby="contact-info-title"
        className="bg-white"
        style={{
          paddingTop: 'var(--espace-section)',
          paddingBottom: 'var(--espace-section)',
        }}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
            {/* Colonne Gauche : Coordonnées, Horaires & Urgences (sticky sur desktop) */}
            <div className="w-full lg:col-span-5">
              <ContactInfo />
            </div>

            {/* Colonne Droite : Formulaire complet */}
            <div className="w-full lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
