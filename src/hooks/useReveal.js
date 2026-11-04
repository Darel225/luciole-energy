import { useState, useEffect, useRef } from 'react'

/**
 * useReveal
 * Déclenche l'activation des animations une seule fois lorsque l'élément entre dans le viewport.
 * Gère immédiatement les éléments déjà dans ou au-dessus du viewport.
 * Inclut un filet de sécurité global (fallback après 2s) pour garantir qu'aucun élément ne reste invisible.
 * Respecte prefers-reduced-motion et gère l'absence d'IntersectionObserver.
 */
export function useReveal(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const element = ref?.current

    const trigger = () => {
      if (hasTriggered.current) return
      hasTriggered.current = true
      setIsVisible(true)
      if (element) {
        element.classList.add('is-visible')
        element.querySelectorAll('.reveal, .reveal--fade, .reveal--clip-up, .reveal--clip-left, .reveal--scale-img, .reveal--line, .reveal--line-center, .reveal--line-y, .check-pop, .media, .media__clip-up, .media__clip-left, .media__badge, .cta-primary-btn, .cta-secondary-btn').forEach((el) => {
          el.classList.add('is-visible')
        })
      }
    }

    // 1. Accessibilité : prefers-reduced-motion -> affichage immédiat
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      trigger()
      return
    }

    // 2. Absence d'IntersectionObserver (fallback navigateur ancien)
    if (!('IntersectionObserver' in window)) {
      trigger()
      return
    }

    if (!element) return

    // 3. Gestion immédiate si déjà visible ou au-dessus du viewport (rechargement / ancre)
    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      trigger()
      return
    }
    if (rect.bottom <= 0) {
      // Déjà dépassé par le scroll
      trigger()
      return
    }

    // 4. Observer classique déclenché une seule fois
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger()
          observer.unobserve(element)
          observer.disconnect()
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      }
    )

    observer.observe(element)

    // 5. Filet de sécurité 2000ms : force .is-visible si l'élément est dans la zone visible
    const safetyTimer = setTimeout(() => {
      if (!hasTriggered.current && element) {
        const r = element.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) {
          trigger()
          observer.disconnect()
        }
      }
    }, 2000)

    // 6. Écouteur de scroll passif léger en secours pour les défilements ultra-rapides
    const handleScrollCheck = () => {
      if (!hasTriggered.current && element) {
        const r = element.getBoundingClientRect()
        if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
          trigger()
          observer.disconnect()
          window.removeEventListener('scroll', handleScrollCheck)
        }
      }
    }
    window.addEventListener('scroll', handleScrollCheck, { passive: true })

    return () => {
      observer.disconnect()
      clearTimeout(safetyTimer)
      window.removeEventListener('scroll', handleScrollCheck)
    }
  }, [ref, options.threshold, options.rootMargin])

  return isVisible
}

/**
 * useCardReveal
 * Observer individuel pour chaque carte ou élément répété (cascade naturelle + hover fluide).
 * Active la carte à l'intersection et marque isDone après la fin de la transition d'entrée.
 */
export function useCardReveal(ref, delay = 0) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const element = ref?.current

    const trigger = () => {
      if (hasTriggered.current) return
      hasTriggered.current = true
      setIsVisible(true)
      setTimeout(() => {
        setIsDone(true)
      }, delay + 950)
    }

    // prefers-reduced-motion ou pas d'observer
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      trigger()
      setIsDone(true)
      return
    }

    if (!element) return

    // Déjà dans le viewport ?
    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      trigger()
      return
    }
    if (rect.bottom <= 0) {
      trigger()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger()
          observer.unobserve(element)
          observer.disconnect()
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    observer.observe(element)

    // Filet de sécurité 2000ms
    const timer = setTimeout(() => {
      if (!hasTriggered.current && element) {
        const r = element.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) {
          trigger()
          observer.disconnect()
        }
      }
    }, 2000)

    const handleScrollCheck = () => {
      if (!hasTriggered.current && element) {
        const r = element.getBoundingClientRect()
        if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
          trigger()
          observer.disconnect()
          window.removeEventListener('scroll', handleScrollCheck)
        }
      }
    }
    window.addEventListener('scroll', handleScrollCheck, { passive: true })

    return () => {
      observer.disconnect()
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScrollCheck)
    }
  }, [ref, delay])

  return { isVisible, isDone }
}
