import { Mail, Globe, ArrowUp, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { EXECUTIVE_INFO } from '../data/mediaKitData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl shadow-slate-950/40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold text-sm">
                SB
              </div>
              <div>
                <div className="font-bold text-slate-100 text-base">Saleemah Baldwin</div>
                <div className="text-slate-400 text-xs">Co-Founder &amp; CEO, XNORB Technology Inc.</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-300">
              <a href="#profile" className="hover:text-sky-400 transition-colors">Executive Profile</a>
              <a href="#press-release" className="hover:text-sky-400 transition-colors">Press Release</a>
              <a href="#speaking" className="hover:text-sky-400 transition-colors">Keynotes</a>
              <a href="#quotes" className="hover:text-sky-400 transition-colors">Quotes</a>
              <a href="#assets" className="hover:text-sky-400 transition-colors">Assets</a>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors cursor-pointer ml-auto"
              >
                <span>Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs">
            <p>
              &copy; {new Date().getFullYear()} XNORB Technology Inc. All Rights Reserved. • Press Contact:{' '}
              <a
                href={`mailto:${EXECUTIVE_INFO.pressEmail}`}
                className="text-sky-400 hover:underline font-medium"
              >
                {EXECUTIVE_INFO.pressEmail}
              </a>
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Media Resource &amp; Kit</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
