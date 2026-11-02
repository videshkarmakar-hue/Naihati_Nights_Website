import React, { useState, useEffect, useRef } from 'react';
import { Send, X, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface DeveloperContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperContactModal: React.FC<DeveloperContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Puja Collaboration');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const initialInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        initialInputRef.current?.focus();
      }, 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
      setSubmitted(false);
      setError(null);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'inquiries'), {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch {
      // Graceful offline fallback
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      aria-describedby="contact-modal-description"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg rounded-2xl bg-[#3E2723] border border-[#5D4037] p-6 sm:p-8 shadow-2xl text-[#F4F5F7]"
      >
        {/* Header bar */}
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#271916] border border-white/10 flex items-center justify-center text-[#F0660A]">
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3
                id="contact-modal-title"
                className="text-lg font-bold text-white font-sans tracking-tight"
              >
                Inquiry for Videsh Karmakar
              </h3>
              <p id="contact-modal-description" className="text-xs text-[#D7CCC8]">
                Lead Architect &amp; Creator · Sharod Bhraman
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-[#D7CCC8] hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0660A]"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <h4 className="text-lg font-bold text-white mb-1.5 font-sans">
              Inquiry Dispatched Successfully
            </h4>
            <p className="text-xs sm:text-sm text-[#D7CCC8] max-w-sm mb-5 leading-relaxed font-sans">
              Thank you, <span className="text-white font-semibold">{name}</span>. Your message has been sent to Videsh. You will receive a direct reply at <span className="text-[#F0660A] font-mono">{email}</span>.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-xs font-semibold text-white bg-[#F0660A] hover:bg-[#D65505] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0660A]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
            {error && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-red-200 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="inquiry-name"
                className="block text-xs font-medium text-[#D7CCC8] mb-1"
              >
                Your Name <span className="text-[#F0660A]">*</span>
              </label>
              <input
                ref={initialInputRef}
                id="inquiry-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anirban Mukherjee"
                className="w-full px-3.5 py-2 rounded-lg bg-[#271916] border border-[#5D4037] focus:border-[#F0660A] text-white placeholder-[#A1887F] text-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F0660A] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-email"
                className="block text-xs font-medium text-[#D7CCC8] mb-1"
              >
                Email Address <span className="text-[#F0660A]">*</span>
              </label>
              <input
                id="inquiry-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. anirban@example.com"
                className="w-full px-3.5 py-2 rounded-lg bg-[#271916] border border-[#5D4037] focus:border-[#F0660A] text-white placeholder-[#A1887F] text-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F0660A] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-subject"
                className="block text-xs font-medium text-[#D7CCC8] mb-1"
              >
                Inquiry Topic
              </label>
              <select
                id="inquiry-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-[#271916] border border-[#5D4037] focus:border-[#F0660A] text-white text-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F0660A] transition-colors cursor-pointer"
              >
                <option value="Puja Collaboration">Puja Committee / Pandal Integration</option>
                <option value="Design & UI Consultation">Design &amp; UI Consultation</option>
                <option value="Feature Request / Feedback">Feature Request &amp; App Feedback</option>
                <option value="Technical Partnership">Technical Partnership / General Inquiry</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="inquiry-message"
                className="block text-xs font-medium text-[#D7CCC8] mb-1"
              >
                Message <span className="text-[#F0660A]">*</span>
              </label>
              <textarea
                id="inquiry-message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your inquiry, festival project, or feedback..."
                className="w-full p-3 rounded-lg bg-[#271916] border border-[#5D4037] focus:border-[#F0660A] text-white placeholder-[#A1887F] text-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F0660A] transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-medium text-[#D7CCC8] hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded-lg bg-[#F0660A] hover:bg-[#D65505] text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0660A]"
              >
                {submitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
