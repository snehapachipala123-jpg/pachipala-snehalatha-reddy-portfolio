import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutContent, skillRows } from '../data/portfolioData'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Dynamically import about portrait
const aboutImages = import.meta.glob('../assets/about/about-portrait.*', {
  eager: true,
  import: 'default',
})
const aboutImageSrc = Object.values(aboutImages)[0] || ''

export default function About() {
  const sectionRef = useRef(null)
  const mobileHeadingRef = useRef(null)
  const desktopHeadingRef = useRef(null)
  const cardRef = useRef(null)

  // Split paragraph into words and identify highlighted terms
  const wordsArray = (aboutContent.paragraph || '').split(/\s+/).filter(Boolean)
  const highlightsSet = new Set(
    (aboutContent.highlights || []).map((h) => h.toLowerCase())
  )

  useEffect(() => {
    const cardEl = cardRef.current
    const mobileHeadingEl = mobileHeadingRef.current
    const desktopHeadingEl = desktopHeadingRef.current

    const ctx = gsap.context(() => {
      // 1. Mobile heading entrance
      if (mobileHeadingEl) {
        gsap.fromTo(
          mobileHeadingEl,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mobileHeadingEl,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      // 2. Desktop heading entrance
      if (desktopHeadingEl) {
        gsap.fromTo(
          desktopHeadingEl,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: desktopHeadingEl,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      // 3. Word-by-word progressive reading reveal
      if (cardEl) {
        const words = cardEl.querySelectorAll('[data-word]')
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { color: '#52525b', opacity: 0.2 },
            {
              color: (i, el) =>
                el.dataset.highlight === 'true' ? '#ffffff' : '#d4d4d8',
              opacity: 1,
              stagger: 0.1,
              ease: 'none',
              scrollTrigger: {
                trigger: cardEl,
                start: 'top 85%',
                end: 'bottom 50%',
                scrub: true,
              },
            }
          )
        }
      }
    }, sectionRef)

    // Layout refresh on window load and after font/image render (600ms)
    const handleLoad = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('load', handleLoad)
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 600)

    return () => {
      window.removeEventListener('load', handleLoad)
      clearTimeout(refreshTimer)
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white overflow-hidden"
    >
      {/* Intro Main Container */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-24 md:py-32 min-h-screen flex flex-col justify-center">
        {/* Mobile Heading (Centered above content) */}
        <div ref={mobileHeadingRef} className="block md:hidden text-center mb-10">
          <h2 className="text-[18vw] sm:text-8xl font-black uppercase leading-[0.85] tracking-tighter select-none bg-gradient-to-b from-[#ffffff] via-[#d4d4d8] to-[#52525b] bg-clip-text text-transparent [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.6))]">
            {aboutContent.heading}
          </h2>
        </div>

        {/* Two-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Portrait */}
          <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-start">
            {aboutImageSrc ? (
              <img
                src={aboutImageSrc}
                alt="PACHIPALA SNEHALATHA REDDY — DATA ANALYTICS, TAP Academy student"
                className="w-[190px] sm:w-[220px] md:w-[260px] h-auto object-contain [filter:drop-shadow(0_30px_50px_rgba(0,0,0,0.7))]"
              />
            ) : (
              <div className="w-[190px] h-[250px] border border-white/20 rounded-2xl flex items-center justify-center text-zinc-500 text-sm">
                Portrait Placeholder
              </div>
            )}
          </div>

          {/* Right Column: Heading & Glass Card */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col">
            {/* Desktop Heading (Above Card) */}
            <div ref={desktopHeadingRef} className="hidden md:block mb-6 lg:mb-8">
              <h2 className="text-7xl lg:text-[9rem] xl:text-[11rem] font-black uppercase leading-[0.85] tracking-tighter select-none bg-gradient-to-b from-[#ffffff] via-[#d4d4d8] to-[#52525b] bg-clip-text text-transparent [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.6))]">
                {aboutContent.heading}
              </h2>
            </div>

            {/* Glass About Card */}
            <div
              ref={cardRef}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 md:p-10 transition-colors duration-500 hover:bg-white/[0.08]"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 text-center md:text-left">
                {aboutContent.greeting}
              </h3>
              <p className="font-light text-base md:text-xl leading-relaxed text-center md:text-left text-[#d4d4d8]">
                {wordsArray.map((word, idx) => {
                  const cleanWord = word.replace(/[^\w-]/g, '').toLowerCase()
                  const isHighlight = highlightsSet.has(cleanWord)

                  return (
                    <span
                      key={idx}
                      data-word="true"
                      data-highlight={isHighlight ? 'true' : 'false'}
                      className={`inline-block mr-[0.28em] ${
                        isHighlight ? 'font-semibold' : ''
                      }`}
                      style={{ color: '#52525b', opacity: 0.2 }}
                    >
                      {word}
                    </span>
                  )
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Skills Marquee */}
      <div className="w-full bg-[#030303] border-t border-white/5 py-10 md:py-14 space-y-6 md:space-y-8 overflow-hidden">
        {skillRows.map((row, rIdx) => {
          const isOdd = rIdx % 2 === 0
          // Repeat items 3 times in each half to ensure seamless track coverage
          const halfItems = [...row.items, ...row.items, ...row.items]

          return (
            <div key={row.label || rIdx} className="relative w-full overflow-hidden flex items-center">
              {/* Pinned Label on Left with subtle fade out */}
              <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-6 md:pl-12 pr-6 md:pr-10 bg-gradient-to-r from-[#030303] via-[#030303]/95 to-transparent pointer-events-none">
                <span className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white font-bold select-none whitespace-nowrap">
                  {row.label}
                </span>
              </div>

              {/* Seamless Scrolling Track */}
              <div
                className={`flex w-max ${
                  isOdd ? 'marquee-right' : 'marquee-left'
                }`}
              >
                {/* First Half */}
                <div className="flex items-center shrink-0">
                  {halfItems.map((skill, sIdx) => (
                    <span key={sIdx} className="flex items-center">
                      <span className="text-zinc-500 font-medium tracking-wider text-sm md:text-lg whitespace-nowrap hover:text-white transition-colors duration-300">
                        {skill}
                      </span>
                      <span className="text-zinc-700 mx-4 md:mx-6 select-none font-bold">
                        ·
                      </span>
                    </span>
                  ))}
                </div>

                {/* Duplicated Second Half for Seamless Loop */}
                <div className="flex items-center shrink-0" aria-hidden="true">
                  {halfItems.map((skill, sIdx) => (
                    <span key={sIdx} className="flex items-center">
                      <span className="text-zinc-500 font-medium tracking-wider text-sm md:text-lg whitespace-nowrap hover:text-white transition-colors duration-300">
                        {skill}
                      </span>
                      <span className="text-zinc-700 mx-4 md:mx-6 select-none font-bold">
                        ·
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
