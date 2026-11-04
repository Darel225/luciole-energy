import { useState, useEffect, useRef } from 'react'

/**
 * useCountUp
 * Compteur fluide avec requestAnimationFrame et easing easeOutCubic.
 * Déclenché une seule fois lorsque isTriggered passe à true.
 * Respecte prefers-reduced-motion.
 */
export function useCountUp(target, options = {}) {
  const {
    duration = 1400,
    suffix = '',
    decimals = 0,
    isTriggered = false,
  } = options

  const [count, setCount] = useState(0)
  const [suffixVisible, setSuffixVisible] = useState(suffix !== '/7' && suffix !== ' kWc')
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Accessibilité : prefers-reduced-motion affiche la valeur finale immédiatement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      setSuffixVisible(true)
      return
    }

    if (!isTriggered || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()

    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Formule easeOutCubic : 1 - (1 - progress)^3
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentVal = easeOut * target

      setCount(Number(currentVal.toFixed(decimals)))

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(target)
        if (suffix === '/7' || suffix === ' kWc') {
          setSuffixVisible(true)
        }
      }
    }

    requestAnimationFrame(step)
  }, [isTriggered, target, duration, decimals, suffix])

  return { count, suffixVisible }
}
