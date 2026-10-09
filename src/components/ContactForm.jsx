import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare, PenTool, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "36b1d4a7-2bf1-4b20-8494-c0ad74e9caac",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Submission error. Please verify network connectivity.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-16 scroll-mt-24 isolate">
      {/* ── Section Title ── */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-emerald-400 font-mono text-xs uppercase tracking-[0.25em]">
            Get In Touch
          </p>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Contact & Inquiries
        </h2>
        <p className="text-neutral-300 max-w-xl mt-3 text-sm md:text-base font-body leading-relaxed">
          Have a project in mind, research collaboration, or institutional inquiry? Feel free to reach out.
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative p-6 sm:p-10 rounded-3xl bg-neutral-950/85 border border-emerald-500/25 backdrop-blur-2xl shadow-[0_0_50px_rgba(16,185,129,0.12)] overflow-hidden"
        >
          {/* Ambient Corner Plasma Glows */}
          <div className="pointer-events-none absolute -top-32 -right-32 w-72 h-72 bg-emerald-500/15 rounded-full blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 w-72 h-72 bg-teal-500/10 rounded-full blur-[90px]" />

          {/* Form Top Header */}
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10 font-mono text-[11px] text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white font-medium">DIRECT CHANNEL: DEVIAN WAHYU NUGROHO</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-neutral-400">STATUS: </span>
              <span className="text-emerald-400">AVAILABLE FOR INQUIRIES</span>
            </div>
          </div>

          {/* Success Banner */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-xl border border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-mono text-xs flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold">PESAN BERHASIL TERKIRIM</p>
                <p className="text-[11px] text-emerald-300/80">Terima kasih. Pesan Anda telah diterima dan akan segera direspons.</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-mono text-neutral-300 ml-1 flex items-center justify-between">
                  <span>Your Name</span>
                  <span className="text-emerald-400/80 text-[10px] font-semibold">*Required</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-emerald-400 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Nama Anda atau Institusi"
                    className="w-full bg-black/70 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs md:py-3 md:pl-11 md:pr-4 md:text-sm placeholder-neutral-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 focus:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all font-body text-white"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-mono text-neutral-300 ml-1 flex items-center justify-between">
                  <span>Email Address</span>
                  <span className="text-emerald-400/80 text-[10px] font-semibold">*Required</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 md:pl-3.5 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-emerald-400 transition-colors">
                    <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="emailanda@domain.com"
                    className="w-full bg-black/70 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs md:py-3 md:pl-11 md:pr-4 md:text-sm placeholder-neutral-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 focus:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all font-body text-white"
                  />
                </div>
              </div>
            </div>

            {/* Subject Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-xs font-mono text-neutral-300 ml-1">
                <span>Subject</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 md:pl-3.5 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-emerald-400 transition-colors">
                  <PenTool className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </div>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Topik diskusi atau kolaborasi"
                  className="w-full bg-black/70 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs md:py-3 md:pl-11 md:pr-4 md:text-sm placeholder-neutral-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 focus:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all font-body text-white"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-mono text-neutral-300 ml-1">
                <span>Message</span>
              </label>
              <div className="relative group">
                <div className="absolute top-2.5 md:top-3.5 left-0 pl-3 md:pl-3.5 pointer-events-none text-neutral-400 group-focus-within:text-emerald-400 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Tuliskan pesan Anda di sini..."
                  className="w-full bg-black/70 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs md:py-3 md:pl-11 md:pr-4 md:text-sm placeholder-neutral-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 focus:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all resize-none font-body text-white"
                />
              </div>
            </div>

            {/* ── Action Button ── */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative group w-full overflow-hidden rounded-xl py-2.5 px-4 md:py-4 md:px-6 font-mono text-xs uppercase tracking-[0.2em] font-bold text-black transition-all duration-300 disabled:opacity-60 cursor-pointer shadow-[0_0_25px_rgba(16,185,129,0.4)]"
            >
              {/* Button Gradient Core */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 transition-all duration-300 group-hover:brightness-110" />

              {/* Laser Scanning Sheen Bar */}
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 group-hover:animate-[spin_4s_linear_infinite]" />

              <div className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Mengirim Pesan...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
