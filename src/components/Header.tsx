import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { nav, type NavItem } from '~/data/nav'
import { CaretDown, Close, Hamburger } from './icons'
import { Img } from './Img'

function NavLabel({ item, caret = true, onNavigate, onToggle }: { item: NavItem; caret?: boolean; onNavigate?: () => void; onToggle?: () => void }) {
  const content = (
    <>
      <span className="txt">{item.label}</span>
      {caret && item.children && <CaretDown className="nav-caret" />}
    </>
  )
  if (!item.href) {
    return (
      <button type="button" className="nav-label" style={{ border: 0, background: 'none' }} aria-haspopup="true" onClick={onToggle}>
        {content}
      </button>
    )
  }
  return (
    <Link to={item.href} className="nav-label" onClick={onNavigate}>
      {content}
    </Link>
  )
}

function SubItems({ item, onNavigate, className }: { item: NavItem; onNavigate?: () => void; className?: string }) {
  if (!item.children) return null
  return (
    <ul className={className}>
      {item.children.map((child) => {
        const [to, hash] = child.href.split('#')
        return (
          <li key={child.href}>
            <Link to={to} hash={hash} className="dd-item" onClick={onNavigate}>
              {child.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

function MobileItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((v) => !v)
  return (
    <li>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <NavLabel item={item} caret={false} onNavigate={onNavigate} onToggle={toggle} />
        {item.children && (
          <button type="button" className="mmenu-toggle" aria-label={`More ${item.label} pages`} aria-expanded={open} onClick={toggle}>
            <CaretDown className="nav-caret" />
          </button>
        )}
      </div>
      {open && <SubItems item={item} onNavigate={onNavigate} className="mmenu-sub" />}
    </li>
  )
}

export function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="hdr">
      <Link to="/" className="hdr-logo" aria-label="Plastik 'di Walastik home">
        <Img id="logo-plastik" eager sizes="(min-width: 1024px) 9vw, 25vw" alt="Plastik 'di Walastik" />
      </Link>

      <nav aria-label="Site" className="d-only">
        <ul className="nav">
          {nav.map((item) => (
            <li key={item.label} className="nav-item">
              <NavLabel item={item} />
              {item.children && (
                <div className="dd">
                  <SubItems item={item} className="dd-list" />
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="hdr-c4">
        <Img id="d3a468_b61bd3527ef64ff6a3dbe2cb1eb0cc82~mv2" eager sizes="96px" alt="C4 Studios" />
      </div>

      <button type="button" className="burger m-only" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
        <Hamburger />
      </button>

      {open && (
        <div className="mmenu m-only" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className="mmenu-close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <Close />
          </button>
          <nav aria-label="Site">
            <ul className="mmenu-list">
              {nav.map((item) => (
                <MobileItem key={item.label} item={item} onNavigate={() => setOpen(false)} />
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
