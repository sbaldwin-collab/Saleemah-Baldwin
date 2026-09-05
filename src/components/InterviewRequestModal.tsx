import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Send, CheckCircle2, Calendar, User, Building, Radio } from 'lucide-react';
import { EXECUTIVE_INFO, SPEAKING_TOPICS } from '../data/mediaKitData';

interface InterviewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  onShowToast: (msg: string) => void;
}

export function InterviewRequestModal({
  isOpen,
  onClose,
  initialTopic = '',
  onShowToast,
}: InterviewRequestModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [outlet, setOutlet] = useState('');
  const [format, setFormat] = useState('Podcast / Interview');
  const [selectedTopic, setSelectedTopic] = useState(initialTopic || 'Beyond the AI Hype');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialTopic) {
      setSelectedTopic(initialTopic);
    }
  }, [initialTopic]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !outlet) {
      onShowToast('Please fill in your name, email, and media outlet.');
      return;
    }

    // Build mailto link as well
    const subject = encodeURIComponent(`Media / Speaking Request: ${outlet} — ${name}`);
    const body = encodeURIComponent(
      `Hello Saleemah Baldwin & Media Team,\n\nI would like to request an interview / speaking appearance.\n\n` +
      `Requester: ${name}\n` +
      `Media Outlet / Organization: ${outlet}\n` +
      `Email: ${email}\n` +
      `Format: ${format}\n` +
      `Preferred Topic: ${selectedTopic}\n` +
      `Proposed Date: ${date || 'Flexible'}\n\n` +
      `Message / Interview Details:\n${message || 'N/A'}\n\n` +
      `Best regards,\n${name}`
    );

    setIsSubmitted(true);
    onShowToast('Interview request submitted successfully!');

    // Trigger mailto link in background for immediate fallback
    window.location.href = `mailto:${EXECUTIVE_INFO.pressEmail}?subject=${subject}&body=${body}`;
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setOutlet('');
    setMessage('');
    setDate('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  Request Interview or Keynote
                </h3>
                <p className="text-xs text-slate-400">
                  Saleemah Baldwin &bull; XNORB Technology Inc. Press Office
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content / Form */}
          {isSubmitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-100">
                Inquiry Sent to Press Office
              </h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Your interview inquiry for <strong>{outlet}</strong> has been transmitted to <span className="text-sky-400 font-semibold">{EXECUTIVE_INFO.pressEmail}</span>. The media team typically responds within 24 business hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-sm rounded-lg transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="jane@techjournal.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Media Outlet / Organization *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="TechCrunch, Podcast, Conference"
                      value={outlet}
                      onChange={(e) => setOutlet(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Proposed Date / Deadline
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Oct 15, 2026 or Immediate"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>
              </div>

              {/* Engagement Format */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Format / Engagement Type
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-400"
                >
                  <option value="Podcast / Audio Interview">Podcast / Audio Interview</option>
                  <option value="Conference Keynote / Mainstage">Conference Keynote / Mainstage</option>
                  <option value="Executive Fireside Chat / Panel">Executive Fireside Chat / Panel</option>
                  <option value="Written Q&A / Magazine Feature">Written Q&A / Magazine Feature</option>
                  <option value="Broadcast / TV / Video Stream">Broadcast / TV / Video Stream</option>
                  <option value="Corporate Masterclass / Advisory">Corporate Masterclass / Advisory</option>
                </select>
              </div>

              {/* Topic of Interest */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Topic of Focus
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-400"
                >
                  {SPEAKING_TOPICS.map((topic) => (
                    <option key={topic.id} value={topic.topic}>
                      {topic.topic} ({topic.targetAudience})
                    </option>
                  ))}
                  <option value="Influential Women Feature Discussion">
                    Influential Women Feature & Tech Leadership
                  </option>
                  <option value="Custom Topic / Enterprise Architecture">
                    Custom Topic / Enterprise Architecture
                  </option>
                </select>
              </div>

              {/* Details / Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Interview Details / Angle / Audience
                </label>
                <textarea
                  rows={3}
                  placeholder="Share editorial angles, estimated audience size, recording platform, or specific questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  Direct: <a href="mailto:press@xnorbtechnology.com" className="text-sky-400 hover:underline">press@xnorbtechnology.com</a>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg shadow-md shadow-sky-500/20 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Request</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
