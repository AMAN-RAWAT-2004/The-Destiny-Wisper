const elementMap = {
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
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function uniqueStrings(list) {
  const seen = new Set();
  const out = [];
  for (const item of list) {
    const s = String(item).trim();
    if (!s) continue;
    const key = s.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

function cartesianPhrases(a, b, joiner) {
  const out = [];
  for (const x of a) for (const y of b) out.push(joiner(x, y));
  return out;
}

function clampPool(pool, min = 80, max = 120, preferred = 100) {
  const u = uniqueStrings(pool);
  if (u.length < min) {
    // If a future edit accidentally shrinks a pool, fail loudly (helps prevent repetition regressions).
    throw new Error(
      `Love compatibility pool too small (${u.length}). Minimum is ${min}.`,
    );
  }
  const target = Math.min(max, Math.max(min, preferred));
  return Object.freeze(u.slice(0, target));
}

// --- Base fragments (used to generate lots of non-generic variety) ---
const mysticalAdjectives = [
  'moonlit',
  'starlit',
  'celestial',
  'silver-threaded',
  'sun-kissed',
  'nebula-soft',
  'constellation-bound',
  'aurora-tinted',
  'crystal-clear',
  'velvet-dark',
  'electric',
  'incandescent',
  'rose-gold',
  'comet-bright',
  'tide-pulled',
  'dream-woven',
  'oracle-blessed',
  'cosmic',
  'mystic',
  'spellbound',
];

const emotionalTextures = [
  'tender',
  'bold',
  'gentle',
  'intense',
  'playful',
  'patient',
  'protective',
  'magnetic',
  'mysterious',
  'devoted',
  'steadfast',
  'restless',
  'curious',
  'fierce',
  'softening',
  'healing',
  'truthful',
  'yearning',
  'radiant',
  'grounding',
];

const bondNouns = [
  'connection',
  'romantic current',
  'cosmic pull',
  'heart-thread',
  'soul-echo',
  'spark',
  'gravity',
  'devotion',
  'magnetism',
  'whisper between worlds',
  'shared orbit',
  'secret language',
  'promise',
  'safe harbor',
  'wildfire',
  'tide',
  'light',
  'mirror',
  'portal',
  'ritual',
];

const conflictShadows = [
  'pride',
  'silence',
  'misread signals',
  'unspoken expectations',
  'old wounds',
  'timing',
  'restlessness',
  'control',
  'jealousy',
  'overthinking',
  'defensiveness',
  'avoidance',
  'mixed pacing',
  'stubbornness',
  'distance',
  'sharp words',
  'testing each other',
  'fear of being seen',
  'fear of being needed',
  'half-truths',
];

const healingKeys = [
  'reassurance',
  'gentle honesty',
  'slow listening',
  'warm boundaries',
  'playful repair',
  'soft words after storms',
  'rituals of affection',
  'shared intention',
  'patience with timing',
  'truth without cruelty',
  'breathing before replying',
  'naming feelings early',
  'choosing curiosity',
  'tender accountability',
  'meeting halfway',
  'steady consistency',
  'laughing together',
  'protecting the bond',
  'asking, not assuming',
  'making space for both',
];

// --- Phrase pools (80–120 each) ---
const relStyles = (() => {
  const base = [
    'passionate and energetic—two flames learning to dance without burning',
    'balanced yet emotionally charged, like a scale kissed by moonlight',
    'playful and adventurous, where flirting feels like friendly mischief',
    'deeply intuitive and romantic, as if you read each other between breaths',
    'light-hearted yet quietly loyal, the kind of love that shows up daily',
    'tender and protective, with a “safe harbor” feeling in private moments',
    'magnetic and mysterious—drawn together by what you can’t quite name',
    'steady and sensual, love expressed through consistency and touch',
    'bright and expressive, where affection is spoken out loud and often',
    'soft and healing, turning ordinary days into emotional medicine',
    'electric and unpredictable, a love-story written in sudden sparks',
    'devoted and ceremonial, as if commitment itself is a sacred ritual',
    'warmly domestic with a wild edge—comfort that still feels exciting',
    'intense and transformative, where closeness changes you in the best ways',
    'curious and conversational, falling in love through questions and stories',
    'private and profound, like lovers sharing a secret constellation',
    'bold and forward, where desire doesn’t hide behind politeness',
    'gentle and patient, moving at the speed trust can keep',
    'romantic in quiet ways—glances, small favors, remembered details',
    'dramatic in the sweetest way, like hearts that enjoy a little theater',
    'anchored and enduring, with “we can build this” energy',
    'airy and witty, where attraction travels through laughter first',
    'emotionally brave, willing to be seen even when it’s messy',
    'slow-blooming and fated, like a prophecy unfolding day by day',
    'touch-forward and affectionate, as if love lives in your fingertips',
    'dreamy and poetic, where feelings arrive as images and symbols',
    'protective yet playful, teasing as a love language',
    'honest and intense, the kind of bond that dislikes pretending',
    'soulful and reflective, like mirrors that soften each other’s edges',
    'grounded with bursts of magic—reliable love with sparkling surprises',
    'sweetly competitive, pushing each other to shine a little brighter',
    'mature and intentional, where promises are chosen, not assumed',
    'mystic and intimate, like a candlelit vow in a hidden temple',
    'flirtatious and uplifting, your chemistry cheering you on',
    'gentle but potent, love that looks quiet and feels enormous',
    'resilient and renewing, able to repair after storms',
  ];

  const stylesA = [
    'moonlit',
    'starlit',
    'celestial',
    'dream-woven',
    'sun-kissed',
    'tide-pulled',
    'crystal-clear',
    'velvet-dark',
    'aurora-tinted',
    'comet-bright',
  ];
  const stylesB = [
    'devotion',
    'romance',
    'partnership',
    'affection',
    'chemistry',
    'companionship',
    'loyalty',
    'intimacy',
    'adventure',
    'tenderness',
  ];
  const templates = cartesianPhrases(stylesA, stylesB, (a, b) => {
    return `${a} ${b} with a quiet undercurrent of fate`;
  });

  const extra = [
    ...cartesianPhrases(emotionalTextures, bondNouns, (e, b) => {
      return `${e} and ${pickRandom(mysticalAdjectives)}—a ${b} that grows stronger when you choose trust`;
    }).slice(0, 90),
  ];

  return clampPool([...base, ...templates, ...extra]);
})();

const attractionEnergyPool = (() => {
  const base = [
    'A first-sight spark—like two meteors recognizing the same sky',
    'A slow-blooming pull that deepens each time you feel safe together',
    'Magnetic emotional resonance that feels strangely destined',
    'A playful spark that grows through shared experiences and inside jokes',
    'A tender heat that rises when honesty is offered without fear',
    'A “can’t-look-away” fascination—equal parts curiosity and craving',
    'Chemistry that flares in quiet moments, not just grand gestures',
    'An attraction that feels like gravity: subtle at first, undeniable later',
    'A sweet ache of longing—like the heart remembering an old vow',
    'A bright, fizzy kind of desire that refreshes the spirit',
    'A sensual steadiness: touch and presence doing most of the talking',
    'A mind-to-mind spark that turns into body-to-body devotion',
    'A cinematic pull—eyes meeting and the room shifting around you',
    'A soft hypnotic draw, like waves tugging you back to shore',
    'A flame that steadies into embers—warm, lasting, quietly addictive',
    'A flirtatious charge that turns routine days into secret celebrations',
    'A powerful “we’re different… and it works” kind of magnetism',
    'A protective desire—wanting to keep each other close and cared for',
    'A luminous attraction that strengthens after every honest conversation',
    'A thrilling edge—chemistry with a hint of danger and daring',
    'A soulful pull that feels like a message delivered through touch',
    'A bright obsession in the best way—like discovering a new favorite song',
    'A grounding desire: being near each other calms the nervous system',
    'An attraction that intensifies under moonlit nights and whispered truths',
  ];

  const sparks = [
    'a sudden',
    'a slow-burning',
    'a steady',
    'a secret',
    'a luminous',
    'an electric',
    'a velvet-soft',
    'a fever-bright',
    'a honeyed',
    'a star-charged',
  ];
  const focuses = [
    'physical chemistry',
    'emotional magnetism',
    'mind-to-mind attraction',
    'protective desire',
    'playful lust',
    'gentle longing',
    'devotional heat',
    'romantic fascination',
    'soul-level recognition',
    'flirtation that turns serious',
  ];
  const evolutions = [
    'that ignites when you share a secret',
    'that grows when you laugh at the same small things',
    'that deepens when you choose patience over pride',
    'that becomes stronger with every honest apology',
    'that blooms when you stop performing and start being real',
    'that intensifies when you make space for each other’s moods',
    'that steadies when your routines begin to intertwine',
    'that feels stronger after each “I miss you” moment',
    'that awakens when you speak the truth gently',
    'that returns even after distance, like a tide',
  ];
  const generated = cartesianPhrases(sparks, focuses, (s, f) => `${s} ${f} ${pickRandom(evolutions)}`);

  return clampPool([...base, ...generated]);
})();

const communicationStyles = (() => {
  const base = [
    'Your words carry magic when you speak slowly enough to mean them.',
    'You communicate best when you trade assumptions for questions.',
    'Short daily check-ins keep your hearts in the same orbit.',
    'When emotions rise, soften your tone—your love hears everything.',
    'Honesty becomes safer when it arrives with kindness, not sharpness.',
    'You thrive when difficult topics are approached like puzzles, not battles.',
    'Name the feeling before you name the problem; it changes everything.',
    'Silence can be sacred, but don’t let it become a hiding place.',
    'You heal misunderstandings fastest when you mirror what you heard.',
    'Let affection lead the conversation—touch, warmth, reassurance first.',
    'Your best talks happen after laughter, not after pressure.',
    'Speak in “I feel” language; it keeps the door open.',
    'When you disagree, remember: you’re defending the bond, not the ego.',
    'If one retreats, the other should offer gentleness, not pursuit.',
    'Your connection improves when you’re brave enough to be specific.',
    'Your love language is clarity—simple, direct, and tender.',
    'Avoid the cold pause of punishment; choose the warm pause of breathing.',
    'Make room for awkward honesty—truth often arrives imperfectly.',
    'You’re at your best when you talk about dreams as often as details.',
    'Apologies land better when paired with a changed pattern.',
    'Let curiosity be your spell: “Help me understand you.”',
    'Your conversations sparkle when you share stories, not just logistics.',
    'When tension appears, lower the volume; raise the compassion.',
    'Say what you need before resentment writes its own script.',
  ];

  const openings = [
    'In this pairing, communication becomes',
    'Between you two, conversation can feel like',
    'Your dialogue is most powerful when it is',
    'The spellwork of your words is',
    'Your hearts translate best through',
    'When you speak with intention, it becomes',
    'If you want harmony, let your words be',
    'Your bond strengthens when your communication is',
    'The most healing way for you to talk is',
    'Your love understands language that is',
  ];
  const styles = [
    'soft but precise',
    'bold yet respectful',
    'playful and honest',
    'emotionally brave',
    'slow, grounded, and clear',
    'direct without being sharp',
    'gentle enough to feel safe',
    'romantic in small sentences',
    'patient during storms',
    'focused on repair, not blame',
  ];
  const endings = [
    '—like lighting a candle instead of starting a fire.',
    '—as if you’re reading from the same invisible script.',
    '—a balm that calms the nervous system.',
    '—a bridge built plank by plank, not leapt in one jump.',
    '—the kind that turns conflict into understanding.',
    '—a ritual you return to when life gets loud.',
    '—a promise that you’ll come back to each other.',
    '—a language of truth wrapped in warmth.',
    '—a compass when feelings get confusing.',
    '—a soft doorway back into closeness.',
  ];
  const generated = cartesianPhrases(openings, styles, (o, s) => `${o} ${s} ${pickRandom(endings)}`);

  return clampPool([...base, ...generated]);
})();

const loveStrengths = (() => {
  const base = [
    'You draw confidence out of each other like sunlight from clouds.',
    'There’s a rare emotional curiosity here—both of you want to know, not just have.',
    'Your connection can feel like friendship and romance braided together.',
    'You naturally create tiny rituals that make love feel sacred.',
    'You inspire each other to grow beyond old limits without forcing it.',
    'Your affection has staying power; it doesn’t fade when the mood shifts.',
    'You’re good at turning ordinary days into something worth remembering.',
    'There’s a protective loyalty here—quiet, steady, and real.',
    'You bring out each other’s softness without stealing each other’s strength.',
    'Your chemistry is amplified by emotional safety, not just novelty.',
    'You’re capable of forgiving with wisdom, not forgetting with bitterness.',
    'You make each other feel chosen—again and again.',
    'You’re a powerful team when you share a vision and a plan.',
    'Your romance thrives when you celebrate each other out loud.',
    'You have the gift of making each other feel “at home” in your own skin.',
    'Your bond is resilient; it bends, repairs, and becomes stronger.',
    'You bring playful energy that keeps love from feeling heavy.',
    'You carry an instinct for caretaking that doesn’t become control.',
    'You’re good at rebuilding closeness after a rough day.',
    'You’re a match for mutual growth—two people evolving in the same direction.',
  ];

  const verbs = [
    'anchor',
    'ignite',
    'soften',
    'strengthen',
    'steady',
    'protect',
    'inspire',
    'uplift',
    'enchant',
    'heal',
  ];
  const objects = [
    'each other’s confidence',
    'each other’s courage',
    'each other’s joy',
    'each other’s tenderness',
    'each other’s creativity',
    'each other’s sense of purpose',
    'the relationship’s trust',
    'the romance’s warmth',
    'the bond’s loyalty',
    'the friendship underneath',
  ];
  const hows = [
    'through small acts that add up',
    'with laughter that disarms fear',
    'by being present when it matters',
    'by telling the truth gently',
    'by choosing repair over winning',
    'by giving space without abandoning',
    'with affection that feels intentional',
    'with patience that feels protective',
    'through curiosity instead of assumptions',
    'by keeping promises, even tiny ones',
  ];
  const generated = cartesianPhrases(verbs, objects, (v, o) => `You ${v} ${o} ${pickRandom(hows)}.`);

  return clampPool([...base, ...generated]);
})();

const possibleChallenges = (() => {
  const base = [
    'When stress arrives, patience becomes the price of peace.',
    'Misunderstandings can bloom if feelings are hidden for too long.',
    'Balancing independence and closeness will be an ongoing spell to master.',
    'Remember you’re on the same team—especially when pride gets loud.',
    'Overthinking can fog what is actually simple and kind between you.',
    'If one of you moves fast and the other moves deep, pacing may clash.',
    'Unspoken expectations can turn into silent tests—name them early.',
    'If either partner retreats, distance can feel like rejection.',
    'Jealousy may appear when reassurance is withheld.',
    'Sharp words said in heat can echo longer than intended.',
    'Avoid keeping score; love isn’t a ledger.',
    'If routine becomes heavy, desire may ask for play.',
    'Control disguised as care can bruise the bond—stay conscious.',
    'If boundaries aren’t clear, resentment may grow quietly.',
    'The biggest danger is assuming love should be effortless every day.',
  ];

  const starts = [
    'A shadow to watch is',
    'Your main test may be',
    'A repeating lesson could be',
    'The tricky edge in this pairing is',
    'Be mindful of',
    'The storm-cloud here is',
    'A challenge that returns is',
    'If you’re not careful,',
    'The pitfall is',
    'The fracture point can be',
  ];
  const middles = [
    'pride turning tenderness into distance',
    'silence pretending to be peace',
    'misread signals becoming unnecessary drama',
    'timing issues making good love feel hard',
    'stubbornness outlasting the moment',
    'old wounds asking to be soothed, not proven',
    'restlessness chasing novelty over depth',
    'jealousy asking for reassurance in disguise',
    'overthinking rewriting the story at night',
    'control trying to replace trust',
  ];
  const ends = [
    '—the antidote is gentle honesty.',
    '—slow down and choose clarity.',
    '—return to reassurance before debate.',
    '—repair quickly; don’t let it calcify.',
    '—name the fear under the reaction.',
    '—protect each other’s dignity in conflict.',
    '—ask directly for what you need.',
    '—make space, then come back.',
    '—let love be a practice, not a test.',
    '—keep the bond warmer than the argument.',
  ];
  const generated = cartesianPhrases(starts, middles, (s, m) => `${s} ${m} ${pickRandom(ends)}`);
  const shadowWeaves = conflictShadows.map(
    (shadow) =>
      `When ${shadow} appears, return to ${pickRandom(healingKeys)}—it shifts the whole atmosphere.`,
  );

  return clampPool([...base, ...generated, ...shadowWeaves]);
})();

const emotionalConnections = (() => {
  const base = [
    'You’re capable of a deep, healing emotional bond if trust is nurtured.',
    'Your emotional connection may start softly, then become unshakable.',
    'You sense each other’s moods more than you realize—use that gift gently.',
    'When you feel safe, it becomes easy to share fears and dreams.',
    'This bond can feel like being understood without having to explain everything.',
    'You soothe each other’s nervous systems when the world gets too loud.',
    'Your intimacy deepens when you allow yourselves to be imperfect.',
    'There’s a “tell me the truth, even if it trembles” quality here.',
    'You have a talent for reuniting after distance—like tides returning to shore.',
    'Your hearts communicate in symbols: songs, glances, timing, small miracles.',
    'This connection feels protective, as if love stands guard at the door.',
    'When you’re aligned, the bond feels like home with a view of the stars.',
    'You’re emotionally strongest when you stop performing and start confessing.',
    'There’s an almost psychic attunement when you’re honest with yourselves.',
    'Love grows here through consistency: being there, again and again.',
  ];

  const openings = [
    'Emotionally, you share',
    'Your bond carries',
    'Your hearts are linked by',
    'In private, your love becomes',
    'The feeling between you is',
    'When you’re close, it’s',
    'Deep down, you have',
    'Your emotional intimacy is',
    'Your tenderness feels like',
    'Your connection offers',
  ];
  const cores = [
    'a safe harbor',
    'a moonlit sanctuary',
    'a quiet understanding',
    'a healing mirror',
    'a soft devotion',
    'a secret language',
    'a protective warmth',
    'a shared pulse',
    'a gentle gravity',
    'a mystical attunement',
  ];
  const closers = [
    'that strengthens each time you choose honesty.',
    'that deepens when you show up on hard days.',
    'that grows when you listen without fixing.',
    'that becomes undeniable when you’re vulnerable.',
    'that feels fated when you stop resisting it.',
    'that brightens when you celebrate each other.',
    'that heals old stories with new tenderness.',
    'that settles when reassurance is given freely.',
    'that expands when you share dreams out loud.',
    'that blooms when you protect each other’s feelings.',
  ];
  const generated = cartesianPhrases(openings, cores, (o, c) => `${o} ${c} ${pickRandom(closers)}`);

  return clampPool([...base, ...generated]);
})();

const longTermPotentials = (() => {
  const base = [
    'Long-term potential is strong if you keep choosing honest communication.',
    'This connection can last if growth is welcomed, not controlled.',
    'With shared goals and mutual respect, this bond can feel like home.',
    'Over time, this pairing can teach both of you what loyal partnership means.',
    'If you build rituals—weekly dates, daily kindness—love becomes effortless.',
    'This can become a legacy love: steady, protective, and deeply romantic.',
    'Long-term happiness is likely when reassurance becomes your default.',
    'This love can mature beautifully, like wine in a dark cellar of trust.',
    'If you keep your friendship alive, the romance will keep returning.',
    'You have the potential for a “forever” that still feels alive and curious.',
    'Your future is brightest when you stay on the same side during conflict.',
    'This bond grows stronger with time—especially after the first big test.',
    'There is real potential for shared home, shared dreams, shared peace.',
    'If you honor each other’s independence, commitment becomes sweeter.',
    'This can be a long love story if you keep choosing each other on purpose.',
  ];

  const timeframes = [
    'In the long run',
    'Over the years',
    'With time',
    'As seasons change',
    'As life gets real',
    'When the honeymoon glow settles',
    'After the first few storms',
    'When routines solidify',
    'If you stay intentional',
    'When you keep your promises',
  ];
  const potentials = [
    'you can become each other’s safe place',
    'you can build a partnership that feels protected by fate',
    'you can create a love that steadies both nervous systems',
    'you can turn chemistry into commitment without losing the spark',
    'you can become best friends who never stop flirting',
    'you can build a home that feels warm even on hard days',
    'you can learn to fight fair and love harder',
    'you can grow into a bond that feels quietly legendary',
    'you can turn shared dreams into shared plans',
    'you can keep romance alive through simple devotion',
  ];
  const conditions = [
    'if you practice repair quickly and often.',
    'if you protect tenderness during conflict.',
    'if you keep your communication honest and soft.',
    'if you refuse to punish each other with silence.',
    'if you keep choosing curiosity over assumptions.',
    'if you celebrate each other like it’s a ritual.',
    'if you don’t let pride speak louder than love.',
    'if you stay faithful to the friendship underneath.',
    'if you make space for each other’s seasons.',
    'if you turn challenges into shared quests.',
  ];
  const generated = cartesianPhrases(timeframes, potentials, (t, p) => `${t}, ${p} ${pickRandom(conditions)}`);

  return clampPool([...base, ...generated]);
})();

const romanticAdvicePool = (() => {
  const base = [
    'Slow down your reactions and speed up your reassurance.',
    'Say the kind thing you’re thinking instead of waiting for the perfect moment.',
    'Celebrate small moments; they become the foundation of bigger love.',
    'Choose curiosity over assumptions when something feels off.',
    'When you miss them, say it—longing is a love language.',
    'Make affection visible: touch, compliments, and small check-ins.',
    'Protect your connection from outside noise; keep the bond sacred.',
    'Argue like lovers, not enemies—soften the voice, keep the respect.',
    'Replace “you always” with “I felt”—it changes the whole conversation.',
    'Make time for play; joy is the fastest path back to closeness.',
    'Offer reassurance before explanation—hearts hear warmth first.',
    'Be brave enough to be specific about your needs.',
    'Don’t test love in silence; ask for what you want directly.',
    'Let apologies be spells: sincere, timely, and paired with change.',
    'Romance grows where consistency lives—show up in little ways.',
    'When you’re overwhelmed, name it. It prevents unnecessary storms.',
    'Keep a shared ritual: a weekly date, a nightly message, a tiny vow.',
    'Speak your admiration out loud; it feeds the bond.',
    'When conflict appears, hold hands first—then talk.',
    'If jealousy visits, invite reassurance, not accusation.',
  ];

  const adviceStarts = [
    'The crystal ball suggests',
    'A gentle spell for you is',
    'Your love medicine is',
    'If you want this to flourish,',
    'For sweeter harmony,',
    'To keep the spark sacred,',
    'When the energy feels tense,',
    'To deepen devotion,',
    'To protect your bond,',
    'To invite romance back in,',
  ];
  const adviceMiddles = [
    'offer reassurance before you ask for understanding',
    'name the feeling beneath the reaction',
    'trade assumptions for questions',
    'build a small daily ritual you never skip',
    'turn hard conversations into slow conversations',
    'choose tenderness even when you feel right',
    'ask directly for what you need—no riddles',
    'repair quickly, then return to play',
    'protect each other’s dignity in arguments',
    'say “I miss you” as soon as it’s true',
  ];
  const adviceEnds = [
    '—love hears the tone more than the words.',
    '—that’s how trust becomes effortless.',
    '—that’s where your magic lives.',
    '—it keeps your hearts in the same orbit.',
    '—and the spark will feel safe to stay.',
    '—it turns tension into intimacy.',
    '—it makes devotion feel light, not heavy.',
    '—and romance returns like a tide.',
    '—it invites softness back into the room.',
    '—and your future brightens immediately.',
  ];
  const generated = cartesianPhrases(adviceStarts, adviceMiddles, (s, m) => `${s} ${m} ${pickRandom(adviceEnds)}`);

  return clampPool([...base, ...generated]);
})();

const bestRelationshipTypes = (() => {
  const base = [
    'Supportive best friends with a romantic spark',
    'Partners in growth and shared adventures',
    'Gentle healers for each other’s hearts',
    'Creative collaborators building a life together',
    'Softly devoted lovers who protect each other’s peace',
    'Two dreamers who turn romance into a ritual',
    'A steady couple with playful chemistry',
    'A passionate duo learning healthy balance',
    'A loyal partnership with a flirtatious edge',
    'A home-building pair with a wild streak',
    'A “safe harbor” love with deep emotional intimacy',
    'A witty, talkative romance that never gets boring',
    'A sensual, grounded bond that feels secure',
    'A transformative love that makes both people braver',
    'A slow-blooming devotion that lasts',
  ];

  const archetypes = [
    'Star-crossed sweethearts who choose each other anyway',
    'Best friends who keep falling in love',
    'Soul-students learning tenderness together',
    'Adventure partners with a private sanctuary',
    'Co-creators turning dreams into plans',
    'Lovers with healer energy',
    'A playful duo with deep loyalty',
    'A passionate pair with a soft center',
    'Two romantics building something real',
    'A power-couple with gentle communication',
  ];

  const generated = cartesianPhrases(archetypes, mysticalAdjectives.slice(0, 12), (a, adj) => {
    return `${a} in a ${adj} chapter`;
  });

  return clampPool([...base, ...archetypes, ...generated]);
})();

// --- New datasets (80–120 each) ---
const romanticMoments = (() => {
  const base = [
    'A moonlit walk where the conversation turns soft and honest without warning',
    'Sharing headphones—one song, two heartbeats, and a quiet smile',
    'A late-night text that arrives exactly when one of you needed it',
    'Cooking together, touching shoulders, laughing at the same small mistake',
    'A gentle forehead kiss that says, “I’m here. I’m staying.”',
    'A spontaneous drive with the windows down and the future feeling possible',
    'Dancing in a living room like the world isn’t watching',
    'A slow glance across a crowded room that feels like a private vow',
    'Holding hands during a hard conversation and choosing love anyway',
    'A shared sunrise that turns into a secret anniversary',
    'A warm hug that resets the entire day',
    'A quiet apology whispered like a prayer',
    'Stargazing together—naming constellations and making new ones',
    'An “I miss you” message that lands like honey on the heart',
    'A surprise note tucked where only the other will find it',
    'A rainy-day cuddle that feels like healing',
    'A playful kiss mid-laughter that turns into stillness',
    'A shared dessert, shared spoon, shared unspoken affection',
    'A long embrace at the door that makes leaving difficult',
    'A slow dance in the kitchen while something sweet is baking',
  ];

  const scenes = [
    'under streetlights',
    'beneath a crescent moon',
    'during a stormy afternoon',
    'on a quiet Sunday morning',
    'after a long day',
    'before an important moment',
    'in the middle of nowhere',
    'at the edge of the city',
    'by candlelight',
    'in a place that feels fated',
  ];
  const actions = [
    'you trade secrets and feel safer than expected',
    'you laugh until you forget what you were worried about',
    'you hold hands and the world softens',
    'you share a look that says everything',
    'you speak one honest sentence that changes the timeline',
    'you realize you miss each other even while together',
    'you choose tenderness instead of being right',
    'you notice how naturally your rhythms match',
    'you feel the bond deepen without any dramatic moment',
    'you promise something small—and mean it',
  ];
  const generated = cartesianPhrases(scenes, actions, (s, a) => `A romantic moment ${s}: ${a}.`);

  return clampPool([...base, ...generated]);
})();

const emotionalGrowthThemes = (() => {
  const base = [
    'Learning to ask for reassurance without shame',
    'Turning pride into vulnerability—slowly, safely',
    'Healing old stories around abandonment and return',
    'Practicing honesty that doesn’t wound',
    'Choosing repair quickly instead of punishing silence',
    'Learning to receive love without testing it',
    'Building trust through consistency, not intensity',
    'Transforming jealousy into clearer needs',
    'Making space for both independence and devotion',
    'Letting tenderness be strength, not weakness',
    'Learning to fight fair and love harder',
    'Replacing assumption with curiosity as a daily habit',
    'Allowing love to be calm, not always dramatic',
    'Learning to soothe each other’s nervous systems',
    'Turning “me vs you” into “us vs the problem”',
    'Releasing control so trust can breathe',
    'Letting joy be part of commitment',
    'Choosing direct communication over mind-reading',
    'Learning to stay present during emotional waves',
    'Turning apologies into changed patterns',
  ];

  const themesA = [
    'learning to',
    'practicing',
    'unlearning',
    'softening into',
    'growing through',
    'becoming brave enough for',
    'making peace with',
    'transforming',
    'remembering to',
    'committing to',
  ];
  const themesB = [
    'gentle honesty',
    'tender boundaries',
    'consistent reassurance',
    'emotional patience',
    'trust that’s earned slowly',
    'vulnerability without fear',
    'repair after conflict',
    'love that feels safe',
    'clarity over guessing',
    'warm communication',
  ];
  const themesC = [
    'as a shared ritual',
    'without losing your individuality',
    'so the bond feels lighter',
    'so intimacy can deepen naturally',
    'so romance stays kind',
    'so the future feels protected',
    'so your hearts stay open',
    'so conflict becomes less scary',
    'so devotion feels effortless',
    'so love becomes a home',
  ];
  const generated = cartesianPhrases(themesA, themesB, (a, b) => `${a} ${b} ${pickRandom(themesC)}`);

  return clampPool([...base, ...generated]);
})();

const bondingExperiences = (() => {
  const base = [
    'Building a shared ritual—weekly dates, nightly calls, or morning messages',
    'Traveling somewhere new and learning each other’s rhythms in real time',
    'Making a playlist that feels like your relationship in sound',
    'Cooking a signature meal together and laughing through the mess',
    'Taking a long walk after a disagreement and choosing repair',
    'Planning a small future thing—a trip, a project, a home upgrade',
    'Creating a “no phones” hour that feels like sacred time',
    'Writing each other a letter you don’t rush',
    'Visiting a bookstore and picking stories for each other',
    'Stargazing with blankets and honest conversation',
    'Trying a new hobby together and being beginners on purpose',
    'Volunteering or helping someone together—love grows through service',
    'Taking photos of each other like you’re already memories',
    'Hosting friends together and feeling like a true team',
    'Spending a quiet day with no agenda and noticing how good it feels',
    'Creating a shared savings goal or dream board',
    'Learning each other’s comfort rituals when stress hits',
    'Turning chores into a game and celebrating tiny wins',
    'Making a “firsts” list: first concert, first road trip, first sunrise',
    'Choosing a shared symbol—bracelets, a charm, a small talisman',
  ];

  const experiencesA = [
    'a sunrise',
    'a road trip',
    'a rainy afternoon',
    'a candlelit dinner',
    'a beach walk',
    'a mountain view',
    'a quiet café',
    'a crowded festival',
    'a museum date',
    'a cozy movie night',
  ];
  const experiencesB = [
    'where you share a secret',
    'where you laugh until you can’t breathe',
    'where you make a small promise',
    'where you feel seen without explaining',
    'where you choose tenderness over pride',
    'where you talk about the future softly',
    'where you learn each other’s boundaries',
    'where you take care of each other',
    'where you create a ritual together',
    'where you realize you’re a team',
  ];
  const generated = cartesianPhrases(experiencesA, experiencesB, (a, b) => `Sharing ${a} ${b}.`);

  return clampPool([...base, ...generated]);
})();

const soulmateSignals = (() => {
  const base = [
    'You feel calmer around them, even when life is chaotic',
    'Your timing keeps syncing in uncanny ways',
    'You keep choosing each other after disagreements—without drama',
    'You feel seen in ways you didn’t know you needed',
    'You can be quiet together without it feeling awkward',
    'You start building “we” language naturally',
    'Your friends notice you soften around each other',
    'Your laughter becomes a shared refuge',
    'You keep meeting each other in the middle without keeping score',
    'You feel protective of each other’s peace',
    'You’re more honest with yourself because of this bond',
    'You feel inspired to become better, not smaller',
    'Your affection feels like homecoming',
    'You recognize each other’s moods before words',
    'The connection survives distance and returns stronger',
    'Your love feels real in small moments, not just big ones',
    'You keep encountering the same symbols—songs, numbers, places',
    'You feel a gentle certainty that doesn’t need proof',
    'You’re still curious about each other after the novelty fades',
    'You sense that this love has a lesson and a blessing',
  ];

  const signalsA = [
    'You notice',
    'It’s a sign when',
    'A soulmate signal is',
    'The universe whispers when',
    'Your heart knows when',
    'It feels fated when',
    'A quiet omen appears when',
    'Your bond reveals itself when',
    'The proof arrives when',
    'Destiny hints when',
  ];
  const signalsB = [
    'you choose repair quickly',
    'you miss each other even after a short day',
    'you feel safe enough to be imperfect',
    'you both soften at the same time',
    'you stop testing and start trusting',
    'you feel peaceful after talking, not exhausted',
    'your affection becomes consistent',
    'your lives start aligning naturally',
    'your dreams start including each other',
    'your love feels quiet but powerful',
  ];
  const signalsC = [
    '—that’s not coincidence; that’s devotion forming.',
    '—that’s fate asking you to take it seriously.',
    '—that’s a sign the bond is meant to deepen.',
    '—that’s the universe rewarding maturity.',
    '—that’s love becoming a sanctuary.',
    '—that’s a soulmate pattern, not a passing spark.',
    '—that’s what “meant to be” looks like in real life.',
    '—that’s the heart-thread tightening gently.',
    '—that’s an omen of longevity.',
    '—that’s the start of something lasting.',
  ];
  const generated = cartesianPhrases(signalsA, signalsB, (a, b) => `${a} ${b} ${pickRandom(signalsC)}`);

  return clampPool([...base, ...generated]);
})();

const destinyMessages = (() => {
  const base = [
    'The universe is not asking for perfection—only devotion with open eyes.',
    'This connection arrives like a key: it opens a door you’ve been circling for years.',
    'Fate favors the brave-hearted here—say what you feel before the moment passes.',
    'Your love is a lesson in tenderness: strength that doesn’t harden.',
    'Two paths are crossing for a reason; don’t treat it like an accident.',
    'The bond is real, but it must be chosen—again and again.',
    'If you honor timing and truth, this can become a love you trust.',
    'The stars do not promise ease; they promise meaning.',
    'A future version of you is grateful you stayed soft.',
    'This love is a mirror: it shows what you’re ready to heal.',
    'Destiny whispers through small moments—watch for the gentle signs.',
    'The lesson is simple: protect each other’s hearts like sacred objects.',
    'You are being invited into a more mature kind of romance.',
    'A quiet vow wants to be spoken: “I will come back to you.”',
    'If you keep your word, the universe will keep opening doors.',
    'This connection asks for honesty that feels like kindness, not confession.',
    'Love wants to grow here—don’t starve it with silence.',
    'Trust is the spell. Consistency is the ritual.',
    'Let the past stay past; this bond wants a clean page.',
    'A destined connection doesn’t always arrive loudly—sometimes it arrives gently.',
  ];

  const starts = [
    'Destiny says:',
    'The crystal ball reveals:',
    'The universe murmurs:',
    'Your future self whispers:',
    'A hidden omen appears:',
    'The stars confess:',
    'The moonlight warns:',
    'A soft prophecy arrives:',
    'The cosmos promises:',
    'The oracle declares:',
  ];
  const middles = [
    'choose tenderness over pride',
    'say what you feel before fear edits it',
    'protect the bond from careless words',
    'build rituals that make love reliable',
    'don’t punish each other with silence',
    'let curiosity replace assumptions',
    'be brave with reassurance',
    'repair quickly and return to play',
    'trust what is consistent, not just intense',
    'keep the friendship alive beneath the romance',
  ];
  const ends = [
    '—that is how fate becomes a home.',
    '—that is how a spark becomes a legacy.',
    '—that is how the heart-thread stays unbroken.',
    '—that is how love remains gentle and strong.',
    '—that is how you avoid repeating old stories.',
    '—that is how devotion becomes effortless.',
    '—that is how the future brightens.',
    '—that is how you keep magic without chaos.',
    '—that is how trust becomes natural.',
    '—that is how you stay in the same orbit.',
  ];
  const generated = cartesianPhrases(starts, middles, (s, m) => `${s} ${m} ${pickRandom(ends)}`);

  return clampPool([...base, ...generated]);
})();

const cosmicInsights = (() => {
  const base = [
    'Your energies don’t just meet—they weave, like two constellations sharing a star.',
    'This pairing feels like the universe mixing firelight and moonwater in the same cup.',
    'The cosmic lesson here is timing: don’t rush what wants to become sacred.',
    'Your connection strengthens when you honor each other’s emotional weather.',
    'You are a reminder to each other that love can be both calm and thrilling.',
    'This bond asks for emotional courage more than romantic performance.',
    'You’re learning how to keep desire warm without letting it become chaotic.',
    'Your relationship thrives when you treat trust like a daily ritual.',
    'The stars suggest you’re meant to teach each other a kinder way to love.',
    'This connection feels karmic in the gentlest way—more healing than harsh.',
    'Your chemistry brightens when your communication stays soft and clear.',
    'The universe is giving you a second language: reassurance.',
    'You’re compatible in a way that makes growth feel romantic.',
    'Your love feels like a lighthouse—steady guidance through emotional fog.',
    'There’s a “meant to return” quality here; distance doesn’t erase it.',
    'This pairing carries a strange luck—doors open when you’re aligned.',
    'The cosmos highlights one truth: you’re safer together than apart.',
    'Your bond wants more depth, not more drama.',
    'This connection can become a sanctuary if you protect it from ego.',
    'The stars don’t call this easy—they call it worth it.',
  ];

  const insightsA = [
    'The cosmos notes',
    'Your charts whisper',
    'The moon reveals',
    'The stars highlight',
    'Your elements suggest',
    'A hidden constellation shows',
    'Fate indicates',
    'A comet-sign appears',
    'Your aura confirms',
    'The oracle sees',
  ];
  const insightsB = [
    'a shared lesson in patience',
    'a gift for emotional repair',
    'a talent for rebuilding closeness',
    'a need for reassurance to be spoken',
    'a romance that thrives on rituals',
    'a bond that strengthens through honesty',
    'a chemistry amplified by safety',
    'a friendship that protects passion',
    'a love that matures beautifully',
    'a destiny that favors direct truth',
  ];
  const insightsC = [
    'when you choose each other daily.',
    'when you keep your words warm.',
    'when you slow down and listen.',
    'when you stop testing love in silence.',
    'when you repair quickly after storms.',
    'when you guard each other’s dignity.',
    'when you treat affection as sacred.',
    'when you honor each other’s pace.',
    'when you protect the bond from ego.',
    'when you let devotion be simple.',
  ];
  const generated = cartesianPhrases(insightsA, insightsB, (a, b) => `${a} ${b} ${pickRandom(insightsC)}`);

  return clampPool([...base, ...generated]);
})();

// --- Dynamic phrase builders (millions of combos) ---
function pickWithDynamic(staticPool, dynamicFn, probability = 0.35) {
  if (Math.random() < probability) return dynamicFn();
  return pickRandom(staticPool);
}

function buildDynamicPhrase(sign1, sign2) {
  const el1 = elementMap[sign1] || 'Unknown';
  const el2 = elementMap[sign2] || 'Unknown';

  const skies = [
    'under a hush of moonlight',
    'beneath a star-salted sky',
    'when the night feels velvet-dark',
    'as dawn rewrites the horizon',
    'while the world sleeps and truth is louder',
    'when the air feels charged with omen',
    'in the quiet between messages',
    'as if the universe leans in to listen',
  ];
  const verbs = [
    'weaves',
    'awakens',
    'steadies',
    'ignites',
    'softens',
    'deepens',
    'magnifies',
    'restores',
  ];
  const arcs = [
    'trust grows',
    'reassurance is spoken',
    'you choose repair',
    'you stop testing and start telling the truth',
    'patience becomes your ritual',
    'you protect each other’s dignity',
    'you meet in the middle',
    'you keep the friendship alive',
  ];
  const seeds = [
    `A ${pickRandom(emotionalTextures)} ${pickRandom(bondNouns)} that ${pickRandom(verbs)} as ${pickRandom(arcs)}.`,
    `Between ${sign1} and ${sign2}, there is a ${pickRandom(mysticalAdjectives)} pull—strongest when ${pickRandom(arcs)}.`,
    `Your elements (${el1} + ${el2}) make a ${pickRandom(mysticalAdjectives)} pattern: love deepens when ${pickRandom(arcs)}.`,
    `A ${pickRandom(mysticalAdjectives)} romance ${pickRandom(skies)}—and it grows when ${pickRandom(arcs)}.`,
    `This bond feels ${pickRandom(emotionalTextures)} and ${pickRandom(mysticalAdjectives)}; it steadies as ${pickRandom(arcs)}.`,
  ];
  return pickRandom(seeds);
}

function generateLoveCompatibility(sign1, sign2) {
  const relationshipStyle = pickWithDynamic(relStyles, () => buildDynamicPhrase(sign1, sign2), 0.28);
  const attractionEnergy = pickWithDynamic(attractionEnergyPool, () => buildDynamicPhrase(sign1, sign2), 0.22);
  const communicationStyle = pickWithDynamic(communicationStyles, () => buildDynamicPhrase(sign1, sign2), 0.18);
  const loveStrengthsText = pickWithDynamic(loveStrengths, () => buildDynamicPhrase(sign1, sign2), 0.18);
  const possibleChallengesText = pickWithDynamic(possibleChallenges, () => buildDynamicPhrase(sign1, sign2), 0.14);
  const emotionalConnection = pickWithDynamic(emotionalConnections, () => buildDynamicPhrase(sign1, sign2), 0.16);
  const longTermPotential = pickWithDynamic(longTermPotentials, () => buildDynamicPhrase(sign1, sign2), 0.14);
  const romanticAdvice = pickWithDynamic(romanticAdvicePool, () => buildDynamicPhrase(sign1, sign2), 0.12);
  const bestRelationshipType = pickWithDynamic(bestRelationshipTypes, () => buildDynamicPhrase(sign1, sign2), 0.08);

  const romanticMoment = pickWithDynamic(romanticMoments, () => buildDynamicPhrase(sign1, sign2), 0.12);
  const cosmicInsight = pickWithDynamic(cosmicInsights, () => buildDynamicPhrase(sign1, sign2), 0.18);
  const destinyMessage = pickWithDynamic(destinyMessages, () => buildDynamicPhrase(sign1, sign2), 0.22);

  // Provide both the new “engine” keys and the legacy API keys your UI already uses.
  return {
    relationshipStyle,
    attractionEnergy,
    communication: communicationStyle,
    communicationStyle,
    strengths: loveStrengthsText,
    loveStrengths: loveStrengthsText,
    challenges: possibleChallengesText,
    possibleChallenges: possibleChallengesText,
    emotionalBond: emotionalConnection,
    emotionalConnection,
    longTermPotential,
    advice: romanticAdvice,
    romanticAdvice,
    relationshipType: bestRelationshipType,
    bestRelationshipType,
    romanticMoment,
    cosmicInsight,
    destinyMessage,

    // Extra variation hooks (not required by frontend, but useful if you decide to render more lines later).
    emotionalGrowthTheme: pickRandom(emotionalGrowthThemes),
    bondingExperience: pickRandom(bondingExperiences),
    soulmateSignal: pickRandom(soulmateSignals),
    dynamicPhrase: buildDynamicPhrase(sign1, sign2),
  };
}

module.exports = {
  pickRandom,
  generateLoveCompatibility,
  pools: {
    relStyles,
    attractionEnergyPool,
    communicationStyles,
    loveStrengths,
    possibleChallenges,
    emotionalConnections,
    longTermPotentials,
    romanticAdvicePool,
    bestRelationshipTypes,
    romanticMoments,
    emotionalGrowthThemes,
    bondingExperiences,
    soulmateSignals,
    destinyMessages,
    cosmicInsights,
  },
};

