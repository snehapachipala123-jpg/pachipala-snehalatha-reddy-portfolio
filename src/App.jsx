import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'

export default function App() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Hero />
      <About />
      <Services />
    </main>
  )
}
