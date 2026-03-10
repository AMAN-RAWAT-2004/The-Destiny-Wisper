import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../lib/api.js'
import { CrystalBall } from '../components/CrystalBall.jsx'

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

function Select({ label, children, ...props }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm text-white/70">{label}</div>
      <select
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/25 focus:bg-white/10"
      >
        {children}
      </select>
    </label>
  )
}

export function HomePage() {
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadingPhrases = [
    'Consulting the stars about you…',
    'Guessing your next lucky twist…',
    'Whispering your destiny to the cosmos…',
    'Aligning your zodiac and numbers…',
  ]
  const [loadingIndex, setLoadingIndex] = useState(0)

  const canSubmit = useMemo(() => name.trim().length >= 2 && !!dob, [name, dob])

  useEffect(() => {
    if (!loading) return
    setLoadingIndex(0)
    const id = setInterval(() => {
      setLoadingIndex((prev) => (prev + 1) % loadingPhrases.length)
    }, 1400)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const startedAt = Date.now()
      const data = await apiFetch('/api/fortune', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          dob,
          gender: gender || undefined,
        }),
      })
      const qrId = data?.fortune?.qrId
      if (!qrId) throw new Error('Missing qrId from server response.')

      const elapsed = Date.now() - startedAt
      const minimumMs = 5000
      if (elapsed < minimumMs) {
        await new Promise((resolve) => setTimeout(resolve, minimumMs - elapsed))
      }

      nav(`/fortune/${qrId}`, { state: data })
    } catch (err) {
      setError(err?.message || 'Failed to generate fortune.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-7"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
          Astrology + randomness + a bit of drama
        </div>

        <div className="mt-4 flex flex-wrap items-start gap-6">
          <div className="flex-1 min-w-[220px]">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Discover your destiny.
            </h1>
            <p className="mt-4 max-w-xl text-white/70">
              Enter your name and date of birth to reveal your zodiac sign, love
              insights, lucky numbers, and a QR destiny message you can share.
            </p>
          </div>
          <div className="shrink-0">
            <CrystalBall size={130} subtle />
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="text-sm font-medium">Viral QR reveal</div>
            <div className="mt-1 text-sm text-white/70">
              Scan to open the same fortune on another device.
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="text-sm font-medium">Shareable fortune card</div>
            <div className="mt-1 text-sm text-white/70">
              Download a clean card image for socials.
            </div>
          </div>
        </div>
      </motion.section>

      <motion.aside
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="lg:col-span-5"
      >
        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <div className="text-lg font-semibold">Get your fortune</div>
          <div className="mt-1 text-sm text-white/70">
            Fun predictions generated from your birth date.
          </div>

          {loading ? (
            <div className="mt-6 flex flex-col items-center gap-4 py-4">
              <CrystalBall size={120} />
              <div className="text-sm text-white/80">
                {loadingPhrases[loadingIndex]}
              </div>
              <div className="text-xs text-white/50">
                This may take about five seconds…
              </div>
            </div>
          ) : (
            <div className="mt-5 grid gap-4">
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aman"
                autoComplete="name"
              />
              <Input
                label="Date of birth"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <Select
                label="Gender (optional)"
                
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" className="text-black">Prefer not to say</option>
                <option value="female" className="text-black">Female</option>
                <option value="male" className="text-black">Male</option>
                <option value="nonbinary" className="text-black">Non-binary</option>
              </Select>
            </div>
          )}

          {error ? (
            <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && (
              <span className="relative inline-flex h-5 w-5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400/60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-700" />
              </span>
            )}
            {loading ? 'Reading the stars…' : 'Reveal my fortune'}
          </button>

          <div className="mt-3 text-xs text-white/50">
            Tip: make sure your backend is running on port 4000.
          </div>
        </form>
      </motion.aside>
    </div>
  )
}

