import {
  Activity,
  Compass,
  Gem,
  HandHeart,
  Heart,
  Moon,
  Sparkles,
  Star,
  Stars,
  Timer,
  User,
  WandSparkles,
} from 'lucide-react'

function formatDate(d) {
  if (!d) return '—'
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
}

function getElementForSign(sign) {
  const map = {
    Aries: 'Fire',
    Leo: 'Fire',
    Sagittarius: 'Fire',
    Taurus: 'Earth',
    Virgo: 'Earth',
    Capricorn: 'Earth',
    Gemini: 'Air',
    Libra: 'Air',
    Aquarius: 'Air',
    Cancer: 'Water',
    Scorpio: 'Water',
    Pisces: 'Water',
  }
  return map[sign] || 'Air'
}

function extractBestMatches(summary) {
  if (!summary) return []
  const idx = summary.toLowerCase().indexOf('best matches:')
  if (idx === -1) return []
  const after = summary.slice(idx + 'best matches:'.length).trim()
  const cleaned = after.replace(/[.]+$/g, '')
  return cleaned
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function tarotMeaning(card) {
  const meanings = {
    'The Star': 'Hope and renewal surround your journey.',
    'Wheel of Fortune': 'A turning point arrives—luck favors your readiness.',
    'The Moon': 'Trust intuition; not everything is meant to be clear yet.',
    'The Sun': 'Warmth, clarity, and confidence brighten your path.',
    'The Magician': 'You already have the tools—now is the moment to begin.',
    'The Lovers': 'A choice of the heart brings alignment.',
    Strength: 'Gentle courage and steady self-belief win.',
    Justice: 'Balance returns when you choose what is fair to yourself.',
    Temperance: 'Patience and harmony create long-term magic.',
    'The Hermit': 'Inner wisdom guides the next step.',
  }
  return meanings[card] || 'A symbolic mirror of the current chapter of your story.'
}

function stylesForElement(element) {
  const attraction = {
    Fire: [
      'Bold confidence and playful challenge',
      'Strong eye contact and direct energy',
      'Passion that feels immediate and warm',
    ],
    Earth: [
      'Quiet loyalty and steady presence',
      'Consistency that feels safe and real',
      'Care shown through practical support',
    ],
    Air: [
      'Witty conversation and shared curiosity',
      'Light flirting with meaningful depth',
      'A spark that starts with ideas',
    ],
    Water: [
      'Emotional intuition and softness',
      'Deep listening and gentle care',
      'A bond that grows through trust',
    ],
  }

  const relationship = {
    Fire: [
      'You thrive with excitement, honesty, and space to grow',
      'You need both admiration and independence',
      'You love big—especially when respected',
    ],
    Earth: [
      'You thrive with routine, loyalty, and shared goals',
      'You value stability more than drama',
      'You love through actions and consistency',
    ],
    Air: [
      'You thrive with freedom, conversation, and shared ideas',
      'You need mental connection to feel close',
      'You love best when curiosity stays alive',
    ],
    Water: [
      'You thrive with emotional safety and sincerity',
      'You need reassurance more than grand gestures',
      'You love deeply once trust is built',
    ],
  }

  const advice = {
    Fire: [
      'Choose passion, but don’t confuse intensity with compatibility.',
      'Let someone earn your trust slowly—your heart is worth pacing.',
      'Be direct about what you want; mixed signals drain your luck.',
    ],
    Earth: [
      'Don’t ignore the small red flags you quietly notice.',
      'Love grows when you allow support, not only responsibility.',
      'Consistency is romantic—ask for it without guilt.',
    ],
    Air: [
      'Speak your truth early; clarity is your love language.',
      'Choose someone who laughs with you and listens to you.',
      'If you overthink, return to what feels simple and kind.',
    ],
    Water: [
      'Protect your sensitivity; it’s a gift, not a weakness.',
      'Ask for reassurance instead of testing someone’s feelings.',
      'Your intuition is strong—trust it, but don’t fear softness.',
    ],
  }

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
  return {
    attractionStyle: pick(attraction[element] || attraction.Air),
    relationshipStyle: pick(relationship[element] || relationship.Air),
    loveAdvice: pick(advice[element] || advice.Air),
  }
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] text-white/85">
      {children}
    </span>
  )
}

function CardSection({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-black/25 p-4">
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/10">
          <Icon className="h-4 w-4 text-white/90" />
        </div>
        <div className="text-xs font-semibold tracking-wide text-white/90">{title}</div>
      </div>
      <div className="mt-3 text-[12px] leading-relaxed text-white/80">{children}</div>
    </div>
  )
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
  const element = getElementForSign(fortune?.zodiacSign)
  const matches = extractBestMatches(fortune?.loveCompatibilitySummary)
  const love = stylesForElement(element)

  return (
    <div
      id="fortune-card"
      className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[34px] border border-white/18 bg-gradient-to-br from-[#120624] via-[#050517] to-black shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_45px_rgba(167,139,250,0.22)]"
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

      <div className="relative flex min-h-[1200px] flex-col gap-5 p-6 sm:p-8">
        {/* HEADER */}
        <section className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-1 text-[11px] font-semibold tracking-widest text-white/90">
              <Stars className="h-3.5 w-3.5" />
              THE DESTINY WHISPER
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Mystical Fortune Reading
            </div>
            <div className="mt-1 text-xs text-white/65">
              “The universe whispers through subtle signs.”
            </div>
          </div>

          <div className="grid gap-2 text-right">
            <Badge>Aura: {fortune?.auraColor || 'mystic violet'}</Badge>
            <Badge>Energy: {fortune?.energyLevel || 'Balanced and steady'}</Badge>
          </div>
        </section>

        {/* USER INFO */}
        <section className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/12 bg-white/6 p-4">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <User className="h-4 w-4" /> Name
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              {fortune?.userName || '—'}
            </div>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/6 p-4">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Moon className="h-4 w-4" /> Zodiac
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              {fortune?.zodiacSign || '—'}
            </div>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/6 p-4">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Sparkles className="h-4 w-4" /> Birth date
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              {formatDate(fortune?.dob)}
            </div>
          </div>
        </section>

        {/* PERSONALITY / LUCK / LOVE / DESTINY */}
        <section className="mt-4 grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
          <CardSection icon={WandSparkles} title="Personality">
            <div className="flex flex-wrap gap-2">
              {(fortune?.personalityTraits || []).slice(0, 6).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/14 bg-white/8 px-3 py-1 text-[11px] text-white/85"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-3 text-white/80">
              {fortune?.personalityInsight || 'Your energy is unfolding in a calm, steady way.'}
            </div>
          </CardSection>

          <CardSection icon={Star} title="Luck">
            <div className="grid grid-cols-3 gap-3">
              {(fortune?.luckyNumbers || []).slice(0, 7).map((n) => (
                <LuckyNumberBubble key={n} n={n} />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] text-white/85">
              <div>Color: <span className="text-white">{fortune?.luckyColors?.[0] || '—'}</span></div>
              <div>Day: <span className="text-white">{fortune?.luckyDays?.[0] || '—'}</span></div>
              <div>
                <span className="inline-flex items-center gap-1">
                  <Gem className="h-3.5 w-3.5" /> Gem:
                </span>{' '}
                <span className="text-white">{fortune?.luckyGemstones?.[0] || '—'}</span>
              </div>
              <div>
                <span className="inline-flex items-center gap-1">
                  <Timer className="h-3.5 w-3.5" /> Time:
                </span>{' '}
                <span className="text-white">{fortune?.luckyTime || '—'}</span>
              </div>
              <div className="col-span-2">
                <span className="inline-flex items-center gap-1">
                  <Compass className="h-3.5 w-3.5" /> Direction:
                </span>{' '}
                <span className="text-white">{fortune?.luckyDirection || '—'}</span>
              </div>
            </div>
            <div className="mt-3 text-[12px] text-white/75">
              Object: <span className="text-white/90">{fortune?.luckyObject || '—'}</span> • Symbol:{' '}
              <span className="text-white/90">{fortune?.luckySymbol || '—'}</span>
            </div>
          </CardSection>

          <CardSection icon={HandHeart} title="Love">
            <div className="flex items-center justify-between">
              <div className="text-[12px] text-white/70">Compatibility score</div>
              <div className="text-2xl font-semibold text-white">
                {typeof fortune?.loveScore === 'number' ? `${fortune.loveScore}%` : '—'}
              </div>
            </div>
            <div className="mt-2 text-white/85">
              {fortune?.loveCompatibilitySummary || 'A gentle connection grows when communication stays honest.'}
            </div>
            <div className="mt-3 grid gap-2 text-[12px] text-white/80">
              <div>
                Best matches:{' '}
                <span className="text-white/90">
                  {matches.length ? matches.join(', ') : '—'}
                </span>
              </div>
              <div>
                <span className="inline-flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5" /> Attraction style:
                </span>{' '}
                <span className="text-white/90">{love.attractionStyle}</span>
              </div>
              <div>
                Relationship style: <span className="text-white/90">{love.relationshipStyle}</span>
              </div>
              <div>
                Love advice: <span className="text-white/90">{love.loveAdvice}</span>
              </div>
            </div>
          </CardSection>

          <CardSection icon={Sparkles} title="Destiny">
            <div className="grid gap-3">
              <div>
                <div className="text-[12px] text-white/70">Tarot card</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  {fortune?.tarotCard || '—'}
                </div>
                <div className="mt-1 text-[12px] text-white/80">
                  Meaning: “{tarotMeaning(fortune?.tarotCard)}”
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/12 bg-white/6 p-3">
                  <div className="text-[11px] text-white/70">Destiny score</div>
                  <div className="mt-1 text-xl font-semibold text-white">
                    {typeof fortune?.destinyScore === 'number' ? fortune.destinyScore : '—'}
                    <span className="text-xs text-white/60">/100</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/6 p-3">
                  <div className="text-[11px] text-white/70">Wealth score</div>
                  <div className="mt-1 text-xl font-semibold text-white">
                    {typeof fortune?.wealthScore === 'number' ? fortune.wealthScore : '—'}
                    <span className="text-xs text-white/60">/100</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/12 bg-white/6 p-3">
                <div className="flex items-center gap-2 text-[11px] text-white/70">
                  <Stars className="h-3.5 w-3.5" /> Fate message
                </div>
                <div className="mt-2 text-[12px] italic text-white/85">
                  {fortune?.fateMessage || 'A quiet opportunity appears when you least expect it.'}
                </div>
              </div>
            </div>
          </CardSection>
        </section>

        {/* FUTURE */}
        <section className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/12 bg-black/25 p-4">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Heart className="h-4 w-4" /> Marriage
            </div>
            <div className="mt-2 text-[12px] leading-relaxed text-white/85">
              {fortune?.marriagePrediction || '—'}
            </div>
          </div>
          <div className="rounded-2xl border border-white/12 bg-black/25 p-4">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Activity className="h-4 w-4" /> Career
            </div>
            <div className="mt-2 text-[12px] leading-relaxed text-white/85">
              {fortune?.careerWealth || '—'}
            </div>
          </div>
          <div className="rounded-2xl border border-white/12 bg-black/25 p-4">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Star className="h-4 w-4" /> Opportunity
            </div>
            <div className="mt-2 text-[12px] leading-relaxed text-white/85">
              {fortune?.upcomingOpportunity || 'A small invitation may carry big meaning.'}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <section className="mt-5 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-4 text-xs text-white/60 sm:flex-row">
          <div className="inline-flex items-center gap-2">
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

