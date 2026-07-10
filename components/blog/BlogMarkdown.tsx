import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {
  Callout,
  CaseStudy,
  ComparisonTable,
  CTA,
  getMdxComponents,
  KeyTakeaways,
  Stats,
} from '@/components/blog/mdx-components'

const blockPattern =
  /<KeyTakeaways[\s\S]*?\/>|<Callout[\s\S]*?<\/Callout>|<CTA[\s\S]*?\/>|<ComparisonTable[\s\S]*?\/>|<Stats[\s\S]*?\/>|<CaseStudy[\s\S]*?<\/CaseStudy>/g

function parseLiteral<T>(literal: string | undefined, fallback: T): T {
  if (!literal) return fallback
  try {
    return Function(`"use strict"; return (${literal})`)() as T
  } catch {
    return fallback
  }
}

function getProp(source: string, prop: string) {
  // Lazy match, but only accept a closing brace that is followed by the next
  // prop or the end of the tag — object literals inside the prop value
  // (e.g. Stats items) contain earlier `}` characters that must not end it.
  const match = source.match(
    new RegExp(`${prop}=\\{([\\s\\S]*?)\\}(?=\\s*(?:[a-zA-Z_$][\\w$]*=|\\/?>))`),
  )
  return match?.[1]
}

function getStringProp(source: string, prop: string) {
  const match = source.match(new RegExp(`${prop}="([^"]*)"`))
  return match?.[1] ?? ''
}

function renderMarkdown(source: string, key: string) {
  if (!source.trim()) return null
  const components = getMdxComponents()

  return (
    <ReactMarkdown
      key={key}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={components as never}
    >
      {source}
    </ReactMarkdown>
  )
}

function renderBlock(source: string, key: string) {
  if (source.startsWith('<KeyTakeaways')) {
    return <KeyTakeaways key={key} items={parseLiteral<string[]>(getProp(source, 'items'), [])} />
  }

  if (source.startsWith('<Callout')) {
    const type = getStringProp(source, 'type') as 'info' | 'warning' | 'tip'
    const body = source.replace(/^<Callout[^>]*>/, '').replace(/<\/Callout>$/, '').trim()
    return (
      <Callout key={key} type={type || 'info'}>
        {renderMarkdown(body, `${key}-body`)}
      </Callout>
    )
  }

  if (source.startsWith('<CTA')) {
    return <CTA key={key} slot={(getStringProp(source, 'slot') || 'primary') as 'primary' | 'secondary' | 'inline-form'} />
  }

  if (source.startsWith('<ComparisonTable')) {
    return (
      <ComparisonTable
        key={key}
        headers={parseLiteral<string[]>(getProp(source, 'headers'), [])}
        rows={parseLiteral<string[][]>(getProp(source, 'rows'), [])}
      />
    )
  }

  if (source.startsWith('<Stats')) {
    return (
      <Stats
        key={key}
        items={parseLiteral<Array<{ value: string; label: string }>>(getProp(source, 'items'), [])}
      />
    )
  }

  if (source.startsWith('<CaseStudy')) {
    const body = source.replace(/^<CaseStudy[\s\S]*?>/, '').replace(/<\/CaseStudy>$/, '').trim()
    return (
      <CaseStudy
        key={key}
        industry={getStringProp(source, 'industry')}
        metric={getStringProp(source, 'metric')}
        metricLabel={getStringProp(source, 'metricLabel')}
        quote={getStringProp(source, 'quote')}
        author={getStringProp(source, 'author')}
      >
        {renderMarkdown(body, `${key}-body`)}
      </CaseStudy>
    )
  }

  return renderMarkdown(source, key)
}

export function BlogMarkdown({ source }: { source: string }) {
  const parts: Array<{ type: 'markdown' | 'block'; value: string }> = []
  let lastIndex = 0

  for (const match of source.matchAll(blockPattern)) {
    if (match.index === undefined) continue
    parts.push({ type: 'markdown', value: source.slice(lastIndex, match.index) })
    parts.push({ type: 'block', value: match[0] })
    lastIndex = match.index + match[0].length
  }

  parts.push({ type: 'markdown', value: source.slice(lastIndex) })

  return (
    <>
      {parts.map((part, index) =>
        part.type === 'block'
          ? renderBlock(part.value, `blog-block-${index}`)
          : renderMarkdown(part.value, `blog-md-${index}`),
      )}
    </>
  )
}
