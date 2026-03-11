import { useEffect, useState } from 'react'
import { CrystalBall } from './CrystalBall.jsx'

const MESSAGES = [
  'Reading the cosmic energy around your birth chart…',
  'Aligning the stars with your name and numbers…',
  'Listening for whispers from your future self…',
  'The universe is revealing your destiny…',
  'Interpreting the symbols written between the constellations…',
]

export function FortuneLoadingScreen({ hasResult, onDone }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length)
    }, 1500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!hasResult) return
    const id = setTimeout(() => {
      onDone?.()
    }, 5000)
    return () => clearTimeout(id)
  }, [hasResult, onDone])

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[radial-gradient(circle_at_center,#3c1a5b,#09051f)]">
      {/* Purple clouds */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="fortune-cloud left-[-10%] top-[10%]" />
        <div className="fortune-cloud right-[-15%] top-[40%]" />
        <div className="fortune-cloud left-[20%] bottom-[-10%]" />
        <div className="fortune-cloud right-[10%] bottom-[5%]" />
      </div>

      {/* Sparkles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="fortune-sparkle left-[18%] top-[30%]" />
        <div className="fortune-sparkle left-[65%] top-[22%]" />
        <div className="fortune-sparkle left-[52%] top-[65%]" />
        <div className="fortune-sparkle left-[30%] top-[70%]" />
      </div>

      <div className="relative flex max-w-md flex-col items-center px-6 text-center text-white">
        <div className="mb-6 text-xs uppercase tracking-[0.3em] text-violet-200/80">
          The Destiny Whisper
        </div>

        <div className="relative mb-6">
          <div className="absolute -inset-12 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="relative">
            <CrystalBall size={150} />
          </div>
        </div>

        <div className="mt-2 text-sm text-violet-100/80">
          {MESSAGES[index]}
        </div>
        <div className="mt-3 text-xs text-violet-200/70">
          Please wait a moment while your fortune is being prepared…
        </div>
      </div>
    </div>
  )
}

