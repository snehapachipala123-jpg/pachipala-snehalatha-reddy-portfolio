import {
  personalInfo,
  socialLinks,
  footerContent,
  academy,
} from '../data/portfolioData'

// Load the footer background asset dynamically
const footerImages = import.meta.glob('../assets/footer/footer-bg.*', {
  eager: true,
  import: 'default',
})
const footerImageSrc = Object.values(footerImages)[0] || ''

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Social links (filter out empty strings)
  const socialEntries = [
    { label: 'Instagram', url: socialLinks.instagram },
    { label: 'YouTube', url: socialLinks.youtube },
    { label: 'LinkedIn', url: socialLinks.linkedin },
    { label: 'GitHub', url: socialLinks.github },
  ].filter((item) => Boolean(item.url))

  return (
    <footer
      className="relative w-full min-h-screen bg-[#050505] text-white overflow-hidden flex flex-col justify-between pt-24 md:pt-32"
      style={{
        backgroundImage: footerImageSrc
          ? `url("${footerImageSrc}")`
          : 'radial-gradient(ellipse at bottom, rgba(120,220,40,0.35) 0%, transparent 70%)',
        backgroundPosition: 'center bottom',
        backgroundSize: '160%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Top Black Gradient Overlay for Maximum Readability */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-black/70 to-transparent"
        aria-hidden="true"
      />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 flex-1 flex flex-col justify-between">
        {/* Top Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 md:mb-20">
          {/* Left: Connect & Nav Links */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 block">
              {footerContent.connectLabel}
            </span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-[clamp(1.4rem,4vw,3rem)] font-semibold text-white/90 hover:text-lime transition-colors block mb-8 break-all tracking-tight"
            >
              {personalInfo.email}
            </a>

            {/* Navigation links */}
            <nav aria-label="Footer Navigation" className="flex items-center flex-wrap gap-2 text-sm font-medium text-zinc-400">
              {footerContent.navLinks.map((link, idx) => (
                <span key={link.label} className="inline-flex items-center">
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                  {idx < footerContent.navLinks.length - 1 && (
                    <span className="mx-2.5 text-zinc-600 select-none font-bold">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </nav>
          </div>

          {/* Right: CTA Block */}
          <div className="md:text-right md:flex md:flex-col md:items-end">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              {footerContent.ctaHeading}
            </h3>
            <p className="text-zinc-400 font-light text-sm md:text-base max-w-md mb-8 md:text-right leading-relaxed">
              {footerContent.ctaText}
            </p>
            <a
              href="#contact"
              className="inline-block bg-white text-black font-semibold rounded-full px-8 py-3.5 text-sm transition-all duration-300 hover:scale-105 hover:bg-zinc-200 cursor-pointer shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
            >
              {footerContent.ctaLabel}
            </a>
          </div>
        </div>

        {/* Social Links Row */}
        <div className="border-t border-white/10 pt-8 pb-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {socialEntries.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base font-medium text-zinc-400 hover:text-white transition-colors uppercase tracking-widest"
              >
                {item.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Huge Brand Typography Signature */}
        <div className="w-full overflow-hidden text-center my-8 md:my-16 select-none">
          <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-none text-white whitespace-nowrap">
            {personalInfo.brandName}
          </h2>
        </div>

        {/* Bottom Minimal Row */}
        <div className="border-t border-white/10 py-8 text-xs text-zinc-500 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright & TAP Academy Credit */}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-center md:text-left justify-center md:justify-start">
            <span>
              © {currentYear} {personalInfo.name}. All Rights Reserved.
            </span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span>
              Trained at{' '}
              <a
                href={academy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                {academy.name}
              </a>
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <a
              href="#home"
              className="hover:text-zinc-300 transition-colors duration-200"
            >
              Privacy policy
            </a>
            <a
              href="#home"
              className="hover:text-zinc-300 transition-colors duration-200"
            >
              Terms and conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
