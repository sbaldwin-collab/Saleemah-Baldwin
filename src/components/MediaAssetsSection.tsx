import { Download, FileText } from 'lucide-react';
import { MEDIA_ASSETS_LIST } from '../data/mediaKitData';
import { downloadExecutiveBioDocument, downloadImageFromUrl, downloadXnorbLogoSvg } from '../utils/downloadHelpers';

interface MediaAssetsSectionProps {
  onShowToast: (msg: string) => void;
}

export function MediaAssetsSection({ onShowToast }: MediaAssetsSectionProps) {
  const handleAssetDownload = (assetId: string) => {
    const asset = MEDIA_ASSETS_LIST.find((item) => item.id === assetId);

    if (asset?.downloadUrl) {
      downloadImageFromUrl(asset.downloadUrl, asset.downloadUrl.split('/').pop() ?? 'saleemah-baldwin-headshot.png');
      onShowToast(`Downloading ${asset.title}...`);
      return;
    }

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
            <div
              className={`${asset.previewUrl ? 'aspect-[6/5] p-3' : 'h-44 p-6'} bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center border-b border-slate-800/80 relative`}
            >
              {asset.previewUrl ? (
                <img
                  src={asset.previewUrl}
                  alt={asset.title}
                  className="h-full w-full object-contain object-center"
                />
              ) : asset.isSvg ? (
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

    </section>
  );
}
