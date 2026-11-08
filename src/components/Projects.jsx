import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projectsContent } from '../data/portfolioData'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Load all project images dynamically
const projectImages = import.meta.glob(
  '../assets/projects/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, import: 'default' }
)

function getProjectImage(id) {
  for (const [filePath, mod] of Object.entries(projectImages)) {
    const filename = filePath.split('/').pop().split('.')[0]
    if (filename === id) {
      return mod
    }
  }
  return null
}

// Helper to parse words wrapped in *asterisks* into light italic serif
function renderTitleLine(line) {
  const parts = line.split(/(\*[^*]+\*)/g)
  return parts.map((part, pIdx) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      const word = part.slice(1, -1).toLowerCase()
      return (
        <span
          key={pIdx}
          className="font-[family-name:var(--font-serif-accent)] font-light italic text-[#9CA3AF] lowercase tracking-normal mx-1"
        >
          {word}
        </span>
      )
    }
    return <span key={pIdx}>{part}</span>
  })
}

export default function Projects({ onCtaClick = () => {} }) {
  const sectionRef = useRef(null)
  const projectRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((el) => {
        if (!el) return
        const imgEl = el.querySelector('[data-project-image]')
        const textElements = el.querySelectorAll('[data-project-animate]')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        })

        if (imgEl) {
          tl.fromTo(
            imgEl,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
          )
        }

        if (textElements.length > 0) {
          tl.fromTo(
            textElements,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.12,
              ease: 'power3.out',
            },
            '-=0.7'
          )
        }
      })
    }, sectionRef)

    const handleLoad = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('load', handleLoad)
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white px-6 md:px-16 pt-20 pb-24 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 md:mb-32">
          {/* Left Giant Title */}
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter select-none">
              <span className="bg-gradient-to-b from-[#ffffff] via-[#d4d4d8] to-[#52525b] bg-clip-text text-transparent [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.6))]">
                {projectsContent.headingMain}
              </span>
              <span className="font-[family-name:var(--font-serif-accent)] font-light italic text-[#9CA3AF] lowercase tracking-normal ml-3 md:ml-5">
                {projectsContent.headingAccent}
              </span>
            </h2>
          </div>

          {/* Right Description & Read More */}
          <div className="max-w-[400px]">
            <p className="text-sm md:text-base font-light text-[#9CA3AF] leading-relaxed mb-4">
              {projectsContent.description}
            </p>
            {projectsContent.readMore && (
              <a
                href={projectsContent.readMore.href}
                className="inline-block bg-[#CCFF00] text-black border border-[#CCFF00] rounded-full text-xs font-semibold uppercase tracking-wider px-6 py-2.5 transition-colors duration-300 hover:bg-[#b3e600] hover:border-[#b3e600]"
              >
                {projectsContent.readMore.label} ↗
              </a>
            )}
          </div>
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-24 md:gap-40">
          {projectsContent.items.map((item, index) => {
            const imgSrc = getProjectImage(item.id)
            const isEven = index % 2 === 0

            return (
              <article
                key={item.id || index}
                ref={(el) => (projectRefs.current[index] = el)}
                className="group w-full"
              >
                {/* CSS Grid for Mobile (always Number -> Title -> Image -> Body) and Desktop (alternating columns) */}
                <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-16 items-center">
                  {/* Head: Number + Title */}
                  <div
                    data-project-animate
                    className={`col-span-1 row-start-1 mb-4 md:mb-6 self-end ${
                      isEven
                        ? 'md:col-start-8 md:col-span-5 md:row-start-1'
                        : 'md:col-start-1 md:col-span-5 md:row-start-1'
                    }`}
                  >
                    <span className="text-xs md:text-sm font-mono font-bold uppercase tracking-[0.3em] text-[#CCFF00] mb-3 block">
                      {item.number}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-[clamp(1.9rem,3.2vw,3.5rem)] font-black uppercase leading-[1.05] tracking-tight text-white">
                      {item.title.map((line, lIdx) => (
                        <span key={lIdx} className="block">
                          {renderTitleLine(line)}
                        </span>
                      ))}
                    </h3>
                  </div>

                  {/* Image Block */}
                  <div
                    data-project-image
                    className={`col-span-1 row-start-2 my-6 md:my-0 ${
                      isEven
                        ? 'md:col-start-1 md:col-span-7 md:row-start-1 md:row-span-2'
                        : 'md:col-start-6 md:col-span-7 md:row-start-1 md:row-span-2'
                    }`}
                  >
                    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[3px] bg-zinc-900">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={item.title.join(' ')}
                          loading="lazy"
                          className="w-full h-full object-cover rounded-[3px] opacity-90 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col items-center justify-center p-6 text-center select-none border border-white/5">
                          <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.3em] mb-2 font-bold">
                            {item.number}
                          </span>
                          <span className="text-zinc-500 font-mono text-sm tracking-wider uppercase">
                            {item.id}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Body: Description + Buttons */}
                  <div
                    data-project-animate
                    className={`col-span-1 row-start-3 self-start ${
                      isEven
                        ? 'md:col-start-8 md:col-span-5 md:row-start-2'
                        : 'md:col-start-1 md:col-span-5 md:row-start-2'
                    }`}
                  >
                    <p className="text-sm md:text-base font-light text-[#9CA3AF] leading-[1.7] max-w-[500px] mb-8">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-3 flex-wrap">
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => onCtaClick('live', item)}
                          className="inline-flex items-center rounded-full bg-[#CCFF00] text-black border border-[#CCFF00] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 hover:bg-[#b3e600] hover:border-[#b3e600]"
                        >
                          Live Demo ↗
                        </a>
                      )}

                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => onCtaClick('github', item)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                        >
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            />
                          </svg>
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
