import type { CSSProperties, ReactNode } from 'react'

/**
 * Phase B section shell: min-h-screen, section number top-left (Anton 32px cyan),
 * Anton heading (~96px). Real content is filled in per-section in later phases.
 */
export default function SectionShell({
  id,
  number,
  title,
  className = '',
  headingStyle,
  children,
}: {
  id?: string
  number: string
  title: string
  className?: string
  headingStyle?: CSSProperties
  children?: ReactNode
}) {
  return (
    <section id={id} className={`relative min-h-screen ${className}`}>
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col p-[clamp(32px,8vw,120px)]">
        <span
          className="font-display leading-none text-cyan"
          style={{ fontSize: 32, letterSpacing: '-0.02em' }}
        >
          {number}
        </span>
        <div className="flex flex-1 items-center">
          <h2
            className="font-display uppercase"
            style={{
              fontSize: 'clamp(56px, 11vw, 96px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              ...headingStyle,
            }}
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}
