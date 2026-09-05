import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Download, Printer, Share2, Building, Mail, Globe, Newspaper } from 'lucide-react';
import { OFFICIAL_PRESS_RELEASE } from '../data/mediaKitData';
import { downloadTextFile } from '../utils/downloadHelpers';

interface PressReleaseSectionProps {
  onShowToast: (msg: string) => void;
}

export function PressReleaseSection({ onShowToast }: PressReleaseSectionProps) {
  const [copied, setCopied] = useState(false);

  const releaseText = `FOR IMMEDIATE RELEASE

${OFFICIAL_PRESS_RELEASE.headline.toUpperCase()}
${OFFICIAL_PRESS_RELEASE.subheadline}

${OFFICIAL_PRESS_RELEASE.city} — ${OFFICIAL_PRESS_RELEASE.date} — ${OFFICIAL_PRESS_RELEASE.paragraphs.join('\n\n')}

"The future of enterprise technology isn't more AI—it's better integration. Connected solutions matter more than technology alone." — Saleemah Baldwin, Co-Founder & CEO, XNORB Technology Inc.

ABOUT XNORB TECHNOLOGY INC.
${OFFICIAL_PRESS_RELEASE.aboutCompany}

MEDIA CONTACT
${OFFICIAL_PRESS_RELEASE.mediaContact.name}
${OFFICIAL_PRESS_RELEASE.mediaContact.title}
Email: ${OFFICIAL_PRESS_RELEASE.mediaContact.email}
Website: ${OFFICIAL_PRESS_RELEASE.mediaContact.website}
###`;

  const handleCopyRelease = () => {
    navigator.clipboard.writeText(releaseText);
    setCopied(true);
    onShowToast('Official Press Release copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    downloadTextFile('Press-Release-Saleemah-Baldwin-Influential-Women-Magazine.txt', releaseText);
    onShowToast('Downloaded Press Release text file.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="press-release"
      className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-slate-950/50 backdrop-blur-sm"
    >
      {/* Section Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-bold text-sky-400 tracking-tight">
              Official Press Release
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standard wire-format press release authorized for immediate syndication and coverage.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyRelease}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded-lg transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownloadTxt}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .TXT</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Press Release Card Interior */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-6 sm:p-8 space-y-6">
        {/* Release Status & Date */}
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800/80 pb-3">
          <span className="bg-sky-500/10 px-2.5 py-1 rounded border border-sky-500/30">
            {OFFICIAL_PRESS_RELEASE.status}
          </span>
          <span className="text-slate-400 font-normal">{OFFICIAL_PRESS_RELEASE.city} — {OFFICIAL_PRESS_RELEASE.date}</span>
        </div>

        {/* Headline & Subheadline */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 leading-snug tracking-tight">
            {OFFICIAL_PRESS_RELEASE.headline}
          </h3>
          <p className="text-sm sm:text-base text-slate-400 italic leading-relaxed">
            {OFFICIAL_PRESS_RELEASE.subheadline}
          </p>
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed">
          {OFFICIAL_PRESS_RELEASE.paragraphs.map((paragraph, index) => (
            <p key={index}>
              {index === 0 && (
                <strong className="text-sky-300 font-semibold uppercase mr-1">
                  {OFFICIAL_PRESS_RELEASE.city} —
                </strong>
              )}
              {paragraph}
            </p>
          ))}
        </div>

        {/* Pullquote Callout */}
        <div className="p-4 bg-sky-950/30 border-l-4 border-sky-400 rounded-r-lg">
          <p className="text-sm sm:text-base italic text-sky-100 font-medium">
            "{OFFICIAL_PRESS_RELEASE.pullquote}"
          </p>
          <span className="block text-xs text-sky-400/80 mt-1 font-semibold uppercase tracking-wider">
            — Saleemah Baldwin, Co-Founder & CEO, XNORB Technology Inc.
          </span>
        </div>

        {/* About Company Boilerplate & Media Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="md:col-span-2 space-y-2">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-sky-400" />
              About XNORB Technology Inc.
            </h4>
            <p className="text-slate-400 leading-relaxed">
              {OFFICIAL_PRESS_RELEASE.aboutCompany}
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg space-y-2">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              Media Contact
            </h4>
            <div className="text-slate-300 space-y-1">
              <div className="font-semibold text-slate-100">{OFFICIAL_PRESS_RELEASE.mediaContact.name}</div>
              <div className="text-slate-400">{OFFICIAL_PRESS_RELEASE.mediaContact.title}</div>
              <a
                href={`mailto:${OFFICIAL_PRESS_RELEASE.mediaContact.email}`}
                className="text-sky-400 hover:underline block pt-1 font-medium truncate"
              >
                {OFFICIAL_PRESS_RELEASE.mediaContact.email}
              </a>
              <div className="text-slate-400">{OFFICIAL_PRESS_RELEASE.mediaContact.organization}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
