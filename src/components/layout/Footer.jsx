import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDevisModal } from '../../context/DevisModalContext'
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react'
import logoLuciole from '../../assets/images/logo-luciole.jpg'
import { useReveal } from '../../hooks/useReveal'

export default function Footer() {
  const { openDevisModal } = useDevisModal()
  const currentYear = new Date().getFullYear()
  const footerRef = useRef(null)
  useReveal(footerRef, { threshold: 0.1 })

  return (
    <footer ref={footerRef} className="relative bg-[var(--bleu-nuit)] text-gray-300 pt-16 pb-10">
      {/* Bordure supérieure qui se dessine avec scaleX(0 -> 1) */}
      <div
        className="reveal--line absolute top-0 left-0 right-0 h-[1px] bg-white/10 origin-left"
        style={{ transitionDuration: '900ms' }}
        aria-hidden="true"
      />

      <div className="container-custom">
        
        {/* 4 Colonnes Principales en cascade 100ms */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
          
          {/* Colonne 1 : Marque & Présentation (4 colonnes lg) */}
          <div
            style={{ '--delay': '0ms' }}
            className="reveal lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6"
          >
            <Link to="/" className="mb-4 inline-block bg-white p-2 rounded-lg">
              <img
                src={logoLuciole}
                alt="Logo Luciole Energy"
                className="h-9 w-auto object-contain"
                width="110"
                height="36"
                loading="lazy"
              />
            </Link>

            <span className="text-[0.75rem] text-[var(--vert-accent)] font-semibold uppercase tracking-wider mb-3">
              Génie énergétique & B2B – Côte d'Ivoire
            </span>

            <p className="text-[0.8125rem] text-gray-300 leading-relaxed mb-6">
              L'expertise au service de vos projets énergétiques en Côte d'Ivoire. Partenaire technique de référence pour les acteurs industriels et tertiaires.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[0.75rem] text-gray-200">
              <ShieldCheck size={15} className="text-[var(--vert-accent)]" />
              <span>Certification ISO 9001</span>
            </div>
          </div>

          {/* Colonne 2 : Liens Utiles (2 colonnes lg) */}
          <div
            style={{ '--delay': '100ms' }}
            className="reveal lg:col-span-2"
          >
            <h3 className="text-[0.8125rem] font-bold uppercase tracking-wider text-white mb-5">
              Liens utiles
            </h3>
            <ul className="space-y-3 text-[0.8125rem] text-gray-300">
              <li>
                <Link to="/" className="footer-link-hover hover:text-white transition-colors duration-200">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="footer-link-hover hover:text-white transition-colors duration-200">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/realisations" className="footer-link-hover hover:text-white transition-colors duration-200">
                  Nos Réalisations
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openDevisModal()}
                  className="footer-link-hover hover:text-white transition-colors duration-200 text-left cursor-pointer"
                >
                  Demander un devis
                </button>
              </li>
              <li>
                <Link to="/contact" className="footer-link-hover hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Nos Expertises (3 colonnes lg) */}
          <div
            style={{ '--delay': '200ms' }}
            className="reveal lg:col-span-3"
          >
            <h3 className="text-[0.8125rem] font-bold uppercase tracking-wider text-white mb-5">
              Nos expertises
            </h3>
            <ul className="space-y-3 text-[0.8125rem] text-gray-300">
              <li>
                <Link to="/expertises" className="footer-link-hover hover:text-white transition-colors duration-200">
                  Électricité HT/BT
                </Link>
              </li>
              <li>
                <Link to="/expertises" className="footer-link-hover hover:text-white transition-colors duration-200">
                  Générateurs & Data Center
                </Link>
              </li>
              <li>
                <Link to="/expertises" className="footer-link-hover hover:text-white transition-colors duration-200">
                  Climatisation & Plomberie
                </Link>
              </li>
              <li>
                <Link to="/expertises" className="footer-link-hover hover:text-white transition-colors duration-200">
                  Éclairage Public
                </Link>
              </li>
              <li>
                <Link to="/expertises" className="footer-link-hover hover:text-white transition-colors duration-200">
                  Énergies Renouvelables
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Contactez-nous (3 colonnes lg) */}
          <div
            style={{ '--delay': '300ms' }}
            className="reveal lg:col-span-3"
          >
            <h3 className="text-[0.8125rem] font-bold uppercase tracking-wider text-white mb-5">
              Contactez-nous
            </h3>
            <ul className="space-y-4 text-[0.8125rem] text-gray-300">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[var(--vert-accent)] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[0.6875rem] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                    Assistance 24/7
                  </span>
                  <a href="tel:+2250707237353" className="footer-link-hover hover:text-white text-gray-200 font-medium transition-colors">
                    +225 07 07 23 73 53
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[var(--vert-accent)] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[0.6875rem] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                    Courriel officiel
                  </span>
                  <a href="mailto:info@luciole-energy.com" className="footer-link-hover hover:text-white text-gray-200 font-medium transition-colors">
                    info@luciole-energy.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[var(--vert-accent)] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[0.6875rem] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                    Siège opérationnel
                  </span>
                  <span className="text-gray-200 leading-snug">
                    Abidjan, Yopougon Batim 3, Rue S153
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Barre basse : fade simple 600ms */}
        <div
          className="reveal--fade pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[0.75rem] text-gray-400 gap-4"
          style={{ transition: 'opacity 600ms var(--ease-out) 400ms' }}
        >
          <p>© {currentYear} Luciole Energy. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link to="/mentions-legales" className="footer-link-hover hover:text-white transition-colors duration-200">
              Mentions Légales
            </Link>
            <span className="text-gray-600">•</span>
            <Link to="/politique-de-confidentialite" className="footer-link-hover hover:text-white transition-colors duration-200">
              Politique de Confidentialité
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
