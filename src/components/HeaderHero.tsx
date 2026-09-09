import { motion } from 'motion/react';
import { Award, Mail, ArrowDown, Star, ExternalLink, BookOpen } from 'lucide-react';
import { EXECUTIVE_INFO, FAST_FACTS } from '../data/mediaKitData';

interface HeaderHeroProps {
  onRequestInterview?: () => void;
}

export function HeaderHero({ onRequestInterview }: HeaderHeroProps) {
  return (
    <header className="relative space-y-6">
      {/* Bento Grid Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Hero Card (8 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-8 bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-slate-950/40 relative overflow-hidden"
        >
          {/* Subtle accent glow in background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-[90px] pointer-events-none rounded-full" />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold tracking-wide">
                <Award className="w-3.5 h-3.5 text-sky-400" />
                <span>{EXECUTIVE_INFO.badge}</span>
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">•</span>
              <span className="text-xs text-slate-400 hidden sm:inline font-mono">OFFICIAL PRESS KIT</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-50 tracking-tight mb-2">
              {EXECUTIVE_INFO.name}
            </h1>

            <p className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-sky-400 mb-4">
              {EXECUTIVE_INFO.title}
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {EXECUTIVE_INFO.shortBio}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800/90 flex flex-wrap items-center gap-3">
            {onRequestInterview && (
              <button
                onClick={onRequestInterview}
                className="inline-flex items-center gap-2 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Request Interview</span>
              </button>
            )}

            <a
              href="#speaking"
              className="inline-flex items-center gap-2 bg-slate-950/70 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all"
            >
              <span>Speaking Topics</span>
              <ArrowDown className="w-3.5 h-3.5 text-sky-400" />
            </a>

            <a
              href="https://influentialwomen.com/connect/saleemah-baldwin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-950/70 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all"
            >
              <span>Read My Feature</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            </a>
          </div>
        </motion.div>

        {/* Featured Magazine Bento Card (4 cols on lg) */}
        <motion.article
          id="magazine"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-4 bg-gradient-to-br from-sky-950/90 via-slate-900 to-slate-900 border border-sky-500/30 rounded-2xl flex flex-col shadow-xl shadow-slate-950/40 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2 opacity-10 text-sky-400 pointer-events-none">
            <Star className="w-32 h-32" />
          </div>

          <a
            href="https://influentialwomen.com/connect/saleemah-baldwin"
            target="_blank"
            rel="noopener noreferrer"
            className="block h-44 overflow-hidden border-b border-sky-500/20"
            aria-label="Read Saleemah Baldwin's Influential Women feature"
          >
            <img
              src="https://cdn.bmapinc.com/articles/IW/iw_6a67cabc3787c_the_future_of_enterprise_technology_isn_t_more_ai.png"
              alt="The Future of Enterprise Technology Isn't More AI—It's Better Integration"
              className="w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-300"
            />
          </a>

          <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 border border-sky-400/40 text-[11px] font-bold tracking-wider mb-4">
              <Star className="w-3 h-3 text-sky-300 fill-sky-300" />
              <span>SPECIAL FEATURE</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
              Featured in Influential Women Magazine
            </h3>

            <div className="w-10 h-0.5 bg-sky-400 my-4" />

            <p className="text-sm text-sky-100/90 leading-relaxed">
              Read Saleemah Baldwin's published article, <span className="italic">The Future of Enterprise Technology Isn't More AI—It's Better Integration</span>.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-500/20 space-y-3">
            <a
              href="https://influentialwomen.com/connect/saleemah-baldwin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-sm font-bold text-sky-300 hover:text-sky-200"
            >
              <span>Read Saleemah's Feature</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://influentialwomen.com/influential-women-magazine-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white"
            >
              <span className="inline-flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> View the 2026 Magazine</span>
              <span className="font-mono text-sky-400">SUZE ORMAN COVER</span>
            </a>
          </div>
          </div>
        </motion.article>
      </div>

      {/* Bento Fast Facts Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {FAST_FACTS.map((fact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 hover:border-slate-700 transition-all shadow-md shadow-slate-950/30"
          >
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              {fact.label}
            </div>
            <div className="text-base sm:text-lg font-extrabold text-slate-100 mt-1 truncate">
              {fact.value}
            </div>
            <div className="text-xs text-sky-400 font-medium mt-0.5 truncate">
              {fact.detail}
            </div>
          </motion.div>
        ))}
      </div>
    </header>
  );
}
