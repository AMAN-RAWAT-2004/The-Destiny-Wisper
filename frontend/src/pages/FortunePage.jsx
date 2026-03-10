import { motion } from "framer-motion"
import html2canvas from "html2canvas"
import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { apiFetch } from "../lib/api.js"
import { CrystalBall } from "../components/CrystalBall.jsx"

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
    if (loc.state?.fortune?.qrId === id) {
      return loc.state
    }
    return null
  }, [loc.state, id])

  const [loading, setLoading] = useState(!initial)
  const [error, setError] = useState("")
  const [fortune, setFortune] = useState(initial?.fortune || null)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState(initial?.qrCodeDataUrl || "")

  const cardRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    async function run() {
      if (initial) return

      setLoading(true)
      setError("")

      try {
        const data = await apiFetch(`/api/fortune/${id}`)

        if (cancelled) return

        setFortune(data?.fortune || null)

        // If backend returns qr code
        if (data?.qrCodeDataUrl) {
          setQrCodeDataUrl(data.qrCodeDataUrl)
        }
      } catch (err) {
        if (cancelled) return
        setError(err?.message || "Could not load fortune.")
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

    const dataUrl = canvas.toDataURL("image/png")

    const a = document.createElement("a")
    a.href = dataUrl
    a.download = `fortune-${fortune?.userName || "destiny"}.png`
    a.click()
  }

  async function shareLink() {
    const url = window.location.href
    const title = "My Destiny Wisper Fortune"
    const text = `I’m ${fortune?.zodiacSign}. Discover my destiny.`

    if (navigator.share) {
      await navigator.share({ title, text, url })
    } else {
      await navigator.clipboard.writeText(url)
      alert("Link copied to clipboard")
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
        <div className="text-lg font-semibold text-white">
          Fortune not found
        </div>

        <div className="mt-2">
          {error || "This destiny message is missing."}
        </div>

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

      {/* MAIN FORTUNE */}
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

          <Pill>
            Lucky: {fortune.luckyNumbers?.slice(0, 3).join(", ")}
          </Pill>

          <Pill>
            Created: {new Date(fortune.createdAt).toLocaleString()}
          </Pill>
        </div>

        <div className="mt-5 grid gap-4">
          <Section title="Daily Horoscope">
            {fortune.dailyHoroscope}
          </Section>

          <Section title="Love Compatibility">
            <div className="font-medium text-white">
              {fortune.loveCompatibilitySummary}
            </div>
          </Section>

          <Section title="Marriage Prediction">
            {fortune.marriagePrediction}
          </Section>

          <Section title="Career & Wealth">
            {fortune.careerWealth}
          </Section>
        </div>
      </motion.section>

      {/* SHARE PANEL */}
      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-4"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">

          <div className="text-lg font-semibold">
            Share your destiny
          </div>

          <div className="mt-1 text-sm text-white/70">
            Scan this QR to reveal the same fortune.
          </div>

          <div className="mt-4 flex justify-center">

            {qrCodeDataUrl ? (
              <img
                src={qrCodeDataUrl}
                alt="QR code"
                className="h-48 w-48 rounded-xl bg-white p-2"
              />
            ) : (
              <div className="text-white/60 text-sm">
                QR code unavailable
              </div>
            )}

          </div>

          <div className="mt-4 grid gap-2">

            <button
              onClick={downloadCard}
              className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black"
            >
              Download fortune card
            </button>

            <button
              onClick={shareLink}
              className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white"
            >
              Share link
            </button>

            <Link
              to="/"
              className="rounded-2xl border border-white/20 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Generate another
            </Link>

          </div>

        </div>

        {/* CARD FOR DOWNLOAD */}
        <div className="mt-6">

          <div
            ref={cardRef}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-black/20 p-6"
          >

            <div className="text-xs text-white/70">
              Destiny Wisper
            </div>

            <div className="mt-2 text-2xl font-semibold">
              {fortune.userName}
            </div>

            <div className="text-sm text-white/70">
              Zodiac: {fortune.zodiacSign}
            </div>

            <div className="mt-4 text-white/80">
              {fortune.loveCompatibilitySummary}
            </div>

            <div className="mt-4 text-xs text-white/50">
              fortune/{fortune.qrId}
            </div>

          </div>

        </div>

      </motion.aside>

    </div>
  )
}