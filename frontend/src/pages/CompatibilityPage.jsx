import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../lib/api.js'

function Input({ label, ...props }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm text-white/70">{label}</div>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-white/25 focus:bg-white/10"
      />
    </label>
  )
}

function ScoreRing({ score }) {
  const circumference = 2 * Math.PI * 44
  const dash = (score / 100) * circumference
  return (
    <div className="relative h-28 w-28">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="10"
          fill="transparent"
        />
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="10"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-2xl font-semibold">{score}%</div>
      </div>
    </div>
  )
}

export function CompatibilityPage() {
  const [aName, setAName] = useState('')
  const [aDob, setADob] = useState('')
  const [bName, setBName] = useState('')
  const [bDob, setBDob] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const lovePhrases = [
    'Asking the universe about your hearts…',
    'Measuring the distance between your stars…',
    'Checking if your signs spark fireworks…',
    'Whispering your names to Venus…',
  ]
  const [loveIndex, setLoveIndex] = useState(0)

  const canSubmit = useMemo(
    () => aName.trim().length >= 2 && bName.trim().length >= 2 && aDob && bDob,
    [aName, bName, aDob, bDob],
  )

  useEffect(() => {
    if (!loading) return
    setLoveIndex(0)
    const id = setInterval(() => {
      setLoveIndex((prev) => (prev + 1) % lovePhrases.length)
    }, 1500)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const startedAt = Date.now()
      const data = await apiFetch('/api/compatibility', {
        method: 'POST',
        body: JSON.stringify({
          personA: { name: aName.trim(), dob: aDob },
          personB: { name: bName.trim(), dob: bDob },
        }),
      })
      const elapsed = Date.now() - startedAt
      const minimumMs = 5000
      if (elapsed < minimumMs) {
        await new Promise((resolve) => setTimeout(resolve, minimumMs - elapsed))
      }
      setResult(data)
    } catch (err) {
      setError(
        err?.message ||
          'Compatibility endpoint not available yet. (We can add it next.)',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="lg:col-span-7"
      >
        <h2 className="text-3xl font-semibold tracking-tight">
          Love compatibility
        </h2>
        <p className="mt-2 max-w-xl text-white/70">
          Enter two birthdays to see how your energies blend, with a playful
          love score and summary.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-6 rounded-3xl border border-pink-400/25 bg-gradient-to-br from-fuchsia-500/20 via-slate-900/60 to-rose-500/25 p-6 backdrop-blur"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/15 bg-black/30 p-4">
              <div className="mb-3 text-sm font-semibold text-white/90">
                Person A
              </div>
              <div className="grid gap-3">
                <Input
                  label="Name"
                  value={aName}
                  onChange={(e) => setAName(e.target.value)}
                  placeholder="e.g. Rahul"
                />
                <Input
                  label="DOB"
                  type="date"
                  value={aDob}
                  onChange={(e) => setADob(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-black/30 p-4">
              <div className="mb-3 text-sm font-semibold text-white/90">
                Person B
              </div>
              <div className="grid gap-3">
                <Input
                  label="Name"
                  value={bName}
                  onChange={(e) => setBName(e.target.value)}
                  placeholder="e.g. Priya"
                />
                <Input
                  label="DOB"
                  type="date"
                  value={bDob}
                  onChange={(e) => setBDob(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error ? (
            <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-pink-400 px-4 py-3 text-sm font-semibold text-black shadow-lg shadow-pink-500/40 transition hover:bg-pink-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && (
              <span className="relative inline-flex h-5 w-5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300/70" />
                <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-rose-600 text-[10px] leading-none text-rose-100">
                  ♥
                </span>
              </span>
            )}
            {loading ? 'Casting your love score…' : 'Check love compatibility'}
          </button>
        </form>
      </motion.section>

      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="lg:col-span-5"
      >
        <div className="relative overflow-hidden rounded-3xl border border-pink-400/30 bg-gradient-to-br from-rose-500/25 via-slate-900/60 to-fuchsia-500/25 p-6 backdrop-blur">
          <div className="pointer-events-none absolute -left-6 top-6 h-16 w-16">
            <motion.div
              animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-full w-full items-center justify-center text-rose-300/70"
            >
              <span className="text-4xl">♥</span>
            </motion.div>
          </div>
          <div className="pointer-events-none absolute -right-4 bottom-2 h-12 w-12">
            <motion.div
              animate={{ y: [0, 6, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-full w-full items-center justify-center text-fuchsia-300/60"
            >
              <span className="text-3xl">♥</span>
            </motion.div>
          </div>

          <div className="relative">
            <div className="text-lg font-semibold">Love result</div>
            <div className="mt-1 text-sm text-white/70">
              For fun only, not a guarantee of soulmates.
            </div>

            {loading ? (
              <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 p-6 text-sm text-white/80">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12">
                    <span className="absolute inset-0 animate-ping rounded-full bg-rose-400/50" />
                    <span className="relative flex h-full w-full items-center justify-center rounded-full bg-rose-600 text-2xl text-rose-100">
                      ♥
                    </span>
                  </div>
                  <div>
                    <div>{lovePhrases[loveIndex]}</div>
                    <div className="mt-1 text-xs text-white/60">
                      Calculating how your signs dance together…
                    </div>
                  </div>
                </div>
              </div>
            ) : !result ? (
              <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 p-6 text-sm text-white/80">
                Submit two birthdays to reveal the love score here.
              </div>
            ) : (
              <div className="mt-6">
                <div className="flex items-center gap-5">
                  <ScoreRing score={result.score ?? result.compatibilityScore} />
                  <div>
                    <div className="text-sm text-white/70">Summary</div>
                    <div className="mt-1 text-white">
                      {result.summary || '—'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </div>
  )
}

