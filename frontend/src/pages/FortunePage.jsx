import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { apiFetch } from '../lib/api.js'
import { CrystalBall } from '../components/CrystalBall.jsx'

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
      {children}
    </span>
  )
}

function Section({ title, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="text-sm font-semibold text-white/90">{title}</div>
      <div className="mt-3 text-sm text-white/75">{children}</div>
    </div>
  )
}

export function FortunePage() {
  const { id } = useParams()
  const loc = useLocation()

  const initial = useMemo(() => {
    // From HomePage navigation: { fortune, qrCodeDataUrl }
    if (loc.state && loc.state.fortune && loc.state.fortune.qrId === id) {
      return loc.state
    }
    return null
  }, [loc.state, id])

  const [loading, setLoading] = useState(!initial)
  const [error, setError] = useState('')
  const [fortune, setFortune] = useState(initial?.fortune || null)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState(initial?.qrCodeDataUrl || '')

  const cardRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (initial) return
      setLoading(true)
      setError('')
      try {
        const data = await apiFetch(`/api/fortune/${id}`)
        if (cancelled) return
        setFortune(data?.fortune || null)
      } catch (err) {
        if (cancelled) return
        setError(err?.message || 'Could not load fortune.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [id, initial])

  async function downloadCard() {
    if (!cardRef.current) return
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: 2,
    })
    const dataUrl = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `fortune-${fortune?.userName || 'destiny'}.png`
    a.click()
  }

  async function shareLink() {
    const url = window.location.href
    const title = 'My Destiny Wisper Fortune'
    const text = `I’m ${fortune?.zodiacSign}. Scan my fortune:`
    if (navigator.share) {
      await navigator.share({ title, text, url })
    } else {
      await navigator.clipboard.writeText(url)
      alert('Link copied to clipboard.')
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-10 text-white/80 backdrop-blur">
        <CrystalBall size={140} />
        <div className="mt-6 text-sm">
          The crystal ball is focusing… your destiny is forming.
        </div>
      </div>
    )
  }

  if (error || !fortune) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70 backdrop-blur">
        <div className="text-lg font-semibold text-white">Fortune not found</div>
        <div className="mt-2">{error || 'This destiny message is missing.'}</div>
        <div className="mt-6">
          <Link
            to="/"
            className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black"
          >
            Go back
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="lg:col-span-8"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Pill>
            {fortune.userName} • {fortune.zodiacSign}
          </Pill>
          <Pill>Lucky: {fortune.luckyNumbers?.slice(0, 3).join(', ')}</Pill>
          <Pill>Created: {new Date(fortune.createdAt).toLocaleString()}</Pill>
        </div>

        <div className="mt-5 grid gap-4">
          <Section title="Daily Horoscope">{fortune.dailyHoroscope}</Section>
          <Section title="Love Compatibility">
            <div className="font-medium text-white">
              {fortune.loveCompatibilitySummary}
            </div>
          </Section>
          <Section title="Marriage Prediction">{fortune.marriagePrediction}</Section>
          <Section title="Career & Wealth">{fortune.careerWealth}</Section>

          {typeof fortune.wealthScore === 'number' || fortune.tarotCard ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {typeof fortune.wealthScore === 'number' ? (
                <Section title="Wealth Score 💰">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-white">
                      {fortune.wealthScore}
                    </span>
                    <span className="text-xs text-white/60">/ 100 potential this cycle</span>
                  </div>
                </Section>
              ) : null}
              {fortune.tarotCard ? (
                <Section title="Tarot Card 🎴">
                  <div className="font-medium text-white">{fortune.tarotCard}</div>
                  <div className="mt-1 text-xs text-white/70">
                    A symbolic mirror of the current chapter of your story.
                  </div>
                </Section>
              ) : null}
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <Section title="Lucky Numbers">
              <div className="flex flex-wrap gap-2">
                {fortune.luckyNumbers?.map((n) => (
                  <span
                    key={n}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </Section>
            <Section title="Lucky Colors">
              <div className="flex flex-wrap gap-2">
                {fortune.luckyColors?.map((c) => (
                  <span
                    key={c}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Section>
            <Section title="Lucky Days">
              <div className="flex flex-wrap gap-2">
                {fortune.luckyDays?.map((d) => (
                  <span
                    key={d}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </Section>
            <Section title="Lucky Gemstones">
              <div className="flex flex-wrap gap-2">
                {fortune.luckyGemstones?.map((g) => (
                  <span
                    key={g}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-white"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          <Section title="Personality Traits">
            <ul className="list-inside list-disc text-white/75">
              {(fortune.personalityTraits || []).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Section>

          {fortune.personalityInsight ? (
            <Section title="Personality Insight 🧠">
              <div className="text-sm text-white/80">{fortune.personalityInsight}</div>
            </Section>
          ) : null}

          {(fortune.luckyTime || fortune.luckyDirection || fortune.luckyObject || fortune.luckySymbol) ? (
            <Section title="Extra Luck Details">
              <div className="grid gap-2 text-white/80 sm:grid-cols-2">
                {fortune.luckyTime ? (
                  <div>
                    <span className="font-semibold">Lucky time ⏰:</span>{' '}
                    <span>{fortune.luckyTime}</span>
                  </div>
                ) : null}
                {fortune.luckyDirection ? (
                  <div>
                    <span className="font-semibold">Lucky direction 🧭:</span>{' '}
                    <span>{fortune.luckyDirection}</span>
                  </div>
                ) : null}
                {fortune.luckyObject ? (
                  <div>
                    <span className="font-semibold">Lucky object 💎:</span>{' '}
                    <span>{fortune.luckyObject}</span>
                  </div>
                ) : null}
                {fortune.luckySymbol ? (
                  <div>
                    <span className="font-semibold">Lucky symbol ⭐:</span>{' '}
                    <span>{fortune.luckySymbol}</span>
                  </div>
                ) : null}
              </div>
            </Section>
          ) : null}

          {fortune.fateMessage ? (
            <Section title="Fate Message 🔮">
              <div className="italic text-white/85">{fortune.fateMessage}</div>
            </Section>
          ) : null}
        </div>
      </motion.section>

      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="lg:col-span-4"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="text-lg font-semibold">Share your destiny</div>
          <div className="mt-1 text-sm text-white/70">
            Scan this QR code to reveal the same fortune on another page.
          </div>

          <div className="mt-4 flex items-center justify-center rounded-3xl border border-white/10 bg-black/30 p-4">
            {qrCodeDataUrl ? (
              <img
                src={qrCodeDataUrl}
                alt="Fortune QR code"
                className="h-48 w-48 max-w-full rounded-2xl bg-white p-2"
              />
            ) : (
              <div className="text-sm text-white/60">
                QR code is available when created from the form.
              </div>
            )}
          </div>

          <div className="mt-4 grid gap-2">
            <button
              onClick={downloadCard}
              className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              Download fortune card
            </button>
            <button
              onClick={shareLink}
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Share / Copy link
            </button>
            <Link
              to="/"
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
            >
              Generate another
            </Link>
          </div>
        </div>

        {/* Shareable card surface (used for download) */}
        <div className="mt-6">
          <div
            ref={cardRef}
            className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-black/20 p-6 backdrop-blur"
          >
            <div className="text-xs text-white/70">Destiny Wisper</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">
              {fortune.userName}
            </div>
            <div className="mt-1 text-sm text-white/75">
              Zodiac: <span className="text-white">{fortune.zodiacSign}</span>
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/80">
              <div className="font-semibold text-white">Top luck</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {(fortune.luckyNumbers || []).slice(0, 5).map((n) => (
                  <span
                    key={n}
                    className="rounded-full bg-white/10 px-3 py-1 text-white"
                  >
                    {n}
                  </span>
                ))}
              </div>
              <div className="mt-3 text-white/75">
                {fortune.loveCompatibilitySummary}
              </div>
            </div>
            <div className="mt-4 text-xs text-white/50">
              Scan link: /fortune/{fortune.qrId}
            </div>
          </div>
        </div>
      </motion.aside>
    </div>
  )
}

