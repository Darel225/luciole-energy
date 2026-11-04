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
  X,
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
import { useDevisModal } from '../../context/DevisModalContext'
import { sendContact } from '../../services/sendContact'

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

export default function DevisRequestModal() {
  const { isOpen, closeDevisModal, initialData } = useDevisModal()
  const fileInputRef = useRef(null)
  const dropdownRef = useRef(null)

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
  })

  const [errors, setErrors] = useState({})

  // Réinitialisation à l'ouverture de la modale
  useEffect(() => {
    if (isOpen) {
      setForm({
        company: initialData?.company || initialData?.societe || '',
        name: initialData?.name || initialData?.nom || '',
        email: initialData?.email || '',
        phone: initialData?.phone || initialData?.telephone || '',
        service: initialData?.service || initialData?.defaultNeed || '',
        location: initialData?.location || initialData?.site || '',
        details: initialData?.details || '',
        file: null,
        fileName: '',
        fileSizeFormatted: '',
      })
      setErrors({})
      setSubmitStatus(null)
      setIsSuccess(false)
      setIsDropdownOpen(false)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setIsDropdownOpen(false)
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, initialData])

  // Fermer le dropdown en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Touche Échap pour fermer la modale
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeDevisModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeDevisModal])

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

  // Blocage strict des touches clavier interdites pour le téléphone
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

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()

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
      const el = document.getElementById(`modal-field-${firstError}`)
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
        message:
          'Une erreur inattendue est survenue. Veuillez nous joindre au +225 07 07 23 73 53.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="devis-modal-title"
    >
      {/* Fond obscurci avec flou */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeDevisModal}
        aria-hidden="true"
      />

      {/* Boîte Modale Principale */}
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* En-tête haut de gamme */}
        <div className="relative px-6 sm:px-8 pt-6 pb-5 border-b border-gray-100 bg-[#FAFBF9]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D1EADC] shadow-2xs mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--vert-accent)] shrink-0 animate-pulse" />
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--vert-principal)]">
              DEMANDE DE DEVIS & ÉTUDE B2B
            </span>
          </div>

          <h2
            id="devis-modal-title"
            className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--texte-titre)] tracking-tight"
          >
            Étude Technique & Chiffrage de Projet
          </h2>
          <p className="text-xs sm:text-[0.8125rem] text-[var(--gris-texte)] mt-1 leading-relaxed">
            Recevez une proposition technique et un chiffrage sur-mesure sous 24 à 48h ouvrées.
          </p>

          {/* Bouton Fermer */}
          <button
            type="button"
            onClick={closeDevisModal}
            aria-label="Fermer la fenêtre"
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-[var(--texte-titre)] hover:bg-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vert-accent)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* État de succès */}
        {isSuccess ? (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center my-auto">
            <div className="w-16 h-16 rounded-full bg-[var(--vert-pale)] text-[var(--vert-principal)] flex items-center justify-center mb-5 animate-in zoom-in-50 duration-300">
              <CheckCircle2 size={38} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--texte-titre)] mb-2">
              Demande d'étude transmise
            </h3>
            <p className="text-sm text-[var(--gris-texte)] max-w-md mx-auto mb-8 leading-relaxed">
              Merci pour votre confiance. Nos ingénieurs d'affaires étudient dès à présent vos spécifications techniques et vous contacteront sous 24 à 48 heures ouvrées.
            </p>
            <button
              type="button"
              onClick={closeDevisModal}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[var(--vert-principal)] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0B472C] transition-all cursor-pointer shadow-md shadow-[var(--vert-principal)]/20"
            >
              Fermer la fenêtre
            </button>
          </div>
        ) : (
          /* Formulaire défilable */
          <form onSubmit={handleSubmit} noValidate className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
            
            {/* Message d'erreur de transmission */}
            {submitStatus && (
              <div
                role="alert"
                className={`p-4 rounded-xl flex items-start gap-3 ${
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

            {/* SECTION 1 : ENTREPRISE & INTERLOCUTEUR */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1.5 border-b border-gray-100">
                <Building2 size={16} className="text-[var(--vert-principal)]" />
                <h3 className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--texte-titre)]">
                  1. Entreprise & Interlocuteur
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Société / Raison Sociale */}
                <div>
                  <label htmlFor="modal-field-company" className="block text-xs font-semibold text-gray-800 mb-1.5">
                    Société / Raison Sociale <span className="text-[var(--vert-accent)]">*</span>
                  </label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      id="modal-field-company"
                      required
                      placeholder="ex: SIFCA, CIE, Groupe Industriel..."
                      value={form.company}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, company: e.target.value }))
                        if (errors.company) setErrors((prev) => ({ ...prev, company: null }))
                      }}
                      className={`w-full h-11 pl-10 pr-3.5 text-xs bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--vert-accent)]/20 transition-all ${
                        errors.company ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-[var(--vert-accent)]'
                      }`}
                    />
                  </div>
                  {errors.company && <p className="text-[11px] text-red-600 mt-1">{errors.company}</p>}
                </div>

                {/* Nom du Contact Référent */}
                <div>
                  <label htmlFor="modal-field-name" className="block text-xs font-semibold text-gray-800 mb-1.5">
                    Nom du Contact Référent <span className="text-[var(--vert-accent)]">*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      id="modal-field-name"
                      required
                      placeholder="ex: Jean-Marc Kouassi"
                      value={form.name}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                        if (errors.name) setErrors((prev) => ({ ...prev, name: null }))
                      }}
                      className={`w-full h-11 pl-10 pr-3.5 text-xs bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--vert-accent)]/20 transition-all ${
                        errors.name ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-[var(--vert-accent)]'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                </div>

                {/* Email Professionnel */}
                <div>
                  <label htmlFor="modal-field-email" className="block text-xs font-semibold text-gray-800 mb-1.5">
                    Email Professionnel <span className="text-[var(--vert-accent)]">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="email"
                      id="modal-field-email"
                      required
                      placeholder="ex: jm.kouassi@entreprise.ci"
                      value={form.email}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, email: e.target.value }))
                        if (errors.email) setErrors((prev) => ({ ...prev, email: null }))
                      }}
                      className={`w-full h-11 pl-10 pr-3.5 text-xs bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--vert-accent)]/20 transition-all ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-[var(--vert-accent)]'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>

                {/* Téléphone Direct */}
                <div>
                  <label htmlFor="modal-field-phone" className="block text-xs font-semibold text-gray-800 mb-1.5">
                    Téléphone Direct <span className="text-[var(--vert-accent)]">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="tel"
                      id="modal-field-phone"
                      required
                      placeholder="ex: +225 07 07 23 73 53"
                      value={form.phone}
                      onKeyDown={handlePhoneKeyDown}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/[^0-9+\s().-]/g, '')
                        setForm((prev) => ({ ...prev, phone: cleaned }))
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }))
                      }}
                      className={`w-full h-11 pl-10 pr-3.5 text-xs bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--vert-accent)]/20 transition-all ${
                        errors.phone ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-[var(--vert-accent)]'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* SECTION 2 : NATURE DU BESOIN & SPÉCIFICATIONS */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1.5 border-b border-gray-100">
                <Layers size={16} className="text-[var(--vert-principal)]" />
                <h3 className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--texte-titre)]">
                  2. Nature du Besoin & Spécifications
                </h3>
              </div>

              {/* Domaine Technique avec menu déroulant + saisie personnalisée */}
              <div ref={dropdownRef} className="relative">
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Domaine Technique / Pôle d'Expertise <span className="text-[var(--vert-accent)]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="modal-field-service"
                    required
                    placeholder="Sélectionnez votre domaine technique"
                    value={form.service}
                    onFocus={() => setIsDropdownOpen(true)}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, service: e.target.value }))
                      if (errors.service) setErrors((prev) => ({ ...prev, service: null }))
                    }}
                    className={`w-full h-11 pl-3.5 pr-10 text-xs bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--vert-accent)]/20 transition-all ${
                      errors.service ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-[var(--vert-accent)]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                    title="Afficher les suggestions"
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[var(--vert-principal)]' : ''}`}
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
                {errors.service && <p className="text-[11px] text-red-600 mt-1">{errors.service}</p>}
              </div>

              {/* Site d'Intervention / Localité */}
              <div>
                <label htmlFor="modal-field-location" className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Site d'Intervention / Localité <span className="text-[var(--vert-accent)]">*</span>
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    id="modal-field-location"
                    required
                    placeholder="ex: Abidjan (Yopougon, Vridi), San Pedro, Bouaké, Site Minier..."
                    value={form.location}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, location: e.target.value }))
                      if (errors.location) setErrors((prev) => ({ ...prev, location: null }))
                    }}
                    className={`w-full h-11 pl-10 pr-3.5 text-xs bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--vert-accent)]/20 transition-all ${
                      errors.location ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-[var(--vert-accent)]'
                    }`}
                  />
                </div>
                {errors.location && <p className="text-[11px] text-red-600 mt-1">{errors.location}</p>}
              </div>

              {/* Détails techniques du besoin */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="modal-field-details" className="text-xs font-semibold text-gray-800">
                    Détails techniques du besoin <span className="text-gray-400 font-normal">(Optionnel)</span>
                  </label>
                  <span className="text-[11px] text-gray-400">
                    {form.details.length} / 1500
                  </span>
                </div>
                <textarea
                  id="modal-field-details"
                  rows={3}
                  maxLength={1500}
                  placeholder="Puissance estimée, type d'infrastructure, délais envisagés, contraintes d'exploitation..."
                  value={form.details}
                  onChange={(e) => setForm((prev) => ({ ...prev, details: e.target.value }))}
                  className="w-full p-3.5 text-xs bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[var(--vert-accent)] focus:ring-2 focus:ring-[var(--vert-accent)]/20 transition-all resize-y leading-relaxed"
                />
              </div>
            </div>

            {/* SECTION 3 : CAHIER DES CHARGES OU DOCUMENT TECHNIQUE */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-1.5 border-b border-gray-100">
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
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 ${
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

              {errors.file && <p className="text-[11px] text-red-600">{errors.file}</p>}

              {/* Reassurance confidentialité */}
              <div className="flex items-center gap-2 pt-1 text-gray-500">
                <ShieldCheck size={15} className="text-[var(--vert-accent)] shrink-0" />
                <span className="text-[11px]">
                  Vos documents restent strictement confidentiels et sont protégés par le secret professionnel.
                </span>
              </div>
            </div>

            {/* Pied d'action */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={closeDevisModal}
                className="px-4 py-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-xs font-semibold transition-colors cursor-pointer"
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--vert-principal)] hover:bg-[#0B472C] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-[var(--vert-principal)]/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Envoi en cours…</span>
                  </>
                ) : (
                  <>
                    <span>Demander mon étude personnalisée</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  )
}
