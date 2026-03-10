import { motion } from 'framer-motion'

export function CrystalBall({ size = 120, subtle = false }) {
  const baseSize = typeof size === 'number' ? `${size}px` : size

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative inline-flex items-center justify-center"
      style={{ width: baseSize, height: baseSize }}
    >
      <motion.div
        animate={{
          y: subtle ? [0, -4, 0] : [0, -10, 0],
          boxShadow: subtle
            ? [
                '0 0 30px rgba(129, 140, 248, 0.35)',
                '0 0 45px rgba(244, 114, 182, 0.4)',
                '0 0 30px rgba(129, 140, 248, 0.35)',
              ]
            : [
                '0 0 45px rgba(129, 140, 248, 0.6)',
                '0 0 70px rgba(244, 114, 182, 0.7)',
                '0 0 45px rgba(129, 140, 248, 0.6)',
              ],
        }}
        transition={{
          duration: subtle ? 6 : 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex items-center justify-center rounded-full bg-gradient-to-b from-indigo-200 via-violet-300 to-sky-500/80"
        style={{ width: baseSize, height: baseSize }}
      >
        <div className="absolute inset-[18%] rounded-full bg-gradient-to-b from-white/70 via-white/10 to-transparent blur-[1px]" />
        <div className="absolute inset-[30%] rounded-full bg-gradient-to-b from-indigo-100/60 via-transparent to-transparent mix-blend-screen" />
        <div className="absolute -bottom-3 h-6 w-[55%] rounded-full bg-gradient-to-r from-slate-900/90 via-slate-800 to-slate-900/90 shadow-[0_12px_40px_rgba(15,23,42,0.9)]" />

        <div className="relative z-10 flex items-center gap-1 text-xs font-semibold tracking-widest text-indigo-950/60">
          <span className="text-[10px]">★</span>
          <span>DESTINY</span>
          <span className="text-[10px]">★</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

