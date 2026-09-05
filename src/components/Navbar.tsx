import { useState, useEffect } from 'react';
import { Mail, Download, Menu, X, Printer, Sparkles } from 'lucide-react';
import { downloadExecutiveBioDocument } from '../utils/downloadHelpers';

interface NavbarProps {
  onRequestInterview: () => void;
  onShowToast: (msg: string) => void;
}

export function Navbar({ onRequestInterview, onShowToast }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Executive Profile', href: '#profile' },
    { name: 'Press Release', href: '#press-release' },
    { name: 'Keynote Topics', href: '#speaking' },
    { name: 'Quotes', href: '#quotes' },
    { name: 'Assets', href: '#assets' },
    { name: 'Audio', href: '#music-generator' },
    { name: 'Contact Form', href: '#contact' },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadBio = () => {
    downloadExecutiveBioDocument();
    onShowToast('Downloading Official Press Bio One-Sheet...');
  };

  return (
    <header
      id="main-navigation"
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-slate-800 shadow-md shadow-slate-950/40 py-3'
          : 'bg-slate-950/60 backdrop-blur-sm border-slate-800/60 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/40 flex items-center justify-center text-sky-400 font-bold text-sm group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
            SB
          </div>
          <div>
            <div className="text-base font-bold text-slate-100 group-hover:text-sky-400 transition-colors leading-none tracking-tight">
              Saleemah Baldwin
            </div>
            <div className="text-[11px] font-medium text-slate-400 tracking-wider uppercase mt-1">
              Press & Media Kit
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-sky-400 transition-colors text-slate-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            id="nav-print-btn"
            onClick={handlePrint}
            title="Print Media Kit"
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 rounded-lg border border-slate-800 transition-colors"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            id="nav-download-kit-btn"
            onClick={handleDownloadBio}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg transition-all"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>Bio (TXT)</span>
          </button>

          <button
            id="nav-interview-cta"
            onClick={onRequestInterview}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg shadow-sm shadow-sky-500/20 hover:shadow-sky-500/40 transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Request Interview</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            id="mobile-interview-btn"
            onClick={onRequestInterview}
            className="px-2.5 py-1.5 text-xs font-bold text-slate-950 bg-sky-400 rounded-md"
          >
            Interview
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-sky-400 hover:bg-slate-900 rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDownloadBio();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 rounded-lg"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              Download Press Kit One-Sheet
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestInterview();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-slate-950 bg-sky-400 rounded-lg"
            >
              <Mail className="w-4 h-4" />
              Request Interview / Speaking Inquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
