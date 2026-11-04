// Source unique de vérité pour les réalisations et projets de Luciole Energy
import lampadairesImg from '../assets/images/1 (2).webp'
import solaireImg from '../assets/images/1 (1).webp'
import tgbtImg from '../assets/images/1 (3).webp'

export const projects = [
  {
    id: 'lampadaires-solaires-mafere',
    num: '01',
    titre: 'Réseau de lampadaires solaires',
    categorie: 'Éclairage public / Solaire autonome',
    client: 'SAPH, Agro-industrie SIFCA',
    lieu: 'Maferé',
    locationLabel: 'SAPH · Maferé',
    descriptionCourte:
      'Fourniture et pose de lampadaires solaires pour un éclairage autonome, fiable et durable au sein d\'un centre de collecte.',
    descriptionLongue:
      'Déploiement d\'un réseau de lampadaires solaires haute performance assurant un éclairage autonome, sécurisé et durable pour le centre de collecte, indépendamment du réseau électrique.',
    tags: ['Éclairage autonome solaire', 'Centre de collecte'],
    image: lampadairesImg,
    alt: 'Techniciens Luciole Energy fixant un poteau de lampadaire solaire sur un site agro-industriel',
    objectPosition: 'center 40%',
    reverse: false,
    hasKeyHandoverBadge: false,
  },
  {
    id: 'solaire-photovoltaique-sassandra',
    num: '02',
    titre: 'Système solaire photovoltaïque de 8\u00A0kWc',
    categorie: 'Énergies renouvelables',
    client: 'SAPH, Agro-industrie SIFCA',
    lieu: 'Sassandra',
    locationLabel: 'SAPH · Sassandra',
    descriptionCourte:
      'Fourniture et installation d\'un système solaire photovoltaïque de 8\u00A0kWc pour l\'autonomie énergétique du site.',
    descriptionLongue:
      'Étude, fourniture et installation d\'une centrale solaire photovoltaïque de 8\u00A0kWc, conçue pour garantir l\'autonomie énergétique et l\'alimentation continue des infrastructures du site.',
    tags: ['8\u00A0kWc', 'Photovoltaïque', 'Livré clés en main'],
    image: solaireImg,
    alt: 'Panneaux solaires photovoltaïques installés sur le site de Sassandra',
    objectPosition: 'center',
    reverse: true,
    hasKeyHandoverBadge: true,
  },
  {
    id: 'maintenance-tgbt-olam',
    num: '03',
    titre: 'Maintenance & mise aux normes des cellules et TGBT',
    categorie: 'Ingénierie électrique / Maintenance',
    client: 'OLAM',
    lieu: 'Côte d\'Ivoire',
    locationLabel: 'OLAM · Côte d\'Ivoire',
    descriptionCourte:
      'Contrôle, vérification et remise en état des cellules et du TGBT pour un fonctionnement sûr et performant.',
    descriptionLongue:
      'Intervention technique sur les cellules et le TGBT incluant le contrôle, la vérification et la remise en état des équipements, afin de garantir un fonctionnement sûr, performant et sans coupure.',
    tags: ['Cellules HT/BT', 'TGBT', 'Mise aux normes'],
    image: tgbtImg,
    alt: 'Technicien Luciole Energy intervenant sur une armoire électrique et un TGBT',
    objectPosition: 'center 20%',
    reverse: false,
    hasKeyHandoverBadge: false,
  },
]
