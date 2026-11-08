import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { servicesContent } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const [activeService, setActiveService] = useState(null)
  const [, setIsMobile] = useState(false)

  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  // Track viewport width for responsive behaviors
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // GSAP ScrollTrigger entrance animation on heading
  useEffect(() => {
    const headingEl = headingRef.current

    const ctx = gsap.context(() => {
      if (headingEl) {
        gsap.fromTo(
          headingEl,
          { y: -100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingEl,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleService = (index) => {
    setActiveService((prev) => (prev === index ? null : index))
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white px-6 md:px-12 py-24 md:py-32 overflow-hidden"
    >
      {/* Top-Right Giant Editorial Heading */}
      <div ref={headingRef} className="ml-auto text-right mb-16 md:mb-24">
        <h2 className="text-4xl sm:text-6xl md:text-[6.5rem] lg:text-[7.5rem] font-black uppercase leading-[0.88] tracking-tighter select-none bg-gradient-to-b from-[#ffffff] via-[#d4d4d8] to-[#52525b] bg-clip-text text-transparent [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.6))]">
          {servicesContent.headingLines.map((line, idx) => (
            <span key={idx} className="block">
              {line}
            </span>
          ))}
        </h2>
      </div>

      {/* Accordion List */}
      <div className="w-full border-t border-white/20">
        {servicesContent.items.map((item, index) => {
          const isOpen = activeService === index
          const serviceNumber = String(index + 1).padStart(2, '0')

          return (
            <div
              key={item.title || index}
              className={`group border-b border-white/20 transition-colors duration-300 ${
                isOpen
                  ? 'bg-[#CCFF00] text-black'
                  : 'bg-transparent text-white md:hover:bg-[#CCFF00] md:hover:text-black'
              }`}
            >
              {/* Row Header Button */}
              <button
                type="button"
                onClick={() => toggleService(index)}
                aria-expanded={isOpen}
                aria-controls={`service-content-${index}`}
                id={`service-header-${index}`}
                className="w-full text-left py-6 md:py-9 px-4 md:px-8 flex items-center justify-between gap-4 transition-colors duration-300 cursor-pointer"
              >
                {/* Number */}
                <span
                  className={`w-12 md:w-20 shrink-0 font-mono text-sm md:text-xl font-bold transition-colors duration-300 ${
                    isOpen
                      ? 'text-black'
                      : 'text-zinc-400 group-hover:text-black'
                  }`}
                >
                  {serviceNumber}
                </span>

                {/* Service Title */}
                <span
                  className={`text-lg md:text-3xl lg:text-[2.75rem] font-light tracking-tight truncate flex-1 text-left uppercase transition-colors duration-300 ${
                    isOpen ? 'text-black' : 'text-white group-hover:text-black'
                  }`}
                >
                  {item.title}
                </span>

                {/* Outlined Arrow Icon */}
                <svg
                  viewBox="0 0 48 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-6 h-6 md:w-10 md:h-10 shrink-0 transition-transform duration-300 ease-out ${
                    isOpen ? '-rotate-45' : 'rotate-45'
                  } ${
                    isOpen
                      ? 'text-black'
                      : 'text-[#CCFF00] group-hover:text-black'
                  }`}
                  aria-hidden="true"
                >
                  <path d="M2 12h42M34 3l10 9-10 9" />
                </svg>
              </button>

              {/* Collapsible Content Wrapper via CSS Grid Rows */}
              <div
                id={`service-content-${index}`}
                role="region"
                aria-labelledby={`service-header-${index}`}
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pt-4 pb-8 md:pt-6 md:pb-12 pl-16 md:pl-28 pr-6 md:pr-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
                      {/* Left: Capability List */}
                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold mb-4 opacity-75">
                          Capabilities
                        </h4>
                        <ul className="space-y-3">
                          {item.capabilities.map((cap, capIdx) => (
                            <li
                              key={capIdx}
                              className="flex items-start gap-3 text-sm md:text-base font-light leading-relaxed"
                            >
                              <span className="w-2 h-2 mt-2 bg-black shrink-0" />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Description & Optional CTA */}
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <h4 className="text-xs uppercase tracking-widest font-bold mb-4 opacity-75">
                            Overview
                          </h4>
                          <p className="max-w-xl text-sm md:text-lg font-light leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* CTA button (if present) */}
                        {item.cta && (
                          <div className="mt-8 pt-2">
                            <div className="relative inline-block">
                              {/* 4 technical corner marks */}
                              <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-black pointer-events-none" />
                              <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-black pointer-events-none" />
                              <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-black pointer-events-none" />
                              <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-black pointer-events-none" />

                              <a
                                href={item.cta.href || '#projects'}
                                className="inline-block bg-black text-[#CCFF00] font-bold text-xs tracking-widest uppercase px-10 py-3.5 transition-colors duration-200 hover:bg-neutral-900"
                              >
                                {item.cta.label}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
