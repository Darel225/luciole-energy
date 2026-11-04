import { Link } from 'react-router-dom'
import { ArrowRight, Eye } from 'lucide-react'

export default function CallToAction() {
  return (
    <section className="py-20 bg-brand-dark relative overflow-hidden">
      {/* Halo lumineux vert en arri�re-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-accent text-xs font-bold uppercase tracking-wider mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
          <span>Passer � l'action � Bureau d'�tudes</span>
        </div>

        {/* Titre */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
          Pr�t � concr�tiser vos ambitions �nerg�tiques ?
        </h2>

        {/* Sous-titre */}
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Contactez notre bureau d'�tudes pour une �valuation personnalis�e de vos infrastructures industrielles et tertiaires en C�te d'Ivoire et en Afrique de l'Ouest.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-accent text-brand-dark font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-all shadow-lg shadow-brand-accent/20"
          >
            <span>Contactez-nous</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/realisations"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-all"
          >
            <Eye size={16} />
            <span>D�couvrir nos r�alisations</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
