/**
 * Service d'envoi du formulaire de contact et devis B2B sécurisé
 * 
 * Lit l'URL d'envoi depuis la variable d'environnement VITE_CONTACT_ENDPOINT.
 * Supporte à la fois l'envoi JSON standard et l'envoi Multipart (avec fichier / cahier des charges).
 */

function sanitizeForTransport(str, maxLength = 1000) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<[^>]*>?/gm, '')
    .trim()
    .slice(0, maxLength)
}

export async function sendContact(rawFormData) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

  // Sécurisation défensive des champs
  const cleanData = {
    name: sanitizeForTransport(rawFormData?.name, 80),
    company: sanitizeForTransport(rawFormData?.company, 100),
    email: sanitizeForTransport(rawFormData?.email, 254).toLowerCase(),
    phone: sanitizeForTransport(rawFormData?.phone, 25),
    service: sanitizeForTransport(rawFormData?.service, 100),
    location: sanitizeForTransport(rawFormData?.location, 100),
    details: sanitizeForTransport(rawFormData?.details, 1500),
    fileName: rawFormData?.fileName || null,
    fileSize: rawFormData?.fileSize || null,
    timestamp: new Date().toISOString(),
  }

  // Cas : endpoint non encore configuré en production
  if (!endpoint || endpoint.trim() === '') {
    return {
      success: false,
      configured: false,
      message:
        "L'envoi en ligne n'est pas encore activé. Écrivez-nous à info@luciole-energy.com ou appelez le +225 07 07 23 73 53.",
    }
  }

  try {
    let response

    // Si un vrai fichier est joint, on utilise FormData pour le transfert multipart
    if (rawFormData?.file instanceof File) {
      const formData = new FormData()
      formData.append('name', cleanData.name)
      formData.append('company', cleanData.company)
      formData.append('email', cleanData.email)
      formData.append('phone', cleanData.phone)
      formData.append('service', cleanData.service)
      formData.append('location', cleanData.location)
      formData.append('details', cleanData.details)
      formData.append('fileName', cleanData.fileName || rawFormData.file.name)
      formData.append('fileSize', cleanData.fileSize || '')
      formData.append('document', rawFormData.file)

      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })
    } else {
      // Sinon, transmission JSON standard
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(cleanData),
      })
    }

    const data = await response.json().catch(() => ({}))

    if (response.ok && data.success !== false) {
      return {
        success: true,
        configured: true,
        message: data.message || 'Votre demande a été envoyée avec succès.',
      }
    } else {
      return {
        success: false,
        configured: true,
        message:
          data.message ||
          "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter au +225 07 07 23 73 53.",
      }
    }
  } catch (err) {
    return {
      success: false,
      configured: true,
      message:
        "Impossible de joindre le serveur. Vérifiez votre connexion Internet ou appelez le +225 07 07 23 73 53.",
    }
  }
}
