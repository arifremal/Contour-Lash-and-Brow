import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navLinks } from '../data/site'
import { BookButton } from './BookButton'
import { Logo } from './Logo'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="e-con e-con--full e-con--column site-header">
      <div className="e-con-inner e-con-inner--row header-bar">
        <Logo />

        <nav className="header-nav" aria-label="Primary">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-cta">
          <BookButton />
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="e-con-inner e-con-inner--column mobile-menu">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <BookButton />
        </div>
      )}
    </header>
  )
}
