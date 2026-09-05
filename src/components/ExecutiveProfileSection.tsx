import { useState } from 'react';
import { Mail, ArrowDown, Copy, Check, Quote, FileText, Sparkles, ExternalLink, UserCheck, ShieldCheck } from 'lucide-react';
import { EXECUTIVE_INFO } from '../data/mediaKitData';

interface ExecutiveProfileSectionProps {
  onRequestInterview: () => void;
  onShowToast: (msg: string) => void;
}

export function ExecutiveProfileSection({
  onRequestInterview,
  onShowToast,
}: ExecutiveProfileSectionProps) {
  const [bioTab, setBioTab] = useState<'profile' | 'short' | 'medium' | 'full'>('profile');
  const [copiedBio, setCopiedBio] = useState(false);

  const getBioText = () => {
    switch (bioTab) {
      case 'short':
        return EXECUTIVE_INFO.shortBio;
      case 'medium':
        return EXECUTIVE_INFO.mediumBio;
      case 'full':
        return EXECUTIVE_INFO.longBio;
      case 'profile':
      default:
        return EXECUTIVE_INFO.executiveProfile;
    }
  };

  const handleCopyBio = () => {
    const text = getBioText();
    navigator.clipboard.writeText(text);
    setCopiedBio(true);
    onShowToast(`Copied ${bioTab === 'profile' ? 'Executive Profile' : `${bioTab} bio`} to clipboard!`);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  return (
    <section id="profile" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-slate-950/50 backdrop-blur-sm space-y-6">
      {/* Header and Bio Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-bold text-sky-400 tracking-tight">
              Executive Profile &amp; Approved Biographies
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standardized press biographies formatted for conferences, publications, and introductory remarks:
          </p>
        </div>

        {/* Bio Length Selector for Media Convenience */}
        <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs shrink-0 self-start sm:self-auto">
          <span className="text-[11px] font-semibold text-slate-400 px-2 hidden sm:inline">Bio Length:</span>
          <button
            onClick={() => setBioTab('profile')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              bioTab === 'profile'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setBioTab('short')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              bioTab === 'short'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            50 Words
          </button>
          <button
            onClick={() => setBioTab('medium')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              bioTab === 'medium'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            100 Words
          </button>
          <button
            onClick={() => setBioTab('full')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              bioTab === 'full'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Full Bio
          </button>
        </div>
      </div>

      {/* Bio Body Render Container */}
      <div className="relative group bg-slate-950/60 p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-4">
        <div className="text-slate-200 leading-relaxed space-y-3.5 text-base sm:text-lg font-normal">
          {bioTab === 'full' ? (
            EXECUTIVE_INFO.longBio.split('\n\n').map((para, i) => (
              <p key={i} className="leading-relaxed">{para}</p>
            ))
          ) : (
            <p className="leading-relaxed">{getBioText()}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
          <button
            onClick={handleCopyBio}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded-xl transition-colors cursor-pointer"
          >
            {copiedBio ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedBio ? 'Copied Bio to Clipboard!' : `Copy ${bioTab === 'profile' ? 'Executive Profile' : `${bioTab.toUpperCase()} Bio`}`}</span>
          </button>

          <span className="text-xs text-slate-500 hidden sm:inline">
            Approved for conference programs &amp; editorial citation
          </span>
        </div>
      </div>

      {/* Blockquote Quote */}
      <blockquote className="border-l-4 border-sky-400 pl-5 py-3 my-4 italic text-slate-200 bg-gradient-to-r from-sky-950/30 to-transparent rounded-r-xl">
        <div className="flex items-start gap-3">
          <Quote className="w-6 h-6 text-sky-400 shrink-0 mt-0.5" />
          <p className="text-base sm:text-lg font-medium text-sky-100 leading-relaxed">
            "{EXECUTIVE_INFO.heroQuote}"
          </p>
        </div>
      </blockquote>

      {/* Action Button Group */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          id="executive-interview-btn"
          onClick={onRequestInterview}
          className="inline-flex items-center gap-2 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>Request Interview</span>
        </button>

        <a
          id="executive-keynote-link"
          href="#speaking"
          className="inline-flex items-center gap-2 bg-transparent hover:bg-slate-800 text-slate-100 border border-slate-700 hover:border-slate-600 font-semibold px-6 py-3 rounded-xl text-sm transition-all"
        >
          <span>View Keynote Topics</span>
          <ArrowDown className="w-4 h-4 text-sky-400" />
        </a>

        <a
          href="mailto:press@xnorbtechnology.com?subject=Press%20Inquiry%20for%20Saleemah%20Baldwin"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-300 ml-auto transition-colors"
        >
          <span>press@xnorbtechnology.com</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
