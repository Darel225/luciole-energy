// Données centralisées pour la page Contact et les coordonnées de l'entreprise
import contactHeroImg from '../assets/images/contact-hero.webp'

export const companyContact = {
  name: 'Luciole Energy',
  phone: {
    display: '+225 07 07 23 73 53',
    href: 'tel:+2250707237353',
    raw: '+2250707237353',
    label: 'Assistance technique & astreinte industrielle',
  },
  email: {
    display: 'info@luciole-energy.com',
    href: 'mailto:info@luciole-energy.com',
    label: 'Réponse garantie sous 48 heures ouvrées',
  },
  address: {
    city: 'Abidjan, Côte d\'Ivoire',
    street: 'Zone Industrielle de Yopougon, Batim 3 Rue S153',
    full: 'Abidjan, Yopougon Batim 3, Rue S153',
  },
  hours: {
    label: 'Horaires de bureau',
    schedule: 'Lundi - Vendredi : 08h00 - 18h00',
  },
  emergency: {
    label: 'Disponibilité intervention d\'urgence',
    badge: '24/7 Astreinte',
  },
}

export const contactPageData = {
  hero: {
    badge: 'Contact',
    title: 'Discutons de vos projets',
    titleDot: '.',
    description:
      'Une équipe d\'experts à votre écoute pour dimensionner, chiffrer et déployer vos infrastructures énergétiques en Côte d\'Ivoire.',
    breadcrumbs: [
      { label: 'Accueil', path: '/' },
      { label: 'Contact', path: '/contact' },
    ],
    image: contactHeroImg,
    imageAlt:
      'Deux responsables de Luciole Energy se serrant la main devant une installation solaire',
  },
  info: {
    label: 'Contactez-nous',
    title: 'Concrétisons vos ambitions énergétiques.',
    description:
      'Nos ingénieurs sont à votre disposition pour analyser vos infrastructures et vous proposer des solutions techniques sur-mesure en Côte d\'Ivoire et dans la sous-région.',
  },
  form: {
    cardTitle: 'Demande de devis & étude',
    cardSubtitle:
      'Remplissez les détails ci-dessous. Un ingénieur d\'affaires étudiera votre cahier des charges.',
    confidentiality:
      'Données protégées et traitées sous stricte confidentialité industrielle.',
    consent:
      'En envoyant ce formulaire, vous acceptez d\'être recontacté au sujet de votre demande.',
    buttonText: 'Demander une consultation',
    services: [
      { value: '', label: 'Sélectionnez votre domaine technique', disabled: true },
      { value: 'electricite-ht-bt', label: 'Électricité HT/BT' },
      { value: 'generateurs-secours', label: 'Générateurs de secours & Data Center' },
      { value: 'climatisation-froid', label: 'Climatisation, froid & plomberie' },
      { value: 'eclairage-public', label: 'Éclairage public' },
      { value: 'energies-renouvelables', label: 'Énergies renouvelables' },
      { value: 'autre', label: 'Autre demande' },
    ],
  },
}
