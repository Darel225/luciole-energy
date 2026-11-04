import { useState, useEffect } from 'react'

/**
 * useParallax
 * Décalage vertical passif et subtil throttlé par requestAnimationFrame.
 * Actif uniquement sur grand écran (>= 1024px) et inactif en prefers-reduced-motion.
 */
export function useParallax(ref, amplitude = 20, isElementVisible = true) {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isDesktop = window.innerWidth >= 1024
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isDesktop || prefersReducedMotion || !isElementVisible) {
      setOffsetY(0)
      return
    }

    let rafId = null

    const handleScroll = () => {
      if (rafId) return

      rafId = requestAnimationFrame(() => {
        const el = ref?.current
        if (!el) {
          rafId = null
          return
        }

        const rect = el.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Hors viewport -> rien à calculer
        if (rect.bottom < 0 || rect.top > windowHeight) {
          rafId = null
          return
        }

        const elementCenter = rect.top + rect.height / 2
        const viewportCenter = windowHeight / 2
        const progress = (viewportCenter - elementCenter) / (windowHeight / 2 + rect.height / 2)
        const clampedProgress = Math.max(-1, Math.min(1, progress))

        setOffsetY(Math.round(clampedProgress * amplitude))
        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [ref, amplitude, isElementVisible])

  return offsetY
}
