import { motion } from "framer-motion"
import { useMemo, useState, useRef, useEffect } from "react"

const DEFAULT_SEGMENTS = [
  "Double luck this week",
  "Unexpected money",
  "New friendship",
  "Time to rest",
  "A bold message pays off",
  "Small risk, big reward",
  "Your secret talent shines",
  "A lucky coincidence appears",
]

export function WheelPage() {
  const segments = useMemo(() => DEFAULT_SEGMENTS, [])
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState("")
  const [rotation, setRotation] = useState(0)

  const timeoutRef = useRef(null)

  const segmentCount = segments.length
  const segmentAngle = 360 / segmentCount

  function spin() {
    if (spinning) return

    const targetIndex = Math.floor(Math.random() * segmentCount)

    // spin 5 full rotations + land on correct segment
    const spinRotation =
      360 * 5 +
      (360 - (targetIndex * segmentAngle + segmentAngle / 2))

    setSpinning(true)
    setResult("")
    setRotation((prev) => prev + spinRotation)

    timeoutRef.current = setTimeout(() => {
      setResult(segments[targetIndex])
      setSpinning(false)
    }, 2200)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      
      {/* Wheel Section */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="lg:col-span-7"
      >
        <h2 className="text-3xl font-semibold tracking-tight">
          Fortune Wheel
        </h2>

        <p className="mt-2 text-white/70 max-w-xl">
          Spin the mystical wheel and see what destiny reveals.
        </p>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">

          {/* Wheel Container */}
          <div className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72 lg:h-80 lg:w-80 max-w-full">

            {/* Pointer */}
            <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2">
              <div className="h-8 w-8 -translate-y-2 rotate-180 text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)]">
                <svg viewBox="0 0 24 24" className="h-full w-full">
                  <path d="M12 2L4 18h16L12 2z" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* Wheel */}
            <motion.div
              animate={{ rotate: rotation }}
              transition={{
                duration: 2,
                ease: [0.12, 0.85, 0.21, 0.99],
              }}
              className="relative flex h-full w-full items-center justify-center rounded-full
              bg-gradient-to-br from-sky-500/40 via-indigo-600/70 to-purple-700/80
              shadow-[0_0_55px_rgba(56,189,248,0.7)]"
            >

              {/* Segments */}
              {segments.map((label, index) => {
                const angle = segmentAngle * index
                const isEven = index % 2 === 0

                return (
                  <div
                    key={label}
                    className="absolute inset-6"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div
                      className={`absolute inset-y-4 right-1/2 origin-right
                      rounded-l-full px-4 py-1.5 text-[11px] font-medium text-white/90
                      ${isEven ? "bg-white/10" : "bg-black/15"}`}
                    >
                      <div
                        className="w-32 -rotate-90 text-center leading-tight"
                        style={{ transformOrigin: "center" }}
                      >
                        {label}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Center hub */}
              <div className="relative z-10 grid h-20 w-20 place-items-center rounded-full bg-slate-950/90 shadow-[0_0_25px_rgba(15,23,42,0.9)]">
                <div className="text-[11px] font-semibold tracking-wide text-slate-100">
                  SPIN
                </div>
              </div>

            </motion.div>

            {/* Result Text */}
            <div className="mt-4 text-center text-sm text-white/80">
              {result
                ? result
                : spinning
                ? "The wheel is listening to your luck…"
                : "Tap spin to let fate choose your fortune."}
            </div>

          </div>

          {/* Spin Button */}
          <button
            onClick={spin}
            disabled={spinning}
            className="mt-6 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black
            transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {spinning ? "Spinning..." : "Spin the Wheel"}
          </button>

        </div>
      </motion.section>

      {/* Outcome List */}
      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="lg:col-span-5"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="text-lg font-semibold">
            Possible Outcomes
          </div>

          <div className="mt-1 text-sm text-white/70">
            Future versions can fetch these from the API.
          </div>

          <div className="mt-5 grid gap-2">
            {segments.map((s) => (
              <div
                key={s}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </motion.aside>

    </div>
  )
}