import type { ReactNode } from 'react'
import ChromeDivider from '../components/ui/ChromeDivider'
import EmissiveTrace from '../components/ui/EmissiveTrace'
import EngravedText from '../components/ui/EngravedText'
import ExtrudedText from '../components/ui/ExtrudedText'
import MetricNumber from '../components/ui/MetricNumber'
import PorcelainCard from '../components/ui/PorcelainCard'

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="whitespace-nowrap font-body text-xs uppercase tracking-[0.25em] text-graphite/50">
          {label}
        </span>
        <ChromeDivider />
      </div>
      {children}
    </section>
  )
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="font-body text-[11px] uppercase tracking-[0.2em] text-graphite/40">{children}</span>
  )
}

export default function DebugPage() {
  return (
    <main className="min-h-screen bg-bone text-graphite">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-20 px-8 py-24">
        <header className="flex flex-col gap-2">
          <h1 className="font-display text-[56px] uppercase leading-none tracking-tight">
            Material Component Library
          </h1>
          <p className="font-body text-sm text-graphite/60">
            /debug · Phase C · every element made from the cyborg's materials
          </p>
        </header>

        {/* 1 — ChromeDivider */}
        <Block label="ChromeDivider">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Tag>width 100%</Tag>
              <ChromeDivider />
            </div>
            <div className="flex flex-col gap-2">
              <Tag>width 40%</Tag>
              <ChromeDivider width="40%" />
            </div>
          </div>
        </Block>

        {/* 2 — EmissiveTrace on BOTH grounds */}
        <Block label="EmissiveTrace · tested on porcelain + void">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-6 rounded-[4px] bg-porcelain p-8" style={{ border: '1px solid #C8CDD2' }}>
              <Tag>on porcelain (light)</Tag>
              <EmissiveTrace on="light" />
              <p className="font-body text-sm text-graphite">
                A key term with an{' '}
                <span className="relative inline-block">
                  emissive underline
                  <EmissiveTrace on="light" className="absolute -bottom-1 left-0" />
                </span>{' '}
                in body text.
              </p>
            </div>

            <div className="flex flex-col gap-6 rounded-[4px] bg-void p-8" style={{ border: '1px solid #1A1A1A' }}>
              <span className="font-body text-[11px] uppercase tracking-[0.2em] text-bone/40">on void (dark)</span>
              <EmissiveTrace on="dark" />
              <p className="font-body text-sm text-bone">
                A key term with an{' '}
                <span className="relative inline-block">
                  emissive underline
                  <EmissiveTrace on="dark" className="absolute -bottom-1 left-0" />
                </span>{' '}
                in body text.
              </p>
            </div>
          </div>
        </Block>

        {/* 3 — Engraved vs Extruded (must read as different) */}
        <Block label="EngravedText vs ExtrudedText · inset carving vs raised sculpture">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              className="flex flex-col items-center gap-6 rounded-[4px] bg-porcelain py-14"
              style={{ border: '1px solid #C8CDD2' }}
            >
              <Tag>Engraved — carved into the surface</Tag>
              <EngravedText style={{ fontSize: 84 }}>SILICON</EngravedText>
            </div>
            <div
              className="flex flex-col items-center gap-6 rounded-[4px] bg-porcelain py-14"
              style={{ border: '1px solid #C8CDD2' }}
            >
              <Tag>Extruded — raised off the surface</Tag>
              <ExtrudedText style={{ fontSize: 84 }}>SILICON</ExtrudedText>
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
            <div className="flex flex-col gap-2">
              <Tag>engraved · depth 2 / 6</Tag>
              <div className="flex items-end gap-6">
                <EngravedText depth={2} style={{ fontSize: 40 }}>
                  SYSTEMS
                </EngravedText>
                <EngravedText depth={6} style={{ fontSize: 40 }}>
                  SYSTEMS
                </EngravedText>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Tag>extruded · depth 3 / 8</Tag>
              <div className="flex items-end gap-6">
                <ExtrudedText depth={3} style={{ fontSize: 40 }}>
                  SYSTEMS
                </ExtrudedText>
                <ExtrudedText depth={8} style={{ fontSize: 40 }}>
                  SYSTEMS
                </ExtrudedText>
              </div>
            </div>
          </div>
        </Block>

        {/* 4 — PorcelainCard */}
        <Block label="PorcelainCard · hairline chrome trim, cyan trace on hover">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <PorcelainCard>
              <Tag>rest — hover for the cyan trace</Tag>
              <h3 className="mt-3 font-display text-2xl uppercase">Conformal Prediction</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-graphite/70">
                Off-white ceramic fill, 1px chrome trim, soft inner shadow.
              </p>
            </PorcelainCard>
            <PorcelainCard traceVisible>
              <Tag>hover state (forced)</Tag>
              <h3 className="mt-3 font-display text-2xl uppercase">Conformal Prediction</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-graphite/70">
                Cyan trace lit along the top edge, glow bleeding inward.
              </p>
            </PorcelainCard>
          </div>
        </Block>

        {/* 5 — MetricNumber */}
        <Block label="MetricNumber · Anton tabular-nums, cyan, emissive glow">
          <div className="flex flex-col gap-3">
            <Tag>display scale ~120px</Tag>
            <div className="flex items-end gap-4">
              <MetricNumber suffix="%" style={{ fontSize: 120 }}>
                94
              </MetricNumber>
              <span className="mb-3 font-body text-sm text-graphite/50">conformal coverage</span>
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-14">
            <div className="flex flex-col gap-2">
              <MetricNumber>1</MetricNumber>
              <Tag>published preprint</Tag>
            </div>
            <div className="flex flex-col gap-2">
              <MetricNumber suffix="yr">2</MetricNumber>
              <Tag>AV perception</Tag>
            </div>
            <div className="flex flex-col gap-2">
              <MetricNumber suffix="%">94</MetricNumber>
              <Tag>coverage</Tag>
            </div>
          </div>
        </Block>
      </div>
    </main>
  )
}
