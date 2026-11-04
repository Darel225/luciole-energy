import { useRef } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { companyContact, contactPageData } from '../../data/contact'
import { useReveal, useCardReveal } from '../../hooks/useReveal'

function CoordItem({ icon: Icon, delay = 0, title, main, sub, href }) {
  const itemRef = useRef(null)
  const { isVisible, isDone } = useCardReveal(itemRef, delay)

  return (
    <div
      ref={itemRef}
      style={{ '--delay': `${delay}ms` }}
      className={`contact-coord-item flex items-start gap-4 ${
        isVisible ? 'is-visible' : ''
      } ${isDone ? 'is-done' : ''}`}
    >
      <div
        className="contact-coord-icon-box w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0 select-none"
        style={{ backgroundColor: 'var(--vert-pale)' }}
        aria-hidden="true"
      >
        <Icon size={18} style={{ color: 'var(--vert-accent)' }} />
      </div>
      <div className="flex flex-col">
        <span
          className="contact-coord-line-1 uppercase tracking-wider text-[var(--gris-texte)] font-semibold mb-0.5"
          style={{ fontSize: 'var(--fs-micro)' }}
        >
          {title}
        </span>
        {href ? (
          <a
            href={href}
            className="contact-coord-line-2 contact-coord-link font-semibold text-[var(--texte-titre)] hover:text-[var(--vert-accent)] leading-snug transition-colors duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vert-accent)] rounded w-fit relative inline-block"
            style={{ fontSize: '1rem' }}
          >
            <span>{main}</span>
            <span className="contact-coord-underline" aria-hidden="true" />
          </a>
        ) : (
          <span
            className="contact-coord-line-2 font-semibold text-[var(--texte-titre)] leading-snug"
            style={{ fontSize: '1rem' }}
          >
            {main}
          </span>
        )}
        <span
          className="contact-coord-line-3 text-[var(--gris-texte)] leading-tight mt-0.5"
          style={{ fontSize: 'var(--fs-small)' }}
        >
          {sub}
        </span>
      </div>
    </div>
  )
}

export default function ContactInfo() {
  const { info } = contactPageData
  const { phone, email, address, hours, emergency } = companyContact

  const headerRef = useRef(null)
  const isHeaderVisible = useReveal(headerRef, { threshold: 0.15 })

  const footerRef = useRef(null)
  const isFooterVisible = useReveal(footerRef, { threshold: 0.15 })

  const emergencyRef = useRef(null)
  const { isVisible: isEmergencyVisible, isDone: isEmergencyDone } = useCardReveal(emergencyRef, 360)

  return (
    <div className="w-full lg:sticky lg:top-[104px]">
      {/* 1. En-tête coordonnées (stagger 90ms, observé sans clip-path) */}
      <div ref={headerRef} className="contact-info-header">
        {/* 1. Étiquette de section sans pastille */}
        <p
          className={`contact-info-label ${
            isHeaderVisible ? 'is-visible' : ''
          } font-semibold uppercase text-[var(--vert-accent)] mb-3`}
          style={{
            fontSize: 'var(--fs-label)',
            letterSpacing: '0.22em',
          }}
        >
          {info.label}
        </p>

        {/* 2. Titre H2 monochrome en un seul bloc */}
        <h2
          id="contact-info-title"
          className={`contact-info-h2 ${
            isHeaderVisible ? 'is-visible' : ''
          } font-bold tracking-tight text-[var(--texte-titre)] mb-0`}
          style={{
            fontSize: 'var(--fs-h2)',
            lineHeight: 1.22,
            textWrap: 'balance',
          }}
        >
          {info.title}
        </h2>

        {/* 3. Trait d'accent vert signature (40px x 3px) */}
        <div
          className={`contact-info-line ${
            isHeaderVisible ? 'is-visible' : ''
          } h-[3px] rounded-[2px]`}
          style={{
            width: '40px',
            backgroundColor: 'var(--vert-accent)',
            margin: '18px 0 22px 0',
          }}
          aria-hidden="true"
        />

        {/* 4. Paragraphe descriptif */}
        <p
          className={`contact-info-p ${
            isHeaderVisible ? 'is-visible' : ''
          } font-normal text-[var(--gris-texte)] max-w-[520px] mb-7`}
          style={{
            fontSize: 'var(--fs-body)',
            lineHeight: 1.7,
          }}
        >
          {info.description}
        </p>
      </div>

      {/* 5. Blocs de coordonnées (chacun observé individuellement, stagger 140ms) */}
      <address className="not-italic space-y-5 mb-7">
        <CoordItem
          icon={MapPin}
          delay={0}
          title={address.title || 'Siège opérationnel'}
          main={address.city}
          sub={address.street}
        />
        <CoordItem
          icon={Phone}
          delay={140}
          title="Ligne directe & bureau d'études"
          main={phone.display}
          sub={phone.label}
          href={phone.href}
        />
        <CoordItem
          icon={Mail}
          delay={280}
          title="Courriel officiel"
          main={email.display}
          sub={email.label}
          href={email.href}
        />
      </address>

      {/* 6 & 7. Séparateur et Horaires */}
      <div ref={footerRef}>
        {/* 6. Séparateur fin 1px */}
        <div
          className={`contact-sep-line ${
            isFooterVisible ? 'is-visible' : ''
          } border-t border-[var(--gris-bordure)] my-6`}
          aria-hidden="true"
        />

        {/* 7. Ligne d'horaires */}
        <div
          className={`contact-hours ${
            isFooterVisible ? 'is-visible' : ''
          } flex items-center gap-2.5 text-[var(--gris-texte)] mb-5`}
        >
          <Clock size={16} style={{ color: 'var(--vert-accent)' }} className="shrink-0" aria-hidden="true" />
          <span style={{ fontSize: 'var(--fs-small)' }}>{hours.label} : </span>
          <span
            className="font-semibold text-[var(--texte-titre)]"
            style={{ fontSize: 'var(--fs-small)' }}
          >
            {hours.schedule}
          </span>
        </div>
      </div>

      {/* 8. Carte d'urgence avec point vert et onde unique discrète */}
      <div
        ref={emergencyRef}
        className={`contact-emergency-card ${
          isEmergencyVisible ? 'is-visible' : ''
        } ${isEmergencyDone ? 'is-done' : ''} bg-[var(--gris-fond)] border border-[var(--gris-bordure)] rounded-[12px] p-[14px_18px] flex flex-wrap sm:flex-nowrap items-center justify-between gap-3`}
      >
        <div className="flex items-center gap-2.5">
          <div className="contact-emergency-dot-wrap relative flex items-center justify-center shrink-0">
            <span className="contact-emergency-ring" aria-hidden="true" />
            <span
              className="contact-emergency-dot w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: 'var(--vert-accent)' }}
              aria-hidden="true"
            />
          </div>
          <span
            className="font-medium text-[var(--texte-titre)]"
            style={{ fontSize: 'var(--fs-small)' }}
          >
            {emergency.label}
          </span>
        </div>

        <span
          className="font-semibold rounded-[6px] px-2.5 py-1 uppercase tracking-wider shrink-0"
          style={{
            backgroundColor: 'var(--vert-pale)',
            color: 'var(--vert-principal)',
            fontSize: 'var(--fs-micro)',
          }}
        >
          {emergency.badge}
        </span>
      </div>
    </div>
  )
}
