import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useDevisModal } from '../../context/DevisModalContext'
import { ArrowRight } from 'lucide-react'
import logoLuciole from '../../assets/images/logo-luciole.jpg'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { openDevisModal } = useDevisModal()
  const location = useLocation()

  // Détection du scroll (> 24px) avec écouteur passif
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fermer le menu lors d'un changement de page
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/a-propos' },
    { name: 'Nos Expertises', path: '/expertises' },
    { name: 'Nos Réalisations', path: '/realisations' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-[var(--ease-out)] ${
        isScrolled
          ? 'header-scrolled py-2.5 sm:py-3'
          : 'bg-white py-4 sm:py-5 border-b border-[var(--gris-bordure)]/50'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        
        {/* Logo cliquable Luciole Energy avec scale proportionnel */}
        <Link
          to="/"
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vert-accent)] rounded"
          aria-label="Retour à l'accueil Luciole Energy"
        >
          <img
            src={logoLuciole}
            alt="Logo officiel Luciole Energy"
            className={`w-auto object-contain transition-all duration-300 ease-[var(--ease-out)] ${
              isScrolled ? 'h-8 sm:h-9' : 'h-9 sm:h-10'
            }`}
            width="120"
            height="40"
          />
        </Link>

        {/* Navigation centrée (desktop) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `nav-link-track relative text-[0.9375rem] font-medium py-1.5 transition-colors duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vert-accent)] rounded ${
                  isActive
                    ? 'is-active text-[var(--vert-principal)] font-semibold'
                    : 'text-[var(--gris-texte)] hover:text-[var(--texte-titre)]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Bouton d'action à droite (desktop) */}
        <div className="hidden md:flex items-center">
          <button
            type="button"
            onClick={() => openDevisModal()}
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[8px] bg-[var(--vert-principal)] hover:bg-[#0B472C] text-white text-[0.875rem] font-semibold tracking-normal transition-all duration-250 shadow-sm hover:shadow hover:-translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vert-accent)] focus-visible:ring-offset-2 cursor-pointer"
          >
            <span>Demander un devis</span>
            <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-[3px]" />
          </button>
        </div>

        {/* Bouton burger animé (mobile) */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 p-2 rounded-lg text-[var(--texte-titre)] hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vert-accent)] flex flex-col justify-center items-center gap-[5px]"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
          >
            <span
              className={`block w-5 h-[2px] bg-current rounded-full transition-transform duration-300 origin-center ${
                isOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-current rounded-full transition-all duration-300 ${
                isOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-current rounded-full transition-transform duration-300 origin-center ${
                isOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menu mobile glissant avec stagger */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-white border-b border-[var(--gris-bordure)] shadow-xl transition-all duration-300 ease-[var(--ease-out)] animate-in fade-in slide-in-from-top-2">
          <div className="container-custom py-6 flex flex-col gap-4">
            <nav className="flex flex-col gap-1" aria-label="Navigation mobile">
              {navLinks.map((link, idx) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-base font-medium transition-all duration-250 ${
                      isActive
                        ? 'bg-[var(--gris-fond)] text-[var(--vert-principal)] font-semibold border-l-4 border-[var(--vert-accent)]'
                        : 'text-[var(--gris-texte)] hover:bg-gray-50 hover:text-[var(--texte-titre)]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
            <div className="pt-3 border-t border-[var(--gris-bordure)]">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  openDevisModal()
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[8px] bg-[var(--vert-principal)] text-white text-[0.875rem] font-semibold transition-colors cursor-pointer"
              >
                <span>Demander un devis</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
