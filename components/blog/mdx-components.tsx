import Link from 'next/link'
import { blogCtaConfig } from '@/lib/blog-cta-config'
import { BlogCtaButton } from '@/components/blog/BlogCtaButton'

export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <aside className="my-8 rounded-2xl border border-secondary/30 bg-secondary/10 p-6">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-foreground">Key takeaways</p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-foreground/90">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-secondary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export function Callout({ type = 'info', children }: { type?: 'info' | 'warning' | 'tip'; children: React.ReactNode }) {
  const styles = {
    info: 'border-blue-200 bg-blue-50 text-blue-950',
    warning: 'border-amber-300 bg-amber-50 text-amber-950',
    tip: 'border-secondary/40 bg-secondary/10 text-foreground',
  }

  return (
    <aside className={`my-8 rounded-2xl border p-6 text-base leading-7 ${styles[type] ?? styles.info}`}>
      {children}
    </aside>
  )
}

export function CTA({ slot = 'primary' }: { slot?: 'primary' | 'secondary' | 'inline-form' }) {
  if (slot === 'inline-form') {
    return (
      <div className="my-10">
        <div className="mb-4">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">{blogCtaConfig.inlineForm.eyebrow}</p>
          <h3 className="mt-2 font-serif text-2xl font-bold text-foreground tracking-tight">{blogCtaConfig.inlineForm.title}</h3>
        </div>
        <div className="rounded-2xl border border-secondary/40 bg-card p-6 shadow-sm">
          <p className="text-sm leading-6 text-muted-foreground">
            Send us the suburb, property, or question you want help with and the team will reply within one business day.
          </p>
          <BlogCtaButton
            label={blogCtaConfig.inlineForm.button}
            source="Blog Inline CTA"
            type="general-contact"
            className="mt-5"
          />
        </div>
      </div>
    )
  }

  if (slot === 'secondary') {
    const config = blogCtaConfig.secondary
    return (
      <aside className="my-10 rounded-2xl border-2 border-foreground/20 bg-card p-7 shadow-lg">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">{config.eyebrow}</p>
        <h3 className="mt-3 font-serif text-2xl font-bold leading-tight text-foreground tracking-tight">{config.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{config.body}</p>
        <Link
          href={config.href}
          className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {config.button}
        </Link>
      </aside>
    )
  }

  const config = blogCtaConfig.primary
  return (
    <aside className="my-10 rounded-2xl bg-primary p-7 text-primary-foreground shadow-xl">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">{config.eyebrow}</p>
      <h3 className="mt-3 font-serif text-2xl font-bold leading-tight tracking-tight">{config.title}</h3>
      <p className="mt-3 text-sm leading-6 text-primary-foreground/80">{config.body}</p>
      <BlogCtaButton label={config.button} source="Blog Primary CTA" className="mt-6" />
    </aside>
  )
}

export function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-10 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-primary text-primary-foreground">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.join('-')} className={rowIndex % 2 === 0 ? 'bg-card' : 'bg-muted/50'}>
              {row.map((cell) => (
                <td key={cell} className="border-t border-border px-4 py-3 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Stats({ items }: { items: Array<{ value: string; label: string }> }) {
  return (
    <div className="my-10 grid gap-4 rounded-2xl bg-muted/50 p-5 sm:grid-cols-3">
      {items.map((item) => (
        <div key={`${item.value}-${item.label}`} className="rounded-xl bg-card p-5 text-center border border-border">
          <p className="font-serif text-3xl font-bold text-primary tracking-tight">{item.value}</p>
          <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

export function CaseStudy({
  industry,
  metric,
  metricLabel,
  quote,
  author,
  children,
}: {
  industry: string
  metric: string
  metricLabel?: string
  quote: string
  author: string
  children: React.ReactNode
}) {
  return (
    <aside className="my-10 rounded-2xl border-2 border-foreground/20 bg-card p-7 shadow-lg">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">{industry}</p>
      <div className="mt-5 grid gap-6 md:grid-cols-[160px_1fr]">
        <div>
          <p className="font-serif text-5xl font-bold text-primary tracking-tight">{metric}</p>
          {metricLabel && <p className="mt-2 text-sm text-muted-foreground">{metricLabel}</p>}
        </div>
        <div>
          <div className="text-base leading-7 text-muted-foreground">{children}</div>
          <blockquote className="mt-5 border-l-4 border-secondary pl-4 italic text-foreground/90">
            "{quote}"
            <footer className="mt-2 text-sm not-italic text-muted-foreground">{author}</footer>
          </blockquote>
        </div>
      </div>
    </aside>
  )
}

export function getMdxComponents() {
  return {
    KeyTakeaways,
    Callout,
    CTA,
    ComparisonTable,
    Stats,
    CaseStudy,
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a {...props} className="font-semibold text-primary underline underline-offset-4 hover:text-secondary" />
    ),
    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
      <div className="my-8 overflow-x-auto rounded-2xl border border-border">
        <table {...props} className="w-full border-collapse text-left text-sm" />
      </div>
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
      <th {...props} className="bg-primary px-4 py-3 font-semibold text-primary-foreground" />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
      <td {...props} className="border-t border-border px-4 py-3 text-muted-foreground" />
    ),
  }
}
