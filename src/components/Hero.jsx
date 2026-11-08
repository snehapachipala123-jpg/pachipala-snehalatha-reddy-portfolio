import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { personalInfo, heroContent } from '../data/portfolioData'

// Dynamically load the hero cut-out portrait if present
const heroImages = import.meta.glob('../assets/hero/hero-portrait.*', {
  eager: true,
  import: 'default',
})
const heroImageSrc = Object.values(heroImages)[0] || ''

export default function Hero() {
  const [displayText, setDisplayText] = useState(
    (personalInfo.brandName || 'SNEHALATHA REDDY').toUpperCase()
  )

  const typographyRef = useRef(null)
  const personRef = useRef(null)
  const subtitleRef = useRef(null)
  const controlsRef = useRef(null)

  // Split role for editorial typography (first word bold, rest light italic)
  const [firstWord, ...restWords] = (personalInfo.role || '').split(' ')

  useEffect(() => {
    // Initial state: lock scrolling and hide entrance elements
    document.body.style.overflow = 'hidden'

    const typoEl = typographyRef.current
    const personEl = personRef.current
    const subtitleEl = subtitleRef.current
    const controlsEl = controlsRef.current

    if (typoEl) {
      gsap.set(typoEl, { top: '50%' })
    }
    if (personEl) {
      gsap.set(personEl, { y: '100vh' })
    }
    if (subtitleEl && controlsEl) {
      gsap.set([subtitleEl, controlsEl], { opacity: 0, y: 50 })
    }

    let scrambleInterval = null
    let startTimeout = null
    let pauseTimeout = null
    let tl = null

    const targetWord = (heroContent.finalWord || 'PORTFOLIO').toUpperCase()
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    const runAnimationTimeline = () => {
      const isMobile = window.innerWidth < 768
      const targetTop = isMobile ? '20%' : '45%'

      tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = 'auto'
        },
      })

      if (typoEl) {
        tl.to(
          typoEl,
          {
            top: targetTop,
            duration: 1.5,
            ease: 'power3.inOut',
          },
          0
        )
      }

      if (personEl) {
        tl.to(
          personEl,
          {
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
          },
          0
        )
      }

      if (subtitleEl && controlsEl) {
        tl.to(
          [subtitleEl, controlsEl],
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
          },
          0.3
        )
      }
    }

    const startScramble = () => {
      let resolvedCount = 0
      const totalLetters = targetWord.length

      scrambleInterval = setInterval(() => {
        let currentString = ''
        for (let i = 0; i < totalLetters; i++) {
          if (i < resolvedCount) {
            currentString += targetWord[i]
          } else {
            currentString += chars[Math.floor(Math.random() * chars.length)]
          }
        }
        setDisplayText(currentString)
      }, 50)

      // Lock in one correct letter from the left every 100ms
      const resolverInterval = setInterval(() => {
        resolvedCount++
        if (resolvedCount > totalLetters) {
          clearInterval(resolverInterval)
          clearInterval(scrambleInterval)
          setDisplayText(targetWord)

          // Pause briefly (0.4s) before playing the entrance timeline
          pauseTimeout = setTimeout(() => {
            runAnimationTimeline()
          }, 400)
        }
      }, 100)
    }

    // Preload image before starting animation sequence
    const initSequence = () => {
      startTimeout = setTimeout(() => {
        startScramble()
      }, 1000)
    }

    if (heroImageSrc) {
      const img = new Image()
      img.src = heroImageSrc
      if (img.complete) {
        initSequence()
      } else {
        img.onload = initSequence
        img.onerror = initSequence
      }
    } else {
      initSequence()
    }

    return () => {
      if (scrambleInterval) clearInterval(scrambleInterval)
      if (startTimeout) clearTimeout(startTimeout)
      if (pauseTimeout) clearTimeout(pauseTimeout)
      if (tl) tl.kill()
      if (typoEl || personEl || subtitleEl || controlsEl) {
        gsap.killTweensOf([typoEl, personEl, subtitleEl, controlsEl])
      }
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <header
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-[#050505] flex items-center justify-center"
    >
      {/* Subtle radial gradient: dark gray in the centre fading into black */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_#1c1c1f_0%,_#050505_70%)]" />

      {/* Subtle black overlay with 2px backdrop blur */}
      <div className="absolute inset-0 pointer-events-none bg-black/10 backdrop-blur-[2px]" />

      {/* Main typography (z-10, behind person) */}
      <div
        ref={typographyRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 pointer-events-none px-4"
      >
        <h1
          className="text-[16vw] md:text-[10rem] 2xl:text-[14rem] font-black uppercase leading-none tracking-tighter select-none bg-gradient-to-b from-[#ffffff] via-[#d4d4d8] to-[#52525b] bg-clip-text text-transparent [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.6))]"
          aria-label={`${personalInfo.brandName} - ${heroContent.finalWord}`}
        >
          <span aria-hidden="true">{displayText}</span>
        </h1>
      </div>

      {/* Person / Hero portrait (z-20, bottom centre) */}
      <div
        ref={personRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-end justify-center"
      >
        {heroImageSrc ? (
          <img
            src={heroImageSrc}
            alt={personalInfo.name}
            className="h-auto w-auto max-h-[88vh] max-w-[72vw] md:max-w-[500px] xl:max-w-[650px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]"
          />
        ) : (
          <div className="text-zinc-500 text-sm mb-12">Portrait Placeholder</div>
        )}
      </div>

      {/* Subtitle and contact controls (z-30, in front of everything) */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-5 px-6 pb-10 md:flex-row md:items-end md:justify-between md:px-[8%] md:pb-[8%] pointer-events-auto">
        {/* Role subtitle */}
        <div
          ref={subtitleRef}
          className="text-center md:text-left text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
        >
          <p className="text-lg md:text-4xl 2xl:text-5xl tracking-tight">
            <span className="font-bold">{firstWord} </span>
            <span className="font-light italic font-serif-accent text-zinc-300">
              {restWords.join(' ')}
            </span>
          </p>
        </div>

        {/* Contact buttons */}
        <div ref={controlsRef} className="flex items-center gap-3">
          <a
            href="#contact"
            aria-label="Contact diagonal shortcut"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md transition-all duration-300 hover:border-lime hover:bg-white/10"
          >
            <svg
              className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>

          <a
            href="#contact"
            className="rounded-full border border-white/20 bg-black/40 px-8 py-3 text-sm md:text-base font-medium tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:border-lime hover:bg-white/10 hover:text-lime"
          >
            {heroContent.ctaLabel}
          </a>
        </div>
      </div>
    </header>
  )
}
