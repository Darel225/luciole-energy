export default function ProjectsIntro() {
  return (
    <div className="max-w-3xl">
      {/* Étiquette simple sans pastille, --fs-label, vert accent, mb-3 */}
      <p
        className="font-semibold uppercase text-[var(--vert-accent)] mb-3"
        style={{
          fontSize: 'var(--fs-label)',
          letterSpacing: '0.22em',
        }}
      >
        Projets emblématiques · Côte d'Ivoire
      </p>

      {/* H2 : une seule couleur, text-wrap: balance */}
      <h2
        id="intro-realisations-title"
        className="font-bold tracking-tight text-[var(--texte-titre)] mb-0"
        style={{
          fontSize: 'var(--fs-h2)',
          lineHeight: 1.25,
          textWrap: 'balance',
        }}
      >
        L'excellence technique sur le terrain
      </h2>

      {/* Trait d'accent vert signature : 40px x 3px, rayon 2px, margin 18px 0 22px */}
      <div
        className="h-[3px] rounded-[2px]"
        style={{
          width: '40px',
          backgroundColor: 'var(--vert-accent)',
          margin: '18px 0 22px 0',
        }}
        aria-hidden="true"
      />

      {/* Paragraphe descriptif : max-w 600px, --fs-body, gris-texte */}
      <p
        className="font-normal text-[var(--gris-texte)] max-w-[600px] mb-0"
        style={{
          fontSize: 'var(--fs-body)',
          lineHeight: 1.7,
        }}
      >
        Découvrez nos déploiements industriels d'envergure livrés clés en main à travers les grands pôles économiques ivoiriens.
      </p>
    </div>
  )
}
