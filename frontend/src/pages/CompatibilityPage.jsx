import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'
import { QRCodeCanvas } from 'qrcode.react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const rid = searchParams.get('rid')?.trim() || ''

  const [aName, setAName] = useState('')
  const [aDob, setADob] = useState('')
  const [bName, setBName] = useState('')
  const [bDob, setBDob] = useState('')
  const [aGender, setAGender] = useState('')
  const [bGender, setBGender] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [downloading, setDownloading] = useState(false)
  const cardRef = useRef(null)

  const lovePhrases = [
    'Scrying the crystal for your hearts…',
    'Listening for Venus in the dark…',
    'Measuring the distance between your stars…',
    'Tracing your constellations across the sky…',
    'Asking the universe what your love is here to learn…',
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
    }, 1400)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useEffect(() => {
    if (!rid) return
    let cancelled = false
    ;(async () => {
      try {
        setError('')
        setLoading(true)
        const data = await apiFetch(
          `/api/compatibility/${encodeURIComponent(rid)}`,
        )
        if (cancelled) return
        setResult(data)
      } catch (err) {
        if (cancelled) return
        setResult(null)
        setError(err?.message || 'Failed to load this compatibility reading.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [rid])

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
          personA: { name: aName.trim(), dob: aDob, gender: aGender || undefined },
          personB: { name: bName.trim(), dob: bDob, gender: bGender || undefined },
        }),
      })
      const elapsed = Date.now() - startedAt
      const minimumMs = 3500
      if (elapsed < minimumMs) {
        await new Promise((resolve) => setTimeout(resolve, minimumMs - elapsed))
      }
      setResult(data)
      if (data?.compatibilityId) {
        navigate(`/compatibility?rid=${encodeURIComponent(data.compatibilityId)}`)
      }
    } catch (err) {
      setError(err?.message || 'Failed to generate compatibility reading.')
    } finally {
      setLoading(false)
    }
  }

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return window.location.href
  }, [rid])

  async function downloadCard() {
    if (!cardRef.current) return
    try {
      setDownloading(true)
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      })
      const link = document.createElement('a')
      link.download = 'destiny-whisper-compatibility.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } finally {
      setDownloading(false)
    }
  }

  function tryAnother() {
    setError('')
    setResult(null)
    navigate('/compatibility')
  }

  const signA = result?.personA?.zodiacSign || '—'
  const signB = result?.personB?.zodiacSign || '—'
  const score = result?.compatibilityScore ?? result?.score ?? 0

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="lg:col-span-7"
      >
        <h2 className="text-3xl font-semibold tracking-tight">Love compatibility</h2>
        <p className="mt-2 max-w-xl text-white/70">
          Enter two birthdays to reveal a mystical love reading—cosmic chemistry,
          emotional tides, and a destiny message.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-6 rounded-3xl border border-white/15 bg-gradient-to-br from-indigo-950/60 via-slate-950/60 to-fuchsia-950/50 p-6 backdrop-blur"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/15 bg-black/30 p-4">
              <div className="mb-3 text-sm font-semibold text-white/90">Person A</div>
              <div className="grid gap-3">
                <Input
                  label="Name"
                  value={aName}
                  onChange={(e) => setAName(e.target.value)}
                  placeholder="e.g. Aman"
                />
                <Input
                  label="DOB"
                  type="date"
                  value={aDob}
                  onChange={(e) => setADob(e.target.value)}
                />
                <label className="block">
                  <div className="mb-1 text-sm text-white/70">Gender</div>
                  <select
                    value={aGender}
                    onChange={(e) => setAGender(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/25 focus:bg-white/10"
                  >
                    <option value="" className="text-black">
                      Select gender
                    </option>
                    <option value="female" className="text-black">
                      Female
                    </option>
                    <option value="male" className="text-black">
                      Male
                    </option>
                    <option value="other" className="text-black">
                      Other
                    </option>
                  </select>
                </label>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-black/30 p-4">
              <div className="mb-3 text-sm font-semibold text-white/90">Person B</div>
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
                <label className="block">
                  <div className="mb-1 text-sm text-white/70">Gender</div>
                  <select
                    value={bGender}
                    onChange={(e) => setBGender(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/25 focus:bg-white/10"
                  >
                    <option value="" className="text-black">
                      Select gender
                    </option>
                    <option value="female" className="text-black">
                      Female
                    </option>
                    <option value="male" className="text-black">
                      Male
                    </option>
                    <option value="other" className="text-black">
                      Other
                    </option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          {error ? (
            <div className="mt-4 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {error}
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 px-5 py-3 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.18)] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Casting your love reading…' : 'Reveal compatibility'}
            </button>
            {result ? (
              <button
                type="button"
                onClick={tryAnother}
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
              >
                Try another compatibility
              </button>
            ) : null}
            <div className="text-xs text-white/60">
              Your QR link opens the exact same saved reading.
            </div>
          </div>
        </form>
      </motion.section>

      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="lg:col-span-5"
      >
        <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-indigo-950/60 via-slate-950/60 to-fuchsia-950/50 p-6 backdrop-blur">
          <div className="text-lg font-semibold">Love compatibility result</div>
          <div className="mt-1 text-sm text-white/70">
            For fun only, not a guarantee of soulmates.
          </div>

          {loading ? (
            <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 p-6 text-sm text-white/80">
              <div>{lovePhrases[loveIndex]}</div>
              <div className="mt-1 text-xs text-white/60">
                The crystal ball is gathering your symbols…
              </div>
            </div>
          ) : !result ? (
            <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 p-6 text-sm text-white/80">
              Submit two birthdays to reveal the compatibility card here.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div
                ref={cardRef}
                className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0a0520] via-[#06102b] to-[#240a3b] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-80">
                  <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
                  <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,215,128,0.12),transparent_38%),radial-gradient(circle_at_70%_20%,rgba(232,121,249,0.12),transparent_35%),radial-gradient(circle_at_60%_80%,rgba(129,140,248,0.12),transparent_40%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
                </div>

                <div className="pointer-events-none absolute right-4 top-4 h-20 w-20 rounded-full bg-gradient-to-br from-amber-200/25 via-white/10 to-fuchsia-400/20 blur-[1px] shadow-[0_0_40px_rgba(255,215,128,0.18)]" />
                <div className="pointer-events-none absolute right-5 top-5 h-16 w-16 rounded-full border border-white/20 bg-white/5 backdrop-blur" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-amber-100/70">
                        The Destiny Whisper
                      </div>
                      <div className="mt-1 text-lg font-semibold text-white">
                        Compatibility Card
                      </div>
                      <div className="mt-2 text-sm text-white/80">
                        <span className="text-white/70">Zodiac signs:</span>{' '}
                        <span className="font-semibold text-white/95">{signA}</span>{' '}
                        <span className="text-white/45">×</span>{' '}
                        <span className="font-semibold text-white/95">{signB}</span>
                      </div>
                    </div>
                    <ScoreRing score={score} />
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-white/90">
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                      <div className="text-xs text-white/70">Romantic chemistry</div>
                      <div className="mt-1">{result.attractionEnergy || '—'}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                      <div className="text-xs text-white/70">Emotional connection</div>
                      <div className="mt-1">{result.emotionalConnection || '—'}</div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                        <div className="text-xs text-white/70">Strengths</div>
                        <div className="mt-1">{result.loveStrengths || '—'}</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                        <div className="text-xs text-white/70">Possible challenges</div>
                        <div className="mt-1">
                          {result.possibleChallenges || '—'}
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                      <div className="text-xs text-white/70">Romantic advice</div>
                      <div className="mt-1">{result.romanticAdvice || '—'}</div>
                    </div>
                    <div className="rounded-2xl border border-amber-200/20 bg-gradient-to-br from-amber-200/10 via-black/15 to-fuchsia-400/10 p-3">
                      <div className="text-xs text-amber-100/70">Destiny message</div>
                      <div className="mt-1">{result.destinyMessage || '—'}</div>
                    </div>
                  </div>

                  {result.summary ? (
                    <div className="mt-4 text-[11px] text-white/55">
                      {result.summary}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-black/25 p-4">
                <div className="text-xs uppercase tracking-wider text-white/60">
                  QR sharing
                </div>
                <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:gap-5">
                  <div className="rounded-2xl border border-white/15 bg-white p-3">
                    <QRCodeCanvas value={shareUrl} size={160} />
                  </div>
                  <div className="text-sm text-white/85">
                    <div className="font-semibold text-white/95">
                      Scan to open this reading on your phone
                    </div>
                    <div className="mt-1 text-xs text-white/65">
                      Share your destiny reading with someone special
                    </div>
                    <div className="mt-3 break-all text-xs text-white/55">
                      {shareUrl}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={downloadCard}
                disabled={downloading}
                className="rounded-2xl bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 px-5 py-3 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.18)] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {downloading ? 'Preparing image…' : 'Download Love Compatibility Card'}
              </button>
            </div>
          )}
        </div>
      </motion.aside>
    </div>
  )
}

