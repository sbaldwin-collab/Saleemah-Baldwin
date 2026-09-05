import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, CheckCircle2, Building2, User, MessageSquare, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { EXECUTIVE_INFO } from '../data/mediaKitData';

interface ContactFormSectionProps {
  onShowToast?: (msg: string) => void;
}

export function ContactFormSection({ onShowToast }: ContactFormSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    topic: 'Keynote & Speaking',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Explicitly log form submission to console as requested
    console.log('Press Kit Inquiry Submitted:', {
      timestamp: new Date().toISOString(),
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      message: formData.message,
      topic: formData.topic,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onShowToast?.('Inquiry submitted successfully! Press relations team notified.');
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      organization: '',
      message: '',
      topic: 'Keynote & Speaking',
    });
    setIsSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-slate-950/50 backdrop-blur-sm space-y-6"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-bold text-sky-400 tracking-tight">
              Media &amp; Speaking Inquiries
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Submit an official press interview request, keynote booking, or editorial inquiry:
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span>Typical response: &lt; 24 business hours</span>
        </div>
      </div>

      {/* Bento Grid: Form (7 cols) + Direct Contact Info Box (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contact Form Container (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-2xl p-6 sm:p-7">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success-banner"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-100">
                    Thank You, {formData.name || 'Inquirer'}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Your inquiry has been received and logged. Saleemah's communications team will respond to{' '}
                    <span className="text-sky-400 font-semibold">{formData.email}</span> shortly.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    id="contact-send-another-btn"
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                  >
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form id="media-kit-contact-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. sjenkins@bloomberg.com"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Organization / Publication Field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-organization" className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Organization / Publication
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      id="contact-organization"
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="e.g. Bloomberg / TechCrunch / Enterprise Summit"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Message / Request Details <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please share event details, publication context, proposed recording/interview dates, and specific discussion topics..."
                      className="w-full bg-slate-900 border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all resize-y"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>

        {/* Right Direct Press Info Bento Tile (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Direct Press Office</span>
            </div>

            <h3 className="text-lg font-bold text-slate-100">
              Immediate Media Coordination
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              For breaking news commentary, rapid quote approval, or urgent deadline inquiries, you can also reach the communications desk directly:
            </p>

            <div className="space-y-3 pt-2">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Press Inquiries Email
                </div>
                <a
                  href={`mailto:${EXECUTIVE_INFO.pressEmail}`}
                  className="text-sm font-bold text-sky-400 hover:underline block mt-0.5"
                >
                  {EXECUTIVE_INFO.pressEmail}
                </a>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Direct Executive Desk
                </div>
                <a
                  href={`mailto:${EXECUTIVE_INFO.directEmail}`}
                  className="text-sm font-bold text-sky-400 hover:underline block mt-0.5"
                >
                  {EXECUTIVE_INFO.directEmail}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>Virtual or in-person bookings across North America, EMEA, and APAC.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
