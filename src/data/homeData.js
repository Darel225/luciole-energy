// Importations propres des assets
import logoLuciole from '../assets/images/logo-luciole.jpg'
import heroImg from '../assets/images/hero-acceuil.webp'
import identiteImg from '../assets/images/identité-img.webp'
import expertise1Img from '../assets/images/domaine-expertise1.webp'
import expertise2Img from '../assets/images/domaine-expertise2.webp'
import expertise3Img from '../assets/images/domaine-expertise3.webp'
import expertise4Img from '../assets/images/domaine-expertise4.webp'
import expertise5Img from '../assets/images/domaine-expertise5.webp'
import ctaDevisImg from '../assets/images/image-devis.webp'

export { projects as projectsData } from './projects'

export const assets = {
  logo: logoLuciole,
  hero: heroImg,
  identite: identiteImg,
  ctaDevis: ctaDevisImg,
}

// Bandeau marques, références et agréments
export const partnersData = [
  {
    id: 'schneider',
    name: 'Schneider Electric',
    role: 'Services Reseller',
    type: 'partner',
  },
  {
    id: 'cie',
    name: 'CIE',
    role: 'Réseau National CI',
    type: 'network',
  },
  {
    id: 'saph',
    name: 'SAPH',
    role: 'Agro-industrie SIFCA',
    type: 'client',
  },
  {
    id: 'siemens',
    name: 'Siemens',
    role: 'Energy & Automation',
    type: 'technology',
  },
  {
    id: 'iso',
    name: 'ISO 9001:2015',
    role: 'Management Qualité',
    type: 'certification',
  },
]

// 5 Domaines d'Expertise
export const expertisesData = [
  {
    id: '01',
    num: '01',
    category: '01. CŒUR DE MÉTIER',
    title: 'Électricité HT / BT',
    subtitle: 'Haute & Basse Tension • Génie Industriel',
    description: 'Installation de lignes, tableauterie et maintenance industrielle. Étude, conception et déploiement de postes de transformation et armoires de distribution pour sites critiques.',
    tags: ['Postes HTA/HTB', 'TGBT & Armoires', 'Audit & Conformité'],
    image: expertise1Img,
    isLarge: true,
  },
  {
    id: '02',
    num: '02',
    category: '02. CONTINUITÉ CRITIQUE',
    title: 'Générateurs & Data Center',
    subtitle: 'Énergie de Secours & Disponibilité',
    description: 'Groupes électrogènes, onduleurs et infrastructures sécurisées pour une disponibilité 99,99% des opérations.',
    tags: ['Secours électrique permanent'],
    image: expertise2Img,
    isLarge: true,
  },
  {
    id: '03',
    num: '03',
    category: '03. GÉNIE CLIMATIQUE',
    title: 'Climatisation & Plomberie',
    subtitle: 'Froid & Traitement d\'Air',
    description: 'Froid industriel, climatisation tertiaire et réseaux sanitaires haute performance.',
    tags: ['HVAC & Fluides'],
    image: expertise3Img,
    isLarge: false,
  },
  {
    id: '04',
    num: '04',
    category: '04. TRANSITION ÉCOLOGIQUE',
    title: 'Énergies Renouvelables',
    subtitle: 'Solaire Photovoltaïque',
    description: 'Systèmes photovoltaïques, stockage par batteries et solutions hybrides décarbonées.',
    tags: ['Solaire & Autoconsommation'],
    image: expertise4Img,
    isLarge: false,
  },
  {
    id: '05',
    num: '05',
    category: '05. INFRASTRUCTURE URBAINE',
    title: 'Éclairage Public',
    subtitle: 'Voiries & Sites Industriels',
    description: 'Voiries, sites industriels et éclairage solaire autonome à haute efficience énergétique.',
    tags: ['Candélabres & Smart Lighting'],
    image: expertise5Img,
    isLarge: false,
  },
]

// Indicateurs clés (bande verte)
export const statsData = [
  {
    id: 'stat-1',
    value: '24/7',
    numericTarget: 24,
    suffix: '/7',
    label: 'Intervention & Assistance continue',
  },
  {
    id: 'stat-2',
    value: '100%',
    numericTarget: 100,
    suffix: '%',
    label: 'Qualité certifiée – Norme ISO 9001:2015',
  },
  {
    id: 'stat-3',
    value: '7',
    numericTarget: 7,
    suffix: '',
    label: 'Agences en Côte d\'Ivoire',
  },
  {
    id: 'stat-4',
    value: '10+',
    numericTarget: 10,
    suffix: '+',
    label: 'Années d\'expertise – Au service des industriels',
  },
]