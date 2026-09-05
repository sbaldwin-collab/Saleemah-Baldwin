import { useState } from 'react';
import { Download, FileText, Palette, Copy, Check, ExternalLink, Sparkles, FolderArchive } from 'lucide-react';
import { MEDIA_ASSETS_LIST, BRAND_COLORS } from '../data/mediaKitData';
import { downloadExecutiveBioDocument, downloadXnorbLogoSvg } from '../utils/downloadHelpers';

interface MediaAssetsSectionProps {
  onShowToast: (msg: string) => void;
}

export function MediaAssetsSection({ onShowToast }: MediaAssetsSectionProps) {
  const [copiedColorHex, setCopiedColorHex] = useState<string | null>(null);

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColorHex(hex);
    onShowToast(`Copied color code ${hex}!`);
    setTimeout(() => setCopiedColorHex(null), 2000);
  };

  const handleAssetDownload = (assetId: string) => {
    if (assetId === 'asset-logo-dark') {
      downloadXnorbLogoSvg('dark');
      onShowToast('Downloading XNORB Technology Brand Vector Logo...');
    } else if (assetId === 'asset-bio-pdf') {
      downloadExecutiveBioDocument();
      onShowToast('Downloading Executive Bio One-Sheet...');
    }
  };

  return (
    <section
      id="assets"
      className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-slate-950/50 backdrop-blur-sm space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-bold text-sky-400 tracking-tight">
              Media Assets &amp; Brand Resources
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Authorized vector brand assets, typography guidelines, and executive bios available for press use:
          </p>
        </div>

        {/* Action Button Group */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleAssetDownload('asset-logo-dark')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>Download Brand Vector Kit</span>
          </button>
          <button
            onClick={() => handleAssetDownload('asset-bio-pdf')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>Download Executive Bio One-Sheet</span>
          </button>
        </div>
      </div>

      {/* Media Assets Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MEDIA_ASSETS_LIST.map((asset) => (
          <div
            key={asset.id}
            className="flex flex-col justify-between bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all group"
          >
            {/* Visual Preview / Thumbnail */}
            <div className="h-44 bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center border-b border-slate-800/80 p-6 relative">
              {asset.isSvg ? (
                <div className="w-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl border border-sky-400/40 bg-sky-500/10 flex items-center justify-center text-sky-400 font-black text-2xl mb-2 shadow-inner">
                    XN
                  </div>
                  <div className="text-sm font-bold text-slate-200">XNORB TECHNOLOGY</div>
                  <div className="text-[11px] text-sky-400 font-mono mt-0.5">Scalable Vector Package (.SVG)</div>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl border border-sky-400/40 bg-sky-500/10 flex items-center justify-center text-sky-400 mb-2 shadow-inner">
                    <FileText className="w-8 h-8 text-sky-400" />
                  </div>
                  <div className="text-sm font-bold text-slate-200">EXECUTIVE ONE-SHEET</div>
                  <div className="text-[11px] text-sky-400 font-mono mt-0.5">Formal Media Profile (.PDF / .MD)</div>
                </div>
              )}

              <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/90 text-slate-300 border border-slate-700">
                {asset.fileSize}
              </span>
            </div>

            {/* Content Details & Download */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-100 leading-snug">
                  {asset.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {asset.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-sky-400 font-mono">
                  {asset.fileType}
                </span>

                <button
                  type="button"
                  onClick={() => handleAssetDownload(asset.id)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Asset</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Brand Kit & Color Palette Section */}
      <div id="brand" className="pt-4 border-t border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-sky-400" />
            <h3 className="text-base font-bold text-slate-100">
              Corporate Brand Colors &amp; Visual Tokens
            </h3>
          </div>
          <span className="text-xs text-slate-400">Click any swatch to copy HEX code</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BRAND_COLORS.map((color) => {
            const isCopied = copiedColorHex === color.hex;
            return (
              <button
                key={color.name}
                onClick={() => handleCopyColor(color.hex)}
                className="group p-3 bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <div
                  className="w-full h-8 rounded-lg mb-2 border border-slate-700/60 shadow-inner flex items-center justify-end p-1"
                  style={{ backgroundColor: color.hex }}
                >
                  {isCopied && <Check className="w-4 h-4 text-slate-950 stroke-[3]" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200 truncate">{color.name}</div>
                  <div className="text-[11px] font-mono text-sky-400 group-hover:text-sky-300 flex items-center justify-between mt-0.5">
                    <span>{color.hex}</span>
                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
