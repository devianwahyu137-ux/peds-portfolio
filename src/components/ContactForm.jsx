import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare, PenTool } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // TODO: Ganti 'YOUR_ACCESS_KEY_HERE' dengan Access Key milikmu dari https://web3forms.com/
          access_key: "36b1d4a7-2bf1-4b20-8494-c0ad74e9caac",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        alert("Message sent successfully to your email!");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full isolate py-16 scroll-mt-20">
      
      {/* Header */}
      <div className="mb-10 flex flex-col items-center text-center">
        <p className="text-emerald-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-2">Message Me</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight relative pb-3 inline-block">
          Get In Touch
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-emerald-500 rounded-full" />
        </h2>
        <p className="text-neutral-400 max-w-lg mx-auto mt-4 text-sm md:text-base">
          Interested in my work, collaboration, or a project discussion? Feel free to reach out below.
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative p-6 md:p-10 rounded-3xl bg-gradient-to-br from-neutral-900/50 to-neutral-950/80 backdrop-blur-xl border border-neutral-800/60 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-900/20 rounded-full blur-[100px] pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-mono text-neutral-400 uppercase tracking-wider ml-1">Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-mono text-neutral-400 uppercase tracking-wider ml-1">Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Subject Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-xs font-mono text-neutral-400 uppercase tracking-wider ml-1">Subject</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                  <PenTool className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Collaboration"
                  className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-mono text-neutral-400 uppercase tracking-wider ml-1">Message</label>
              <div className="relative group">
                <div className="absolute top-3.5 left-0 pl-4 pointer-events-none text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell me about your project..."
                  className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
