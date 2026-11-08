import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  personalInfo,
  socialLinks,
  contactContent,
  emailjsConfig,
} from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const infoRef = useRef(null)
  const socialRef = useRef(null)
  const formRef = useRef(null)

  // GSAP ScrollTrigger entrance timeline
  useEffect(() => {
    const headingEl = headingRef.current
    const infoEl = infoRef.current
    const socialEl = socialRef.current
    const formEl = formRef.current

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      // 1. Heading slide & fade
      if (headingEl) {
        tl.fromTo(
          headingEl,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        )
      }

      // 2. Contact info items reveal
      if (infoEl) {
        const infoItems = infoEl.querySelectorAll('[data-contact-item]')
        if (infoItems.length > 0) {
          tl.fromTo(
            infoItems,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
            },
            '-=0.6'
          )
        }
      }

      // 3. Social icons scale & fade
      if (socialEl) {
        const icons = socialEl.querySelectorAll('[data-social-icon]')
        if (icons.length > 0) {
          tl.fromTo(
            icons,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out',
            },
            '-=0.4'
          )
        }
      }

      // 4. Form fields slide up with stagger
      if (formEl) {
        const fields = formEl.querySelectorAll('[data-form-field]')
        if (fields.length > 0) {
          tl.fromTo(
            fields,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
            },
            '-=0.5'
          )
        }

        // 5. Submit button fade in
        const btn = formEl.querySelector('[data-submit-btn]')
        if (btn) {
          tl.fromTo(
            btn,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.3'
          )
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Handle form submission with EmailJS or mailto fallback
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const isConfigured =
      emailjsConfig.serviceId &&
      emailjsConfig.templateId &&
      emailjsConfig.publicKey &&
      emailjsConfig.serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
      emailjsConfig.templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
      emailjsConfig.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY'

    if (!isConfigured) {
      // Fallback: trigger user's native email client with pre-filled content
      const fd = new FormData(formRef.current)
      const name = fd.get('user_name') || ''
      const email = fd.get('user_email') || ''
      const phone = fd.get('user_phone') || ''
      const subject = fd.get('subject') || 'Portfolio Inquiry'
      const message = fd.get('message') || ''

      const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`

      window.open(mailtoUrl, '_blank')
      setStatus('success')
      if (formRef.current) formRef.current.reset()

      setTimeout(() => {
        setStatus('idle')
      }, 4000)
      return
    }

    try {
      setStatus('sending')
      const emailjs = await import('@emailjs/browser')
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey
      )
      setStatus('success')
      if (formRef.current) formRef.current.reset()
    } catch (err) {
      console.error('EmailJS submission error:', err)
      setStatus('error')
    } finally {
      setTimeout(() => {
        setStatus('idle')
      }, 4000)
    }
  }

  // Social icon items list
  const socialItems = [
    {
      key: 'instagram',
      label: 'Instagram',
      url: socialLinks.instagram,
      icon: (
        <svg
          className="w-4 h-4 fill-none stroke-current"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      key: 'youtube',
      label: 'YouTube',
      url: socialLinks.youtube,
      icon: (
        <svg
          className="w-4 h-4 fill-currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      url: socialLinks.linkedin,
      icon: (
        <svg
          className="w-4 h-4 fill-currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24m1.39 9.74v-8.37H5.07v8.37h2.78z" />
        </svg>
      ),
    },
    {
      key: 'github',
      label: 'GitHub',
      url: socialLinks.github,
      icon: (
        <svg
          className="w-4 h-4 fill-currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white px-6 md:px-16 py-24 md:py-32 overflow-hidden flex items-center"
    >
      {/* Diffused Neon-Green Horizon Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[450px] pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_rgba(120,200,40,0.18)_0%,_transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start">
        {/* Left Column: Heading & Contact Details */}
        <div>
          {/* Main Heading */}
          <div ref={headingRef}>
            <h2 className="text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-none tracking-tighter select-none mb-12 bg-gradient-to-b from-[#ffffff] via-[#d4d4d8] to-[#52525b] bg-clip-text text-transparent [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.6))]">
              {contactContent.heading}
            </h2>
          </div>

          {/* Contact Details */}
          <div ref={infoRef} className="space-y-6 mb-12">
            {/* Email */}
            <div data-contact-item>
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono mb-1 block">
                Email:
              </span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-white text-lg sm:text-xl font-medium tracking-wide hover:text-lime transition-colors block"
              >
                {personalInfo.email}
              </a>
            </div>

            {/* Phone (conditional) */}
            {personalInfo.phone && (
              <div data-contact-item>
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono mb-1 block">
                  Phone:
                </span>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                  className="text-white text-lg sm:text-xl font-medium tracking-wide hover:text-lime transition-colors block"
                >
                  {personalInfo.phone}
                </a>
              </div>
            )}
          </div>

          {/* Social Icons Row */}
          <div ref={socialRef}>
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono mb-3 block">
              {contactContent.followLabel}
            </span>
            <div className="flex items-center gap-3 flex-wrap">
              {socialItems.map((item) => {
                if (!item.url) return null
                return (
                  <a
                    key={item.key}
                    data-social-icon
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:scale-110 hover:border-lime hover:text-lime hover:shadow-[0_0_15px_rgba(204,255,0,0.25)]"
                  >
                    {item.icon}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Minimalist Form */}
        <div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full space-y-5"
          >
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              <div data-form-field>
                <label
                  htmlFor="user_name"
                  className="text-xs text-zinc-400 font-medium mb-1.5 block tracking-wide"
                >
                  Your Name <span className="text-lime">*</span>
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  placeholder="Your full name"
                  className="w-full bg-[#111111] border border-white/10 rounded-[10px] px-4 py-3.5 text-white text-sm md:text-base placeholder:text-zinc-600 focus:outline-none focus:border-white/25 focus:ring-1 focus:ring-[#CCFF00]/40 transition-all duration-200"
                />
              </div>

              <div data-form-field>
                <label
                  htmlFor="user_email"
                  className="text-xs text-zinc-400 font-medium mb-1.5 block tracking-wide"
                >
                  Email address <span className="text-lime">*</span>
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  placeholder="Your email address"
                  className="w-full bg-[#111111] border border-white/10 rounded-[10px] px-4 py-3.5 text-white text-sm md:text-base placeholder:text-zinc-600 focus:outline-none focus:border-white/25 focus:ring-1 focus:ring-[#CCFF00]/40 transition-all duration-200"
                />
              </div>
            </div>

            {/* Row 2: Phone + Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              <div data-form-field>
                <label
                  htmlFor="user_phone"
                  className="text-xs text-zinc-400 font-medium mb-1.5 block tracking-wide"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="user_phone"
                  name="user_phone"
                  placeholder="Your phone number"
                  className="w-full bg-[#111111] border border-white/10 rounded-[10px] px-4 py-3.5 text-white text-sm md:text-base placeholder:text-zinc-600 focus:outline-none focus:border-white/25 focus:ring-1 focus:ring-[#CCFF00]/40 transition-all duration-200"
                />
              </div>

              <div data-form-field>
                <label
                  htmlFor="subject"
                  className="text-xs text-zinc-400 font-medium mb-1.5 block tracking-wide"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  className="w-full bg-[#111111] border border-white/10 rounded-[10px] px-4 py-3.5 text-white text-sm md:text-base placeholder:text-zinc-600 focus:outline-none focus:border-white/25 focus:ring-1 focus:ring-[#CCFF00]/40 transition-all duration-200"
                />
              </div>
            </div>

            {/* Row 3: Message */}
            <div data-form-field>
              <label
                htmlFor="message"
                className="text-xs text-zinc-400 font-medium mb-1.5 block tracking-wide"
              >
                Message <span className="text-lime">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Write something...."
                className="w-full bg-[#111111] border border-white/10 rounded-[10px] px-4 py-3.5 text-white text-sm md:text-base placeholder:text-zinc-600 focus:outline-none focus:border-white/25 focus:ring-1 focus:ring-[#CCFF00]/40 transition-all duration-200 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div data-submit-btn className="pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-white text-black font-semibold rounded-[9px] py-3.5 px-6 transition-colors duration-200 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === 'sending' ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </div>

            {/* Status Feedback Message */}
            <p
              role="status"
              className={`text-sm text-center font-medium transition-opacity duration-300 ${
                status === 'success'
                  ? 'text-lime opacity-100'
                  : status === 'error'
                  ? 'text-red-400 opacity-100'
                  : 'opacity-0 h-0 pointer-events-none'
              }`}
            >
              {status === 'success' && 'Message sent successfully!'}
              {status === 'error' && 'Failed to send message. Please try again.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
