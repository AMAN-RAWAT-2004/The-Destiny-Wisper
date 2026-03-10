import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'rounded-full px-3 py-1 text-sm transition',
          isActive
            ? 'bg-white/15 text-white'
            : 'text-white/80 hover:bg-white/10 hover:text-white',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  )
}

export function SiteShell({ children }) {
  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-3"
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur hover:bg-white/15"
            >
              <span className="text-lg font-semibold tracking-wide">
                Destiny Wisper
              </span>
              <span className="text-xs text-white/60 group-hover:text-white/70">
                Fortune Guesser
              </span>
            </Link>
          </motion.div>

          <nav className="flex flex-wrap items-center gap-2">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/compatibility">Compatibility</NavItem>
            <NavItem to="/wheel">Fortune Wheel</NavItem>
          </nav>
        </header>

        <main className="mt-8">{children}</main>

        <footer className="mt-14 border-t border-white/10 pt-6 text-sm text-white/60">
          Built for fun predictions. Not medical, financial, or life advice.
        </footer>
      </div>
    </div>
  )
}

