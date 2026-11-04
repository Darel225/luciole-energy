import { useState, useRef, useEffect } from 'react'
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Layers,
  Paperclip,
  FileText,
  Loader2,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Check,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  Trash2,
} from 'lucide-react'
import { contactPageData } from '../../data/contact'
import { sendContact } from '../../services/sendContact'
import { useCardReveal } from '../../hooks/useReveal'

const DOMAINES_OPTIONS = [
  'Ingénierie Électrique HT/BT',
  'Générateurs de secours & Alimentation Secourue',
  'Climatisation, Froid Industriel & Plomberie',
  'Éclairage Public & Électrification Rurale',
  'Énergies Renouvelables & Systèmes Solaires',
  'Audit Énergétique & Maintenance Industrielle',
  'Autre projet ou étude spécifique',
]

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024 // 25 Mo

function sanitizeString(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<[^>]*>?/gm, '')
    .trim()
}

export default function ContactForm() {
  const { form: formMeta } = contactPageData
  const cardRef = useRef(null)
  const fileInputRef = useRef(null)
  const dropdownRef = useRef(null)

  // Révélation de la carte avec démarrage légèrement décalé (200ms)
  const { isVisible: isCardVisible, isDone: isCardDone } = useCardReveal(cardRef, 200)
  const [isPulsed, setIsPulsed] = useState(false)

  // Filet de sécurité 2000ms
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current && !cardRef.current.classList.contains('is-visible')) {
        cardRef.current.classList.add('is-visible')
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Halo vert unique sur le bouton 600ms après son entrée (sans boucle)
  useEffect(() => {
    if (isCardVisible && !isPulsed) {
      const timer = setTimeout(() => {
        setIsPulsed(true)
      }, 1880)
      return () => clearTimeout(timer)
    }
  }, [isCardVisible, isPulsed])

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const [form, setForm] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    details: '',
    file: null,
    fileName: '',
    fileSizeFormatted: '',
    website: '',
  })

  const [errors, setErrors] = useState({})
  const [mountTime] = useState(() => Date.now())

  // Gestion du fichier joint
  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setErrors((prev) => ({
        ...prev,
        file: 'Le fichier dépasse la taille maximale autorisée de 25 Mo.',
      }))
      return
    }

    const sizeInMo = (selectedFile.size / (1024 * 1024)).toFixed(1)
    const formattedSize =
      selectedFile.size < 1024 * 1024
        ? `${Math.round(selectedFile.size / 1024)} Ko`
        : `${sizeInMo} Mo`

    setForm((prev) => ({
      ...prev,
      file: selectedFile,
      fileName: selectedFile.name,
      fileSizeFormatted: formattedSize,
    }))
    setErrors((prev) => ({ ...prev, file: null }))
  }

  const handleRemoveFile = (e) => {
    e.stopPropagation()
    setForm((prev) => ({
      ...prev,
      file: null,
      fileName: '',
      fileSizeFormatted: '',
    }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Blocage strict des touches clavier non-téléphoniques
  const handlePhoneKeyDown = (e) => {
    const allowed = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Enter',
      'Home',
      'End',
    ]
    if (allowed.includes(e.key) || e.ctrlKey || e.metaKey) return
    if (!/[0-9+\s().-]/.test(e.key)) {
      e.preventDefault()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Protection anti-bot
    if (Date.now() - mountTime < 1200) {
      setIsSuccess(true)
      return
    }

    // Protection Honeypot
    if (form.website && form.website.trim() !== '') {
      setIsSuccess(true)
      return
    }

    const newErrors = {}
    if (!form.company.trim()) newErrors.company = 'La société ou raison sociale est obligatoire.'
    if (!form.name.trim()) newErrors.name = 'Le nom du contact référent est obligatoire.'
    if (!form.email.trim()) {
      newErrors.email = "L'email professionnel est obligatoire."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Format d'email professionnel invalide."
    }
    const phoneDigits = (form.phone || '').replace(/\D/g, '')
    if (!form.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone direct est obligatoire.'
    } else if (phoneDigits.length < 8) {
      newErrors.phone = 'Le numéro doit comporter au moins 8 chiffres valides.'
    }
    if (!form.service.trim()) {
      newErrors.service = 'Veuillez sélectionner un domaine technique.'
    }
    if (!form.location.trim()) {
      newErrors.location = "Le site d'intervention ou la localité est obligatoire."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      const firstError = Object.keys(newErrors)[0]
      const el = document.getElementById(`field-${firstError}`)
      if (el) el.focus()
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const payload = {
        company: sanitizeString(form.company),
        name: sanitizeString(form.name),
        email: sanitizeString(form.email).toLowerCase(),
        phone: sanitizeString(form.phone),
        service: sanitizeString(form.service),
        location: sanitizeString(form.location),
        details: sanitizeString(form.details),
        file: form.file,
        fileName: form.fileName,
        fileSize: form.fileSizeFormatted,
      }

      const res = await sendContact(payload)

      if (res.success) {
        setIsSuccess(true)
      } else {
        setSubmitStatus({
          type: res.configured === false ? 'unconfigured' : 'error',
          message: res.message,
        })
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Une erreur est survenue lors de l’envoi. Veuillez réessayer ou nous contacter au +225 07 07 23 73 53.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setForm({
      company: '',
      name: '',
      email: '',
      phone: '',
      service: '',
      location: '',
      details: '',
      file: null,
      fileName: '',
      fileSizeFormatted: '',
      website: '',
    })
    setErrors({})
    setSubmitStatus(null)
    setIsSuccess(false)
  }

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-200/50 contact-form-card ${
        isCardVisible ? 'is-visible' : ''
      } ${isCardDone ? 'is-done' : ''}`}
    >
      {isSuccess ? (
        /* État de succès : CheckCircle + textes avec animations sobres */
        <div className="py-10 text-center flex flex-col items-center justify-center">
          <div className="contact-success-icon w-16 h-16 rounded-full bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center mb-5">
            <CheckCircle2 size={38} />
          </div>
          <h2 className="contact-success-title text-xl sm:text-2xl font-bold text-[var(--texte-titre)] mb-2">
            Demande d'étude transmise
          </h2>
          <p className="contact-success-p text-sm text-[var(--gris-texte)] max-w-md mx-auto mb-8 leading-relaxed">
            Merci. Un ingénieur d'affaires Luciole Energy étudiera votre cahier des charges et vous recontactera sous 24 à 48 heures ouvrées.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-[var(--vert-principal)] text-[var(--vert-principal)] text-xs font-bold uppercase tracking-wider hover:bg-[var(--vert-pale)] transition-colors cursor-pointer"
          >
            Envoyer une autre demande
          </button>
        </div>
      ) : (
        <>
          {/* En-tête de la carte */}
          <div className="mb-6 pb-5 border-b border-gray-100">
            <div className="contact-form-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFBF9] border border-[#D1EADC] shadow-2xs mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--vert-accent)] shrink-0 animate-pulse" />
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--vert-principal)]">
                FORMULAIRE DE DEVIS & ÉTUDE B2B
              </span>
            </div>
            <h2 className="contact-form-title text-xl sm:text-2xl font-bold text-[var(--texte-titre)] tracking-tight">
              {formMeta.cardTitle}
            </h2>
            <p className="contact-form-subtitle text-xs sm:text-[0.8125rem] text-[var(--gris-texte)] mt-1 leading-relaxed">
              {formMeta.cardSubtitle}
            </p>
          </div>

          {/* Statut d'erreur si échec */}
          {submitStatus && (
            <div
              role="alert"
              className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                submitStatus.type === 'error'
                  ? 'bg-red-50 text-[#C0392B] border border-red-200'
                  : 'bg-amber-50/80 text-amber-900 border border-amber-200/80'
              }`}
              style={{ fontSize: 'var(--fs-small)' }}
            >
              <AlertCircle size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
              <p className="leading-relaxed">{submitStatus.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Honeypot */}
            <div className="absolute -left-[9999px] -top-[9999px]" aria-hidden="true" tabIndex={-1}>
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* SECTION 1 : ENTREPRISE & INTERLOCUTEUR */}
            <div className="space-y-4">
              <div
                className="contact-form-sec-title flex items-center gap-2 pb-1.5 border-b border-gray-100"
                style={{ '--sec-delay': '680ms' }}
              >
                <Building2 size={16} className="text-[var(--vert-principal)]" />
                <h3 className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--texte-titre)]">
                  1. Entreprise & Interlocuteur
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Société / Raison Sociale */}
                <div className="contact-field-group contact-form-row-1">
                  <label htmlFor="field-company" className="contact-form-label block text-xs font-semibold text-gray-800 mb-1.5 transition-colors duration-250">
                    Société / Raison Sociale <span className="text-[var(--vert-accent)]">*</span>
                  </label>
                  <div className="contact-form-field relative">
                    <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      id="field-company"
                      required
                      placeholder="ex: SIFCA, CIE, Groupe Industriel..."
                      value={form.company}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, company: e.target.value }))
                        if (errors.company) setErrors((prev) => ({ ...prev, company: null }))
                      }}
                      className={`contact-field-input w-full h-11 pl-10 pr-3.5 text-xs bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                        errors.company ? 'border-red-500 bg-red-50/20 input-error-shake' : 'border-gray-200'
                      }`}
                      aria-invalid={errors.company ? 'true' : 'false'}
                      aria-describedby={errors.company ? 'error-company' : undefined}
                    />
                  </div>
                  {errors.company && (
                    <p id="error-company" role="alert" className="contact-field-error text-[11px] text-red-600 mt-1">
                      {errors.company}
                    </p>
                  )}
                </div>

                {/* Nom du Contact Référent */}
                <div className="contact-field-group contact-form-row-1">
                  <label htmlFor="field-name" className="contact-form-label block text-xs font-semibold text-gray-800 mb-1.5 transition-colors duration-250">
                    Nom du Contact Référent <span className="text-[var(--vert-accent)]">*</span>
                  </label>
                  <div className="contact-form-field relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      id="field-name"
                      required
                      placeholder="ex: Jean-Marc Kouassi"
                      value={form.name}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                        if (errors.name) setErrors((prev) => ({ ...prev, name: null }))
                      }}
                      className={`contact-field-input w-full h-11 pl-10 pr-3.5 text-xs bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                        errors.name ? 'border-red-500 bg-red-50/20 input-error-shake' : 'border-gray-200'
                      }`}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'error-name' : undefined}
                    />
                  </div>
                  {errors.name && (
                    <p id="error-name" role="alert" className="contact-field-error text-[11px] text-red-600 mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Professionnel */}
                <div className="contact-field-group contact-form-row-2">
                  <label htmlFor="field-email" className="contact-form-label block text-xs font-semibold text-gray-800 mb-1.5 transition-colors duration-250">
                    Email Professionnel <span className="text-[var(--vert-accent)]">*</span>
                  </label>
                  <div className="contact-form-field relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="email"
                      id="field-email"
                      required
                      placeholder="ex: jm.kouassi@entreprise.ci"
                      value={form.email}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, email: e.target.value }))
                        if (errors.email) setErrors((prev) => ({ ...prev, email: null }))
                      }}
                      className={`contact-field-input w-full h-11 pl-10 pr-3.5 text-xs bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                        errors.email ? 'border-red-500 bg-red-50/20 input-error-shake' : 'border-gray-200'
                      }`}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="error-email" role="alert" className="contact-field-error text-[11px] text-red-600 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Téléphone Direct */}
                <div className="contact-field-group contact-form-row-2">
                  <label htmlFor="field-phone" className="contact-form-label block text-xs font-semibold text-gray-800 mb-1.5 transition-colors duration-250">
                    Téléphone Direct <span className="text-[var(--vert-accent)]">*</span>
                  </label>
                  <div className="contact-form-field relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="tel"
                      id="field-phone"
                      required
                      placeholder="ex: +225 07 07 23 73 53"
                      value={form.phone}
                      onKeyDown={handlePhoneKeyDown}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/[^0-9+\s().-]/g, '')
                        setForm((prev) => ({ ...prev, phone: cleaned }))
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }))
                      }}
                      className={`contact-field-input w-full h-11 pl-10 pr-3.5 text-xs bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                        errors.phone ? 'border-red-500 bg-red-50/20 input-error-shake' : 'border-gray-200'
                      }`}
                      aria-invalid={errors.phone ? 'true' : 'false'}
                      aria-describedby={errors.phone ? 'error-phone' : undefined}
                    />
                  </div>
                  {errors.phone && (
                    <p id="error-phone" role="alert" className="contact-field-error text-[11px] text-red-600 mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2 : NATURE DU BESOIN & SPÉCIFICATIONS */}
            <div className="space-y-4">
              <div
                className="contact-form-sec-title flex items-center gap-2 pb-1.5 border-b border-gray-100"
                style={{ '--sec-delay': '860ms' }}
              >
                <Layers size={16} className="text-[var(--vert-principal)]" />
                <h3 className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--texte-titre)]">
                  2. Nature du Besoin & Spécifications
                </h3>
              </div>

              {/* Domaine Technique avec menu déroulant + saisie personnalisée */}
              <div ref={dropdownRef} className="contact-field-group contact-form-row-3 relative">
                <label className="contact-form-label block text-xs font-semibold text-gray-800 mb-1.5 transition-colors duration-250">
                  Domaine Technique / Pôle d'Expertise <span className="text-[var(--vert-accent)]">*</span>
                </label>
                <div className="contact-form-field relative">
                  <input
                    type="text"
                    id="field-service"
                    required
                    placeholder="Sélectionnez votre domaine technique"
                    value={form.service}
                    onFocus={() => setIsDropdownOpen(true)}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, service: e.target.value }))
                      if (errors.service) setErrors((prev) => ({ ...prev, service: null }))
                    }}
                    className={`contact-field-input w-full h-11 pl-3.5 pr-10 text-xs bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                      errors.service ? 'border-red-500 bg-red-50/20 input-error-shake' : 'border-gray-200'
                    }`}
                    aria-invalid={errors.service ? 'true' : 'false'}
                    aria-describedby={errors.service ? 'error-service' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                    title="Afficher les suggestions"
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-250 ${isDropdownOpen ? 'rotate-180 text-[var(--vert-principal)]' : ''}`}
                    />
                  </button>

                  {/* Suggestions déroulantes */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden py-1.5 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                        Pôles d'intervention Luciole Energy :
                      </div>
                      {DOMAINES_OPTIONS.map((opt) => {
                        const isSelected = form.service === opt
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setForm((prev) => ({ ...prev, service: opt }))
                              if (errors.service) setErrors((prev) => ({ ...prev, service: null }))
                              setIsDropdownOpen(false)
                            }}
                            className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-50 text-[var(--vert-principal)] font-semibold'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <Check size={14} className="text-[var(--vert-principal)] shrink-0" />}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
                {errors.service && (
                  <p id="error-service" role="alert" className="contact-field-error text-[11px] text-red-600 mt-1">
                    {errors.service}
                  </p>
                )}
              </div>

              {/* Site d'Intervention / Localité */}
              <div className="contact-field-group contact-form-row-4">
                <label htmlFor="field-location" className="contact-form-label block text-xs font-semibold text-gray-800 mb-1.5 transition-colors duration-250">
                  Site d'Intervention / Localité <span className="text-[var(--vert-accent)]">*</span>
                </label>
                <div className="contact-form-field relative">
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    id="field-location"
                    required
                    placeholder="ex: Abidjan (Yopougon, Vridi), San Pedro, Bouaké, Site Minier..."
                    value={form.location}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, location: e.target.value }))
                      if (errors.location) setErrors((prev) => ({ ...prev, location: null }))
                    }}
                    className={`contact-field-input w-full h-11 pl-10 pr-3.5 text-xs bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                      errors.location ? 'border-red-500 bg-red-50/20 input-error-shake' : 'border-gray-200'
                    }`}
                    aria-invalid={errors.location ? 'true' : 'false'}
                    aria-describedby={errors.location ? 'error-location' : undefined}
                  />
                </div>
                {errors.location && (
                  <p id="error-location" role="alert" className="contact-field-error text-[11px] text-red-600 mt-1">
                    {errors.location}
                  </p>
                )}
              </div>

              {/* Détails techniques du besoin */}
              <div className="contact-field-group contact-form-row-5">
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="field-details" className="contact-form-label text-xs font-semibold text-gray-800 transition-colors duration-250">
                    Détails techniques du besoin <span className="text-gray-400 font-normal">(Optionnel)</span>
                  </label>
                  <span className="text-[11px] text-gray-400">
                    {form.details.length} / 1500
                  </span>
                </div>
                <div className="contact-form-field">
                  <textarea
                    id="field-details"
                    rows={4}
                    maxLength={1500}
                    placeholder="Puissance estimée, type d'infrastructure, délais envisagés, contraintes d'exploitation..."
                    value={form.details}
                    onChange={(e) => setForm((prev) => ({ ...prev, details: e.target.value }))}
                    className="contact-field-input w-full p-3.5 text-xs bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all resize-y leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3 : CAHIER DES CHARGES OU DOCUMENT TECHNIQUE */}
            <div className="space-y-3">
              <div
                className="contact-form-sec-title flex items-center gap-2 pb-1.5 border-b border-gray-100"
                style={{ '--sec-delay': '1120ms' }}
              >
                <Paperclip size={16} className="text-[var(--vert-principal)]" />
                <h3 className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--texte-titre)]">
                  3. Cahier des Charges ou Document Technique (Optionnel)
                </h3>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg,.png,.jpg,.jpeg"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
                className="sr-only"
              />

              <div className="contact-form-field contact-form-field-upload">
                {form.fileName ? (
                  /* Fichier sélectionné */
                  <div className="flex items-center justify-between p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 rounded-lg bg-white border border-emerald-200 flex items-center justify-center shrink-0 text-[var(--vert-principal)]">
                        <FileText size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">{form.fileName}</p>
                        <p className="text-[11px] text-gray-500">{form.fileSizeFormatted}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer rounded-lg hover:bg-white"
                      title="Supprimer ce fichier"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  /* Zone glisser-déposer */
                  <div
                    onDragOver={(e) => {
                      e.preventDefault()
                      setIsDragging(true)
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setIsDragging(false)
                      handleFileSelect(e.dataTransfer.files?.[0])
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
                      isDragging
                        ? 'border-[var(--vert-principal)] bg-emerald-50/50'
                        : 'border-gray-200 hover:border-[var(--vert-accent)] hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2 text-gray-500">
                      <UploadCloud size={20} />
                    </div>
                    <p className="text-xs font-semibold text-gray-800">
                      Glissez-déposez votre document technique ou <span className="text-[var(--vert-principal)] underline">cliquez pour parcourir</span>
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Excel, PDF, Word, DWG max 25 Mo
                    </p>
                  </div>
                )}
              </div>

              {errors.file && (
                <p role="alert" className="contact-field-error text-[11px] text-red-600">
                  {errors.file}
                </p>
              )}

              {/* Reassurance confidentialité */}
              <div className="flex items-center gap-2 pt-1 text-gray-500">
                <ShieldCheck size={15} className="contact-confidentiality-shield text-[var(--vert-accent)] shrink-0" />
                <span className="contact-confidentiality-text text-[11px]">
                  Vos documents restent strictement confidentiels et sont protégés par le secret professionnel.
                </span>
              </div>
            </div>

            {/* Bouton de soumission */}
            <div className="pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`contact-submit-btn w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--vert-principal)] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[var(--vert-principal)]/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                  isPulsed ? 'is-pulsed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span className="transition-opacity duration-200">Transmission en cours…</span>
                  </>
                ) : (
                  <>
                    <span>Demander une consultation & devis</span>
                    <ArrowRight size={15} className="contact-submit-arrow" />
                  </>
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
