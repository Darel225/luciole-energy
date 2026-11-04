import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import heroAproposImg from '../assets/images/hero-apropos.webp'
import {
  Building2,
  FileText,
  ShieldCheck,
  Scale,
  Lock,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react'

export default function MentionsLegales() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Mentions Légales | Luciole Energy'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Consultez les mentions légales de Luciole Energy : identification de l’éditeur, propriété intellectuelle, CGU et cadre juridique applicable en Côte d’Ivoire.'
      )
    }
  }, [])

  const sections = [
    { id: 'editeur', title: '1. Éditeur de la plateforme' },
    { id: 'activite', title: '2. Nature des services & Informations' },
    { id: 'propriete', title: '3. Propriété intellectuelle (OAPI)' },
    { id: 'cgu', title: '4. Conditions d’utilisation (CGU)' },
    { id: 'donnees', title: '5. Données personnelles & Cookies' },
    { id: 'droit', title: '6. Droit applicable & Juridiction' },
    { id: 'contact-juridique', title: '7. Contact & Assistance' },
  ]

  return (
    <main className="bg-[#F8FAF9] min-h-screen">
      {/* 1. Hero interne harmonisé */}
      <PageHero
        badge="Cadre Légal & Réglementaire"
        title="Mentions Légales"
        titleDot="."
        description="Informations légales relatives à l'éditeur du site officiel de Luciole Energy, à la propriété intellectuelle et aux conditions générales d'utilisation."
        breadcrumbs={[
          { label: 'Accueil', path: '/' },
          { label: 'Mentions Légales', path: '/mentions-legales' },
        ]}
        image={heroAproposImg}
        imageAlt="Infrastructures techniques Luciole Energy en Côte d'Ivoire"
        animate={false}
      />

      {/* 2. Contenu principal structuré en 2 colonnes */}
      <div className="container-custom py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Sommaire sticky sur desktop */}
          <aside className="lg:col-span-4 lg:sticky lg:top-[104px] space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[var(--gris-bordure)] shadow-sm">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-100">
                <FileText size={18} className="text-[var(--vert-principal)] shrink-0" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--texte-titre)]">
                  Sommaire Légal
                </h2>
              </div>
              <nav className="space-y-1.5" aria-label="Sommaire des mentions légales">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block px-3 py-2 text-xs font-medium text-[var(--gris-texte)] hover:text-[var(--vert-principal)] hover:bg-[var(--vert-pale)] rounded-lg transition-colors duration-200"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-2 text-[0.75rem] text-[var(--vert-accent)] font-semibold mb-1">
                  <ShieldCheck size={16} />
                  <span>Conformité République de Côte d'Ivoire</span>
                </div>
                <p className="text-[0.6875rem] text-gray-500 leading-relaxed">
                  Législation commerciale, droit des affaires OHADA et conformité numérique ARTCI.
                </p>
              </div>
            </div>

            {/* Encadré d'assistance rapide */}
            <div className="bg-[var(--bleu-nuit)] text-white rounded-2xl p-6 shadow-md">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--vert-accent-light)] mb-2">
                Besoin d'une clarification ?
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Notre secrétariat général et bureau d'études sont à votre disposition pour toute question juridique ou contractuelle.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[var(--vert-accent-light)] transition-colors"
              >
                <span>Accéder au formulaire de contact</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </aside>

          {/* Corps des mentions légales */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Note d'introduction */}
            <div className="bg-emerald-50/70 border-l-4 border-[var(--vert-principal)] p-5 sm:p-6 rounded-r-2xl">
              <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                Le présent site internet est le portail institutionnel officiel de la société <strong className="font-semibold">LUCIOLE ENERGY</strong>, entreprise spécialisée dans l'ingénierie énergétique, l'électricité industrielle HT/BT, les énergies renouvelables et les solutions d'alimentation continue en Côte d'Ivoire.
              </p>
              <p className="text-[11px] sm:text-xs text-emerald-800/80 mt-2">
                Dernière révision légale : Janvier 2026.
              </p>
            </div>

            {/* SECTION 1 : ÉDITEUR */}
            <section
              id="editeur"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <Building2 size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Identité légale
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    1. Éditeur de la plateforme
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-4">
                <p>
                  Le site web est édité et exploité par la société <strong>LUCIOLE ENERGY CÔTE D'IVOIRE</strong> :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                  <div>
                    <span className="block text-gray-400 font-medium uppercase text-[10px]">Dénomination sociale</span>
                    <span className="font-semibold text-gray-900">LUCIOLE ENERGY SARL</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 font-medium uppercase text-[10px]">Forme juridique</span>
                    <span className="font-semibold text-gray-900">Société à Responsabilité Limitée</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 font-medium uppercase text-[10px]">Siège social</span>
                    <span className="font-semibold text-gray-900">Abidjan, Yopougon Z.I., Batim 3, Rue S153</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 font-medium uppercase text-[10px]">Certification qualité</span>
                    <span className="font-semibold text-gray-900">Process certifié conforme ISO 9001</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={15} className="text-[var(--vert-accent)] shrink-0" />
                    <a href="tel:+2250707237353" className="hover:text-[var(--vert-principal)] font-medium">
                      +225 07 07 23 73 53
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={15} className="text-[var(--vert-accent)] shrink-0" />
                    <span>01 BP 4518 Abidjan 01, Côte d'Ivoire</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2 : NATURE DES SERVICES */}
            <section
              id="activite"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Engagements B2B
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    2. Nature des services & Informations techniques
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-3">
                <p>
                  Le site web a pour objet de présenter les compétences d'ingénierie, les réalisations et les offres de services de Luciole Energy dans les domaines suivants :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
                  {[
                    'Ingénierie & Réseaux Électriques HT/BT',
                    'Groupes Électrogènes & Onduleurs Industriels',
                    'Climatisation, Froid & Traitement d\'Air',
                    'Éclairage Public Solaire & Électrification Rurale',
                    'Centrales Photovoltaïques & Énergies Renouvelables',
                    'Audits Énergétiques & Maintenance Préventive',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-xs">
                      <CheckCircle2 size={14} className="text-[var(--vert-accent)] shrink-0" />
                      <span className="font-medium text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] sm:text-xs text-gray-500 italic bg-gray-50 p-3 rounded-xl border border-gray-100">
                  Avis important : Les descriptifs d'équipements, puissances et spécifications techniques présentés sur ce site ont une vocation strictement informative. Seuls les devis d'études, cahiers des charges validés et contrats formalisés par écrit engagent contractuellement la responsabilité de Luciole Energy.
                </p>
              </div>
            </section>

            {/* SECTION 3 : PROPRIÉTÉ INTELLECTUELLE */}
            <section
              id="propriete"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <Lock size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Droits réservés
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    3. Propriété intellectuelle (OAPI)
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-3">
                <p>
                  L’ensemble des éléments constitutifs de ce site (notamment la marque <strong>Luciole Energy</strong>, le logotype, les chartes graphiques, photographies de chantiers industriels, icônes, vidéos, textes techniques, bases de données et code source) est protégé par les lois relatives à la propriété intellectuelle en vigueur en République de Côte d'Ivoire ainsi que par les accords de l’<strong>Organisation Africaine de la Propriété Intellectuelle (OAPI)</strong>.
                </p>
                <p>
                  Toute reproduction, représentation, altération, diffusion ou exploitation, intégrale ou partielle, de l'un quelconque de ces éléments, par quelque procédé que ce soit, sans l'accord préalable et exprès par écrit de la direction de <strong>Luciole Energy</strong>, est strictement interdite et constituerait une contrefaçon sanctionnée par le Code pénal ivoirien et les juridictions compétentes.
                </p>
              </div>
            </section>

            {/* SECTION 4 : CGU */}
            <section
              id="cgu"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Modalités d'accès
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    4. Conditions Générales d’Utilisation (CGU)
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-3">
                <p>
                  L’utilisateur du site s’engage à accéder à la plateforme avec un équipement récent, ne contenant aucun virus informatique, et au moyen d’un navigateur moderne régulièrement mis à jour.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-[0.8125rem]">
                  <li>
                    <strong>Accessibilité :</strong> Luciole Energy s'efforce de garantir un accès permanent au site 24h/24 et 7j/7, mais ne saurait être tenue pour responsable d’une interruption technique temporaire pour maintenance ou défaillance du réseau internet.
                  </li>
                  <li>
                    <strong>Usage loyal :</strong> Il est strictement interdit d'utiliser les formulaires de devis ou de contact à des fins de spam, d'ingénierie sociale ou de transmission de contenus malveillants.
                  </li>
                  <li>
                    <strong>Liens hypertextes :</strong> Les liens pointant vers des sites tiers sont fournis à titre de commodité. Luciole Energy n'exerce aucun contrôle sur le contenu de ces sites et décline toute responsabilité quant à leur teneur.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 5 : DONNÉES & COOKIES */}
            <section
              id="donnees"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Vie Privée & ARTCI
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    5. Données personnelles & Cookies
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-3">
                <p>
                  Luciole Energy accorde la plus haute importance à la protection et à la confidentialité des informations nominatives et techniques transmises par ses clients et partenaires.
                </p>
                <p>
                  Les traitements de données réalisés via ce site respectent scrupuleusement la <strong>Loi n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel en République de Côte d'Ivoire</strong>, sous l’autorité de l’<strong>ARTCI</strong>.
                </p>
                <div className="p-4 bg-[var(--vert-pale)] rounded-xl flex items-center justify-between gap-4 mt-3">
                  <span className="text-xs font-semibold text-[var(--vert-principal)]">
                    Consultez l'intégralité de nos engagements et vos droits d'accès :
                  </span>
                  <Link
                    to="/politique-de-confidentialite"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--vert-principal)] text-white text-xs font-bold hover:bg-[#0B472C] transition-colors shrink-0"
                  >
                    <span>Politique de Confidentialité</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 6 : DROIT APPLICABLE */}
            <section
              id="droit"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <Scale size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Compétence territoriale
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    6. Droit applicable & Juridiction compétente
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-3">
                <p>
                  Les présentes mentions légales et les conditions d'utilisation du site sont régies et interprétées conformément au <strong>droit de la République de Côte d'Ivoire</strong>.
                </p>
                <p>
                  En cas de différend ou de litige relatif à l’utilisation du site web, à l’interprétation ou à l’exécution des présentes, les parties s’engagent à rechercher préalablement un règlement amiable. À défaut d’accord amiable dans un délai de trente (30) jours, attribution expresse et exclusive de compétence est faite aux tribunaux compétents d’<strong>Abidjan</strong> (Tribunal de Commerce d’Abidjan).
                </p>
              </div>
            </section>

            {/* SECTION 7 : CONTACT JURIDIQUE */}
            <section
              id="contact-juridique"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Correspondance
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    7. Contact & Assistance
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-4">
                <p>
                  Pour toute notification légale, signalement de contenu illicite ou demande relative au fonctionnement de cette plateforme, vous pouvez vous adresser directement à :
                </p>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2 text-xs">
                  <p className="font-semibold text-gray-900">
                    LUCIOLE ENERGY — Direction Juridique & Conformité
                  </p>
                  <p className="text-gray-600">
                    Zone Industrielle de Yopougon, Batim 3, Rue S153 • 01 BP 4518 Abidjan 01, Côte d'Ivoire
                  </p>
                  <p className="text-gray-600">
                    Ligne téléphonique : <a href="tel:+2250707237353" className="font-semibold text-gray-900 hover:text-[var(--vert-principal)]">+225 07 07 23 73 53</a>
                  </p>
                  <p className="text-gray-600">
                    Transmission en ligne : <Link to="/contact" className="font-semibold text-[var(--vert-principal)] underline">Formulaire de contact officiel</Link>
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  )
}
