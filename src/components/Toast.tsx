import { motion, AnimatePresence } from 'motion/react';
import { Check, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
  onClose?: () => void;
}

export function Toast({ message, type = 'success' }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-slate-100 rounded-xl border border-sky-500/40 shadow-xl shadow-slate-950/80 backdrop-blur-md"
        >
          <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
            {type === 'success' ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Info className="w-3.5 h-3.5" />}
          </div>
          <span className="text-sm font-medium text-slate-200">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
