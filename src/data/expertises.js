import heroImage from '../assets/images/hero-expertise.png'
import pole1Image from '../assets/images/expertise1.png'
import pole2Image from '../assets/images/expertise2.png'
import pole3Image from '../assets/images/expertise3.png'
import pole4Image from '../assets/images/expertise4.png'
import pole5Image from '../assets/images/expertise5.png'

export const expertisesPageData = {
  hero: {
    badge: 'Nos expertises',
    title: "L'énergie maîtrisée.\nLa performance garantie.",
    titleDot: '',
    description:
      "Des solutions d'ingénierie sur-mesure pour relever les défis complexes des industries et des infrastructures en Côte d'Ivoire.",
    image: heroImage,
    imageAlt: 'Ingénieurs Luciole Energy supervisant des installations électriques',
    breadcrumbs: [
      { label: 'Accueil', path: '/' },
      { label: 'Expertises', path: '/expertises' },
    ],
  },
  intro: {
    label: "Nos pôles d'expertise",
    title: "Cinq pôles, une énergie complète.",
    description:
      "De l'étude à la maintenance, Luciole Energy intervient sur toute la chaîne énergétique des sites industriels, tertiaires et des grands ouvrages.",
  },
  poles: [
    {
      id: '01',
      label: "Pôle d'expertise 01",
      title: "Ingénierie Électrique HT/BT",
      description:
        "Conception, dimensionnement, installation et déploiement de réseaux électriques haute et basse tension, adaptés aux exigences des infrastructures industrielles, minières et tertiaires. Nous assurons des solutions fiables et performantes, intégrant les équipements de distribution, les postes de transformation et les systèmes de protection pour garantir une alimentation électrique continue et sécurisée.",
      list: [
        { label: "Postes de transformation", mention: "HTA / BT" },
        { label: "Tableaux généraux (TGBT)", mention: "Norme IEC 61439" },
        { label: "Réseaux de distribution", mention: "Continu & sécurisé" },
      ],
      legend: "Infrastructure HT/BT · Sécurité opérationnelle",
      image: pole1Image,
      alt: "Techniciens Luciole Energy devant un poste de transformation haute tension",
      width: 1024,
      height: 1024,
      reverse: false,
      objectPosition: "center 40%",
    },
    {
      id: '02',
      label: "Pôle d'expertise 02",
      title: "Énergies Renouvelables & Solaire",
      description:
        "Accompagnement dans votre transition énergétique avec l'intégration de centrales solaires photovoltaïques et de systèmes de stockage.",
      list: [
        { label: "Centrales solaires B2B", mention: "Sol / Toiture" },
        { label: "Stockage d'énergie", mention: "BESS hybride" },
        { label: "Audit d'efficacité énergétique", mention: "ISO 50001" },
      ],
      legend: "Transition énergétique · Autonomie industrielle",
      image: pole2Image,
      alt: "Centrale solaire photovoltaïque au coucher du soleil",
      width: 388,
      height: 256,
      reverse: true,
      objectPosition: "center center",
    },
    {
      id: '03',
      label: "Pôle d'expertise 03",
      title: "Climatisation & Froid Industriel",
      description:
        "Conception, installation et maintenance de systèmes de climatisation centralisée et de froid industriel pour garantir la fiabilité de vos process.",
      list: [
        { label: "Systèmes HVAC & VRV", mention: "Tertiaire & industrie" },
        { label: "Chambres froides", mention: "Positives & négatives" },
        { label: "Contrôle hygrométrique", mention: "Process précision" },
      ],
      legend: "Génie climatique · Froid de process",
      image: pole3Image,
      alt: "Installation de froid industriel et de climatisation sur un site industriel",
      width: 1200,
      height: 896,
      reverse: false,
      objectPosition: "center center",
    },
    {
      id: '04',
      label: "Pôle d'expertise 04",
      title: "Énergie de Secours & Groupes Électrogènes",
      description:
        "Déploiement de solutions de secours fiables avec des groupes électrogènes haute capacité pour assurer la continuité de service.",
      list: [
        { label: "Dimensionnement & Installation", mention: "Toutes puissances" },
        { label: "Inverseurs de source", mention: "Commutation auto" },
        { label: "Maintenance préventive", mention: "Contrats 24/7 B2B" },
      ],
      legend: "Continuité critique · Data centers & usines",
      image: pole4Image,
      alt: "Équipements de secours électrique et groupes électrogènes sur site",
      width: 1200,
      height: 896,
      reverse: true,
      objectPosition: "center 40%",
    },
    {
      id: '05',
      label: "Pôle d'expertise 05",
      title: "Éclairage Public & Infrastructures",
      description:
        "Solutions d'éclairage performantes et durables pour les espaces publics et industriels, alliant sécurité et efficacité énergétique.",
      list: [
        { label: "Réseaux d'éclairage LED", mention: "Haute efficacité" },
        { label: "Infrastructures souterraines", mention: "Voiries & sites" },
        { label: "Éclairage solaire autonome", mention: "Hybride · Smart sensors" },
      ],
      legend: "Éclairage intelligent · Infrastructures",
      image: pole5Image,
      alt: "Éclairage public solaire le long d'une avenue à Abidjan",
      width: 1200,
      height: 896,
      reverse: false,
      objectPosition: "center center",
    },
  ],
};
