import { Moon, Sparkles, Star, Stars, User } from 'lucide-react'

function formatDate(d) {
  if (!d) return '—'
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
}

function LuckyNumberBubble({ n }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-indigo-400/25 blur-md" />
      <div className="relative grid h-10 w-10 place-items-center rounded-full border border-white/18 bg-white/10 text-sm font-semibold text-white shadow-[0_0_18px_rgba(99,102,241,0.35)]">
        {n}
      </div>
    </div>
  )
}

export function FortuneCard({ fortune }) {
  return (
    <div
      id="fortune-card"
      className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-[28px] border border-white/18 bg-[radial-gradient(circle_at_top,#2b1c4d,#09051f)] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_32px_rgba(167,139,250,0.28)]"
    >
      {/* Decorative cosmic layers (static for download) */}
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-sky-500/18 blur-3xl" />
        <div className="absolute left-1/3 top-2/3 h-96 w-96 rounded-full bg-indigo-500/14 blur-3xl" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:26px_26px]" />
      </div>

      <div className="relative flex flex-col gap-5 p-6">
        {/* HEADER */}
        <section className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-1 text-[11px] font-semibold tracking-[0.35em] text-white/90">
              <Stars className="h-3.5 w-3.5" />
              DESTINY WHISPER
            </div>
            <div className="mt-3 text-[26px] font-bold tracking-tight text-white">
              Fortune Reading Card
            </div>
            <div className="mt-1 text-xs text-white/65">
              “The universe whispers through subtle signs.”
            </div>
          </div>

          <div className="grid place-items-center rounded-full border border-white/15 bg-white/10 p-2">
            <Moon className="h-5 w-5 text-white/90" />
          </div>
        </section>

        {/* USER INFO */}
        <section className="mt-2 rounded-2xl border border-white/14 bg-black/25 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
            <User className="h-4 w-4" />
            User
          </div>
          <div className="mt-3 grid gap-2 text-sm text-white/85">
            <div>
              <span className="text-white/60">Name:</span>{' '}
              <span className="text-white">{fortune?.userName || '—'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Moon className="h-3.5 w-3.5" />
              <span className="text-white/60">Zodiac:</span>
              <span className="text-white text-sm">{fortune?.zodiacSign || '—'}</span>
            </div>
            <div>
              <span className="text-white/60">Date of birth:</span>{' '}
              <span className="text-white">{formatDate(fortune?.dob)}</span>
            </div>
          </div>
        </section>

        {/* PERSONALITY */}
        <section className="rounded-2xl border border-white/14 bg-black/25 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
            <Sparkles className="h-4 w-4" />
            Personality
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(fortune?.personalityTraits || []).slice(0, 8).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[11px] text-white/90"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* LUCK */}
        <section className="rounded-2xl border border-white/14 bg-black/25 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
            <Star className="h-4 w-4" />
            Lucky numbers
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {(fortune?.luckyNumbers || []).slice(0, 6).map((n) => (
              <LuckyNumberBubble key={n} n={n} />
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <section className="mt-3 flex flex-col items-start justify-between gap-1 border-t border-white/10 pt-3 text-[11px] text-white/60">
          <div className="inline-flex items-center gap-2 ">
            <Sparkles className="h-4 w-4 text-white/70" />
            The universe whispers through subtle signs.
          </div>
          <div className="inline-flex items-center gap-2">
            <Stars className="h-4 w-4 text-white/70" />
            The Destiny Whisper
          </div>
        </section>
      </div>
    </div>
  )
}

