import { useState } from 'react';
import { Quote, Copy, Check, Sparkles, MessageSquareQuote } from 'lucide-react';
import { APPROVED_QUOTES, EXECUTIVE_INFO } from '../data/mediaKitData';

interface ApprovedQuotesSectionProps {
  onShowToast: (msg: string) => void;
}

export function ApprovedQuotesSection({ onShowToast }: ApprovedQuotesSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyQuote = (id: string, quote: string, context: string) => {
    const fullCitation = `"${quote}" — Saleemah Baldwin, Co-Founder & CEO of XNORB Technology Inc. (${context})`;
    navigator.clipboard.writeText(fullCitation);
    setCopiedId(id);
    onShowToast('Quote & attribution copied for citation!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyHeroQuote = () => {
    const fullCitation = `"${EXECUTIVE_INFO.heroQuote}" — Saleemah Baldwin, Co-Founder & CEO of XNORB Technology Inc. (Influential Women Magazine feature)`;
    navigator.clipboard.writeText(fullCitation);
    setCopiedId('hero-quote');
    onShowToast('Vision quote copied with official citation!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="quotes"
      className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-slate-950/50 backdrop-blur-sm space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-bold text-sky-400 tracking-tight">
              Approved Quotes &amp; Soundbites
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Pre-approved direct quotes for journalists, articles, podcasts, and conference collateral.
          </p>
        </div>
      </div>

      {/* Bento Grid layout for quotes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Large Featured Vision Quote Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-sky-950/60 to-slate-950 border border-sky-500/30 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-md">
          <div className="text-sky-400/10 absolute -top-4 -left-4 text-9xl font-serif select-none pointer-events-none">
            “
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                Core Vision Quote
              </span>
              <MessageSquareQuote className="w-4 h-4 text-sky-400" />
            </div>

            <p className="text-base sm:text-lg font-medium text-slate-100 italic leading-relaxed my-3">
              "{EXECUTIVE_INFO.heroQuote}"
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-sky-500/20 mt-4 flex items-center justify-between">
            <div className="text-xs">
              <div className="font-bold text-slate-200">Saleemah Baldwin</div>
              <div className="text-sky-400/80 text-[11px]">Influential Women Magazine</div>
            </div>

            <button
              type="button"
              onClick={handleCopyHeroQuote}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-sky-300 hover:text-slate-950 bg-sky-500/20 hover:bg-sky-400 rounded-lg transition-colors cursor-pointer border border-sky-400/30"
            >
              {copiedId === 'hero-quote' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'hero-quote' ? 'Copied' : 'Cite Quote'}</span>
            </button>
          </div>
        </div>

        {/* Categorized Topic Soundbites (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {APPROVED_QUOTES.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between p-5 bg-slate-950/70 border border-slate-800 rounded-xl hover:border-slate-700 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {item.topic}
                    </span>
                    <Quote className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 transition-colors" />
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-200 italic leading-relaxed mb-3">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 truncate mr-2">
                    {item.context}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopyQuote(item.id, item.quote, item.context)}
                    className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-sky-400 hover:text-slate-950 bg-sky-500/10 hover:bg-sky-400 rounded transition-colors shrink-0 cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopied ? 'Copied' : 'Cite'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
