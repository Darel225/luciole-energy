import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import contactHeroImg from '../assets/images/contact-hero.png'
import {
  ShieldCheck,
  Lock,
  FileText,
  UserCheck,
  Server,
  Clock,
  Eye,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Scale,
  Cookie,
  HelpCircle,
} from 'lucide-react'

export default function PolitiqueConfidentialite() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Politique de Confidentialité | Luciole Energy'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Découvrez la politique de confidentialité de Luciole Energy : protection des données B2B, secret professionnel industriel et conformité à la Loi ivoirienne n° 2013-450 (ARTCI).'
      )
    }
  }, [])

  const sections = [
    { id: 'cadre', title: '1. Préambule & Cadre légal (ARTCI)' },
    { id: 'responsable', title: '2. Responsable du traitement' },
    { id: 'donnees-collectees', title: '3. Données collectées & Upload' },
    { id: 'finalites', title: '4. Finalités & Bases légales' },
    { id: 'secret-industriel', title: '5. Secret professionnel & Confidentialité' },
    { id: 'destinataires', title: '6. Destinataires & Non-cession' },
    { id: 'conservation', title: '7. Durée de conservation' },
    { id: 'securite', title: '8. Sécurité & Chiffrement' },
    { id: 'droits', title: '9. Vos droits & Voies de recours' },
    { id: 'cookies', title: '10. Gestion des Cookies' },
    { id: 'contact-dpo', title: '11. Contact DPO & Réclamations' },
  ]

  return (
    <main className="bg-[#F8FAF9] min-h-screen">
      {/* 1. Hero interne harmonisé */}
      <PageHero
        badge="Protection des Données & Vie Privée"
        title="Politique de Confidentialité"
        titleDot="."
        description="Engagements de protection de vos données nominatives et industrielles, conformité rigoureuse à la législation ivoirienne (ARTCI) et aux standards internationaux de sécurité B2B."
        breadcrumbs={[
          { label: 'Accueil', path: '/' },
          { label: 'Politique de Confidentialité', path: '/politique-de-confidentialite' },
        ]}
        image={contactHeroImg}
        imageAlt="Garantie de confidentialité et sécurité énergétique Luciole Energy"
        animate={false}
      />

      {/* 2. Contenu principal en 2 colonnes */}
      <div className="container-custom py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Sommaire sticky sur desktop */}
          <aside className="lg:col-span-4 lg:sticky lg:top-[104px] space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[var(--gris-bordure)] shadow-sm">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-100">
                <Lock size={18} className="text-[var(--vert-principal)] shrink-0" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--texte-titre)]">
                  Sommaire Confidentialité
                </h2>
              </div>
              <nav className="space-y-1.5" aria-label="Sommaire de la politique de confidentialité">
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
                  <span>Conforme Loi N° 2013-450 (Côte d'Ivoire)</span>
                </div>
                <p className="text-[0.6875rem] text-gray-500 leading-relaxed">
                  Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire (ARTCI).
                </p>
              </div>
            </div>

            {/* Délégué à la protection des données */}
            <div className="bg-[var(--bleu-nuit)] text-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 text-[var(--vert-accent-light)] font-bold text-xs uppercase tracking-wider mb-2">
                <UserCheck size={16} />
                <span>Contact Délégué aux Données</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Pour toute question relative à vos données ou pour exercer vos droits d'accès et d'effacement, contactez notre DPO :
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[var(--vert-accent)] shrink-0" />
                  <a href="tel:+2250707237353" className="text-white hover:text-[var(--vert-accent-light)] font-medium">
                    +225 07 07 23 73 53
                  </a>
                </div>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--vert-accent-light)] hover:underline font-semibold"
                  >
                    <span>Page Contact & Devis</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Corps de la politique */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Bannière d'engagement */}
            <div className="bg-emerald-50/70 border-l-4 border-[var(--vert-principal)] p-5 sm:p-6 rounded-r-2xl">
              <div className="flex items-start gap-3">
                <ShieldCheck size={22} className="text-[var(--vert-principal)] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-emerald-950 uppercase tracking-wider mb-1">
                    Engagement solennel de confidentialité industrielle
                  </h3>
                  <p className="text-xs sm:text-[0.8125rem] text-emerald-900 leading-relaxed">
                    Chez <strong>Luciole Energy</strong>, nous considérons les données industrielles, les schémas techniques et les correspondances de nos clients B2B comme des actifs hautement confidentiels. Aucune donnée transmise via nos formulaires ou études de faisabilité n'est commercialisée, cédée ou partagée avec des régies publicitaires.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 1 : PRÉAMBULE & CADRE LÉGAL */}
            <section
              id="cadre"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <Scale size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Réglementation nationale
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    1. Préambule & Cadre légal (ARTCI)
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-3">
                <p>
                  La présente Politique de Confidentialité détaille la manière dont la société <strong>LUCIOLE ENERGY SARL</strong> collecte, traite, conserve et protège les données à caractère personnel ainsi que les documents techniques transmis sur son site internet.
                </p>
                <p>
                  Les traitements opérés sont strictement conformes aux dispositions légales de la République de Côte d'Ivoire, notamment :
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-[0.8125rem]">
                  <li>
                    <strong>La Loi n° 2013-450 du 19 juin 2013</strong> relative à la protection des données à caractère personnel en République de Côte d'Ivoire.
                  </li>
                  <li>
                    <strong>L'Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire (ARTCI)</strong>, autorité publique indépendante chargée de veiller au respect des libertés et des droits fondamentaux dans le domaine numérique.
                  </li>
                  <li>
                    <strong>La Loi n° 2013-546 du 30 juillet 2013</strong> relative aux transactions électroniques.
                  </li>
                  <li>
                    Les meilleurs standards internationaux de cybersécurité et de confidentialité B2B (alignement sur les principes du RGPD pour les coopérations internationales).
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 2 : RESPONSABLE DU TRAITEMENT */}
            <section
              id="responsable"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <UserCheck size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Gouvernance des données
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    2. Responsable du traitement
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-3">
                <p>
                  Le responsable du traitement des données collectées sur le site est :
                </p>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs space-y-1.5">
                  <p><strong>Entité :</strong> LUCIOLE ENERGY SARL</p>
                  <p><strong>Siège social :</strong> Zone Industrielle de Yopougon, Batim 3, Rue S153 • 01 BP 4518 Abidjan 01, République de Côte d'Ivoire</p>
                  <p><strong>Représentant légal :</strong> La Direction Générale</p>
                  <p><strong>Assistance téléphonique :</strong> +225 07 07 23 73 53</p>
                </div>
              </div>
            </section>

            {/* SECTION 3 : DONNÉES COLLECTÉES */}
            <section
              id="donnees-collectees"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Transparence
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    3. Données collectées via nos formulaires & upload
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-4">
                <p>
                  Dans le cadre de l’étude de vos projets et de vos demandes de devis, nous collectons uniquement les informations adéquates, pertinentes et limitées à ce qui est strictement nécessaire (principe de minimisation des données) :
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-1">
                      A. Données d’identification professionnelle & contact :
                    </h4>
                    <p className="text-gray-600">
                      Société ou raison sociale, nom et prénom du contact référent, adresse email professionnelle, numéro de téléphone direct, fonction ou titre au sein de l'entreprise.
                    </p>
                  </div>

                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-1">
                      B. Spécifications techniques du besoin énergétique :
                    </h4>
                    <p className="text-gray-600">
                      Domaine d'intervention sélectionné (HT/BT, solaire photovoltaïque, groupes électrogènes, etc.), site d'intervention (Abidjan, San Pedro, localité de l'intérieur, site minier ou industriel), puissances estimées, contraintes d'exploitation et délais souhaités.
                    </p>
                  </div>

                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-1">
                      C. Documents techniques joints (Upload sécurisé jusqu'à 25 Mo) :
                    </h4>
                    <p className="text-gray-600">
                      Cahiers des charges, fiches techniques, plans unifilaires, métrés ou fichiers DAO/CAD (PDF, DWG, Excel, Word). Ces documents sont hébergés sur des volumes chiffrés et accessibles exclusivement aux ingénieurs désignés pour l'étude.
                    </p>
                  </div>

                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-1">
                      D. Données techniques de navigation :
                    </h4>
                    <p className="text-gray-600">
                      Adresse IP abrégée, horodatage des requêtes, type de navigateur et résolution d'écran (finalité exclusive de cybersécurité et de détection de bots malveillants).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4 : FINALITÉS */}
            <section
              id="finalites"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Légalité des traitements
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    4. Finalités & Bases légales des traitements B2B
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-3">
                <p>
                  Vos données sont collectées et traitées exclusivement pour les finalités légitimes suivantes :
                </p>
                <div className="divide-y divide-gray-100 text-xs">
                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div>
                      <strong className="text-gray-900 block">Étude technique & Dimensionnement de devis</strong>
                      <span className="text-gray-500">Chiffrage, dimensionnement solaire ou TGBT et proposition d'offre commerciale.</span>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded-md bg-emerald-50 text-[var(--vert-principal)] font-bold text-[10px] uppercase">
                      Mesure précontractuelle
                    </span>
                  </div>

                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div>
                      <strong className="text-gray-900 block">Exécution des chantiers & Déploiements</strong>
                      <span className="text-gray-500">Coordination technique, interventions terrain, essais et réceptions de travaux.</span>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 font-bold text-[10px] uppercase">
                      Exécution de contrat
                    </span>
                  </div>

                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div>
                      <strong className="text-gray-900 block">Assistance 24/7 & Astreinte industrielle</strong>
                      <span className="text-gray-500">Prise en charge des urgences sur cellules, générateurs et armoires de distribution.</span>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 font-bold text-[10px] uppercase">
                      Exécution de contrat
                    </span>
                  </div>

                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div>
                      <strong className="text-gray-900 block">Respect des obligations comptables et fiscales</strong>
                      <span className="text-gray-500">Facturation, archivage légal, déclarations en République de Côte d'Ivoire.</span>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 font-bold text-[10px] uppercase">
                      Obligation légale
                    </span>
                  </div>

                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div>
                      <strong className="text-gray-900 block">Sécurité informatique & Lutte contre les intrusions</strong>
                      <span className="text-gray-500">Protection des serveurs, pare-feu applicatif, prévention des attaques par déni.</span>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-bold text-[10px] uppercase">
                      Intérêt légitime
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5 : SECRET INDUSTRIEL */}
            <section
              id="secret-industriel"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <Lock size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Clause stricte
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    5. Secret professionnel & Confidentialité industrielle
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-3">
                <p>
                  Dans l'exercice de ses activités de génie énergétique, Luciole Energy est amenée à prendre connaissance de données sensibles relatives aux installations de ses clients (plans d'usines, puissance souscrite CIE, capacité de production, schémas de tableaux généraux basse tension TGBT, réseaux de secours).
                </p>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 text-xs text-gray-700 space-y-2">
                  <p className="font-semibold text-gray-900">
                    Luciole Energy s'engage de façon formelle et irrévocable à :
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Considérer l’ensemble de ces informations et documents comme strictement confidentiels.</li>
                    <li>Ne les communiquer qu'aux collaborateurs et sous-traitants techniques ayant un besoin impératif d'en connaître pour l'exécution des travaux.</li>
                    <li>Faire souscrire à tous ses collaborateurs et sous-traitants une clause de confidentialité de même niveau d'exigence.</li>
                    <li>Ne jamais exploiter ces documents à d'autres fins que le projet commandité par le client.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 6 : DESTINATAIRES */}
            <section
              id="destinataires"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <Eye size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Partage restreint
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    6. Destinataires des données & Non-cession
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-3">
                <p>
                  Les données collectées sont réservées à l’usage exclusif de la société <strong>Luciole Energy</strong> :
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-[0.8125rem]">
                  <li><strong>Destinataires internes :</strong> Membres habilités de la Direction Commerciale, du Bureau d'Études Énergétiques, des équipes de chantier et du service administratif.</li>
                  <li><strong>Prestataires techniques tiers :</strong> Hébergeurs Cloud et prestataires informatiques sécurisés agissant sous notre contrôle et soumis aux mêmes obligations de sécurité.</li>
                  <li><strong>Autorités publiques :</strong> Uniquement sur réquisition judiciaire formelle émanant des juridictions compétentes de la République de Côte d'Ivoire.</li>
                </ul>
                <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl text-xs text-red-900 font-medium">
                  Garantie : Vos données personnelles et professionnelles ne sont jamais vendues, louées, prêtées ou échangées à des sociétés tierces à des fins commerciales ou marketing.
                </div>
              </div>
            </section>

            {/* SECTION 7 : CONSERVATION */}
            <section
              id="conservation"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Durée de vie
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    7. Durée de conservation des données
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-3">
                <p>
                  Les données sont conservées pour une durée strictement proportionnée aux finalités pour lesquelles elles ont été recueillies :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-900 block mb-1">Prospects & Devis</span>
                    <p className="text-gray-600">3 ans à compter du dernier contact émanant de votre entreprise.</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-900 block mb-1">Dossiers Clients</span>
                    <p className="text-gray-600">Durée de la relation contractuelle augmentée de 10 ans (prescription comptable CI).</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-900 block mb-1">Dossiers d'Ouvrages (DOE)</span>
                    <p className="text-gray-600">10 ans au titre des garanties décennales et du suivi de maintenance.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8 : SÉCURITÉ */}
            <section
              id="securite"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <Server size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Intégrité technique
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    8. Sécurité & Chiffrement des données
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-3">
                <p>
                  Luciole Energy applique des mesures de sécurité techniques et organisationnelles conformes aux recommandations de l'ARTCI pour préserver l'intégrité et la confidentialité de vos informations :
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-[0.8125rem]">
                  <li>Chiffrement SSL/TLS (HTTPS) de tous les échanges transitant par le site web.</li>
                  <li>Contrôle d'accès strict et authentification forte pour les serveurs et boîtes de messagerie.</li>
                  <li>Filtrage anti-intrusion et pare-feu applicatif protégeant les bases de données contre les injections SQL et attaques CSRF.</li>
                  <li>Sauvegardes quotidiennes isolées et protégées contre les ransomwares.</li>
                </ul>
              </div>
            </section>

            {/* SECTION 9 : DROITS DE L'UTILISATEUR */}
            <section
              id="droits"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Loi n° 2013-450
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    9. Vos droits & Voies de recours
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-3">
                <p>
                  Conformément à la législation ivoirienne en vigueur, vous disposez des droits suivants sur vos données personnelles :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs my-3">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <strong className="text-gray-900 block mb-0.5">Droit d'accès :</strong>
                    <span className="text-gray-600">Obtenir confirmation que vos données sont traitées et en obtenir copie intégrale.</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <strong className="text-gray-900 block mb-0.5">Droit de rectification :</strong>
                    <span className="text-gray-600">Exiger la mise à jour ou la correction de données inexactes ou incomplètes.</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <strong className="text-gray-900 block mb-0.5">Droit à l'effacement :</strong>
                    <span className="text-gray-600">Demander la suppression de vos données (« droit à l'oubli ») selon les conditions légales.</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <strong className="text-gray-900 block mb-0.5">Droit d'opposition :</strong>
                    <span className="text-gray-600">Vous opposer pour des motifs légitimes au traitement de vos données.</span>
                  </div>
                </div>

                <p className="font-semibold text-gray-800 text-xs">
                  Modalité d’exercice de vos droits :
                </p>
                <p className="text-xs">
                  Vous pouvez exercer vos droits à tout moment en adressant votre demande via notre <Link to="/contact" className="text-[var(--vert-principal)] font-bold underline">formulaire de contact sécurisé</Link> ou par courrier postal au siège de la société. Une réponse motivée vous sera adressée sous un délai maximum de trente (30) jours ouvrés.
                </p>
                <p className="text-[11px] text-gray-500 italic">
                  En cas de litige non résolu, vous disposez du droit légal d'introduire une réclamation auprès de l'<strong>ARTCI</strong> (Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire — www.artci.ci).
                </p>
              </div>
            </section>

            {/* SECTION 10 : COOKIES */}
            <section
              id="cookies"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <Cookie size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Navigation & Sécurité
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    10. Gestion des Cookies
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-3">
                <p>
                  Ce site internet utilise exclusivement des traceurs et cookies <strong>strictement nécessaires</strong> au bon fonctionnement technique et à la sécurité de la session utilisateur :
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-[0.8125rem]">
                  <li><strong>Cookies de session :</strong> Maintien de l'état de navigation et protection contre les attaques par contrefaçon de requête (CSRF).</li>
                  <li><strong>Cookies de préférences :</strong> Mémorisation de vos choix d'accessibilité (mode réduit, préférences d'affichage).</li>
                </ul>
                <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-950">
                  <strong>Politique zéro traceur intrusif :</strong> Nous n'utilisons aucun cookie de ciblage publicitaire ni revente de profils à des régies marketing tierces. Vous pouvez à tout moment configurer votre navigateur pour bloquer les cookies, sans que cela n'empêche la consultation des informations du site.
                </div>
              </div>
            </section>

            {/* SECTION 11 : CONTACT DPO */}
            <section
              id="contact-dpo"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--gris-bordure)] shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center shrink-0">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--vert-accent)]">
                    Correspondance dédiée
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--texte-titre)]">
                    11. Contact DPO & Réclamations
                  </h2>
                </div>
              </div>

              <div className="text-xs sm:text-[0.875rem] text-[var(--gris-texte)] leading-relaxed space-y-4">
                <p>
                  Pour toute question relative à cette politique de confidentialité ou pour toute demande d'assistance sur le traitement de vos données B2B :
                </p>

                <div className="p-5 bg-[var(--bleu-nuit)] text-white rounded-2xl space-y-3 text-xs shadow-md">
                  <h4 className="font-bold text-[var(--vert-accent-light)] uppercase tracking-wider">
                    Délégué à la Protection des Données — Luciole Energy
                  </h4>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-[var(--vert-accent-light)] shrink-0" />
                    <span>Zone Industrielle de Yopougon, Batim 3, Rue S153 • 01 BP 4518 Abidjan 01, Côte d'Ivoire</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-[var(--vert-accent-light)] shrink-0" />
                    <a href="tel:+2250707237353" className="hover:text-[var(--vert-accent-light)] font-semibold">
                      +225 07 07 23 73 53
                    </a>
                  </div>
                  <div className="pt-1">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--vert-accent-light)] hover:underline font-semibold"
                    >
                      <span>Transmettre une demande via la page Contact</span>
                      <ExternalLink size={13} />
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-gray-500">
                    Politique applicable à compter de Janvier 2026.
                  </span>
                  <Link
                    to="/mentions-legales"
                    className="text-xs font-semibold text-[var(--vert-principal)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Consulter les Mentions Légales</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  )
}

