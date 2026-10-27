import EngravedText from '../ui/EngravedText'
import EmissiveTrace from '../ui/EmissiveTrace'
import ResearchVisualStage from '../research/ResearchVisualStage'
import { research, type ResearchEntry } from '../../content/site'

/** Small porcelain tile with chrome hairline trim (a bare chrome border would vanish on the chrome ground). */
function Tag({ children }: { children: string }) {
  return (
    <li
      className="rounded-full bg-porcelain px-3 py-1 font-body text-xs uppercase tracking-[0.15em] text-graphite/80"
      style={{
        border: '1px solid #C8CDD2',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.85), 0 1px 2px rgba(58,58,58,0.08)',
      }}
    >
      {children}
    </li>
  )
}

function FeaturedEntry({ entry }: { entry: ResearchEntry }) {
  return (
    <article className="flex flex-col gap-6">
      <h3 className="font-display uppercase leading-[0.95] text-graphite" style={{ fontSize: 64, letterSpacing: '-0.01em' }}>
        {entry.title}
      </h3>
      <p className="font-body text-base font-medium text-graphite">{entry.role}</p>
      <p className="max-w-[60ch] font-body text-base leading-relaxed text-graphite/80">{entry.summary}</p>
      {entry.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {entry.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </ul>
      )}
      {entry.links.length > 0 && (
        <div className="flex flex-wrap gap-8">
          {entry.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="relative inline-block font-body text-sm text-graphite"
            >
              {l.label}
              <EmissiveTrace on="light" className="absolute -bottom-1 left-0" />
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

/** Act III — Research. Featured entry + its 3D scene; further entries as compact rows. */
export default function ResearchSection() {
  const [featured, ...others] = research.entries

  return (
    <section id="research" className="relative min-h-screen bg-chrome text-graphite">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col p-[clamp(32px,8vw,120px)]">
        <span className="font-display leading-none text-cyan" style={{ fontSize: 32, letterSpacing: '-0.02em' }}>
          03
        </span>
        <h2 className="mt-14 leading-none">
          <EngravedText style={{ fontSize: 'clamp(64px, 8vw, 96px)', lineHeight: 0.9 }}>{research.heading}</EngravedText>
        </h2>

        {featured && (
          <div className="mt-16 grid flex-1 grid-cols-1 items-center gap-12 md:grid-cols-2">
            <FeaturedEntry entry={featured} />
            <div className="aspect-[1.15] md:aspect-auto md:h-[clamp(320px,56vh,560px)]">
              <ResearchVisualStage visual={featured.visual} />
            </div>
          </div>
        )}

        {others.length > 0 && (
          <ul className="mt-16 border-b border-graphite/15">
            {others.map((e) => (
              <li key={e.id} className="flex items-baseline gap-3 border-t border-graphite/15 py-4 font-body text-base">
                <span className="font-medium text-graphite">{e.title}</span>
                <span aria-hidden className="text-graphite/40">·</span>
                <span className="min-w-0 truncate text-graphite/70">{e.role}</span>
                <span className="ml-auto shrink-0 text-xs uppercase tracking-[0.2em] text-graphite/60">{e.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
