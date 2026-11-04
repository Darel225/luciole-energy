// Données officielles de la page À Propos
import heroAproposImg from '../assets/images/hero-apropos.png'
import engagementImg from '../assets/images/engagemant-photo.png'

export const aboutData = {
  hero: {
    badge: 'Notre identité',
    title: 'L\'excellence de l\'ingénierie ivoirienne',
    description: 'Le partenaire de confiance des entreprises pour des infrastructures énergétiques fiables, sécurisées et durables en Côte d\'Ivoire.',
    image: heroAproposImg,
    imageAlt: 'Équipe d\'ingénieurs Luciole Energy en réunion technique autour de plans',
  },
  whoWeAre: {
    label: 'Qui sommes-nous ?',
    title: 'Plus qu\'un prestataire, un partenaire technique de confiance.',
    paragraphs: [
      {
        id: 'p1',
        segments: [
          { text: 'Luciole Energy met son expertise au service des entreprises dans ', accent: false },
          { text: 'l\'étude, la conception, la réalisation et la maintenance', accent: true },
          { text: ' de solutions électriques, énergétiques et techniques fiables, performantes et adaptées à leurs besoins.', accent: false },
        ],
      },
      {
        id: 'p2',
        segments: [
          { text: 'De l\'analyse du besoin à la mise en service, nous proposons un accompagnement complet visant à garantir ', accent: false },
          { text: 'la continuité de vos activités', accent: true },
          { text: ', la fiabilité de vos équipements, la maîtrise de vos consommations et la performance durable de vos installations.', accent: false },
        ],
      },
    ],
    checklist: [
      'Études et conception sur mesure',
      'Réalisation et mise en service',
      'Maintenance préventive et curative',
    ],
  },
  engagement: {
    badge: 'Engagement stratégique',
    title: 'Notre Engagement pour l\'Avenir',
    description: 'Guidée par l\'exigence industrielle et l\'utilité publique, notre démarche structure chacune de nos interventions au service de la transition énergétique en Afrique de l\'Ouest.',
    image: engagementImg,
    imageAlt: 'Centrale solaire et transformateurs haute tension déployés par Luciole Energy au coucher de soleil',
    pillars: [
      {
        num: '01',
        tag: 'PILIER 01',
        title: 'Notre Mission',
        text: 'Concevoir, déployer et maintenir des solutions énergétiques fiables et sur-mesure pour accompagner la croissance en Côte d\'Ivoire.',
      },
      {
        num: '02',
        tag: 'PILIER 02',
        title: 'Notre Vision',
        text: 'Devenir la référence de l\'ingénierie énergétique en Afrique de l\'Ouest, en alliant innovation et transition écologique.',
      },
      {
        num: '03',
        tag: 'PILIER 03',
        title: 'Nos Valeurs',
        text: 'Rigueur technique ISO 9001, sécurité absolue, réactivité (24/7), et engagement éco-responsable.',
      },
    ],
    highlights: [
      'Norme ISO 9001:2015',
      'Disponibilité 24/7',
      'Standards QHSE',
    ],
  },
  standards: {
    badge: 'Exigence QHSE',
    title: 'Standards & Certifications',
    description: 'Une culture de l\'excellence garantie par des standards internationaux et une discipline opérationnelle sans compromis.',
    isoCard: {
      badge: 'CERTIFIÉ',
      subBadge: 'Audité en continu',
      title: 'Accréditation Internationale',
      compliance: '100% de conformité opérationnelle validée',
    },
    items: [
      {
        num: '01',
        title: 'Qualité Certifiée (ISO 9001)',
        description: 'Nos processus sont audités et certifiés pour garantir une qualité d\'exécution irréprochable sur chaque projet.',
        icon: 'Award',
      },
      {
        num: '02',
        title: 'Sécurité Absolue',
        description: 'Politique zéro accident. Nos équipes interviennent sur chantiers avec les équipements et protocoles les plus stricts.',
        icon: 'ShieldCheck',
      },
      {
        num: '03',
        title: 'Éco-Responsabilité',
        description: 'Intégration de solutions à haute efficacité énergétique pour minimiser l\'empreinte carbone de vos infrastructures.',
        icon: 'Leaf',
      },
    ],
  },
  approach: {
    badge: 'Méthodologie',
    title: 'Notre Approche',
    titleHighlight: 'Opérationnelle',
    description: 'Un accompagnement de bout en bout, de l\'audit à la maintenance, pour garantir la performance de vos installations.',
    steps: [
      {
        num: '01',
        phase: 'PHASE PRÉPARATOIRE',
        title: 'Audit & Étude',
        description: 'Analyse approfondie de vos besoins et évaluation des contraintes de votre site industriel.',
      },
      {
        num: '02',
        phase: 'DIMENSIONNEMENT & R&D',
        title: 'Ingénierie & Conception',
        description: 'Design sur-mesure de l\'architecture énergétique et sélection rigoureuse des équipements.',
      },
      {
        num: '03',
        phase: 'EXÉCUTION INDUSTRIELLE',
        title: 'Déploiement sur Site',
        description: 'Installation par nos équipes certifiées avec respect des normes de sécurité.',
      },
      {
        num: '04',
        phase: 'PÉRENNITÉ & SUIVI 24/7',
        title: 'Exploitation & Maintenance',
        description: 'Suivi préventif et intervention curative 24/7 pour assurer une disponibilité continue.',
      },
    ],
  },
  cta: {
    badge: 'Passez à l\'action • Bureau d\'études',
    title: 'Prêt à concrétiser vos ambitions énergétiques ?',
    description: 'Contactez notre bureau d\'études pour une évaluation personnalisée de vos infrastructures industrielles et tertiaires en Côte d\'Ivoire et en Afrique de l\'Ouest.',
    primaryButton: {
      text: 'Contactez-nous',
      url: '/contact',
    },
    secondaryButton: {
      text: 'Découvrir nos réalisations',
      url: '/realisations',
    },
  },
}