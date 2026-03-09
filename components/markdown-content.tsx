'use client'

import 'katex/dist/katex.min.css'
import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from 'next-themes'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import Image from 'next/image'
import Link from 'next/link'
import { Copy, CheckCheck, FileCode } from 'lucide-react'
 

interface MarkdownContentProps {
  content: string
}

// Code block skeleton
const CodeSkeleton = () => (
  <div className="relative overflow-hidden rounded-sm my-4 animate-pulse">
    <div className="flex items-center bg-muted px-3 py-2 text-xs">
      <div className="h-3.5 w-3.5 bg-muted-foreground/30 rounded-sm mr-1.5"></div>
      <div className="h-3 w-16 bg-muted-foreground/30 rounded-sm"></div>
    </div>
    <div className="bg-muted/50 p-4">
      <div className="space-y-2">
        <div className="h-4 bg-muted-foreground/20 rounded-sm w-3/4"></div>
        <div className="h-4 bg-muted-foreground/20 rounded-sm w-full"></div>
        <div className="h-4 bg-muted-foreground/20 rounded-sm w-1/2"></div>
      </div>
    </div>
  </div>
);

export function MarkdownContent({ content }: MarkdownContentProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle code copy
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <div className="prose dark:prose-invert max-w-none 
      prose-headings:font-semibold prose-headings:tracking-tight
      prose-h1:text-3xl prose-h1:mb-6
      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
      prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2
      prose-p:my-5 prose-p:leading-7
      prose-a:text-foreground prose-a:no-underline prose-a:font-medium hover:prose-a:underline
      prose-img:rounded-sm prose-img:shadow-md prose-img:my-8 prose-img:mx-auto prose-img:clear-both
      prose-blockquote:border-l-4 prose-blockquote:border-foreground/40 prose-blockquote:bg-muted/40 prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-3 prose-blockquote:italic prose-blockquote:rounded-r-sm
      prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
      prose-table:border prose-table:border-border prose-table:rounded-sm prose-table:overflow-hidden
      prose-th:bg-muted prose-th:p-3 prose-th:font-medium
      prose-td:p-3 prose-td:border prose-td:border-border
      prose-hr:my-10 prose-hr:border-border
      prose-pre:p-0 prose-pre:my-6 prose-pre:bg-transparent
      prose-li:my-1 prose-li:leading-7
      prose-strong:font-semibold"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeSlug,
          rehypeKatex,
          [rehypeAutolinkHeadings, { behavior: 'append' }]
        ]}
        components={{
          a: ({ node, ...props }) => {
            const href = String(props.href);
            if (href.startsWith("http")) {
              return (
                <Link
                  {...props}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors no-underline hover:no-underline"
                >
                  {props.children}
                </Link>
              );
            }
            return <Link {...props} href={href} />;
          },
          code({ node, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            const isDark = resolvedTheme === 'dark'
            const codeString = String(children).replace(/\n$/, '')
            const lines = codeString.split('\n')

            // Check if this is a diff-style code block (has lines starting with + or -)
            const isDiff = match?.[1] === 'diff' || lines.some(line => /^[+-]/.test(line))

            // Parse meta for optional title and line highlighting: ```ts {1,3-5} title=server.ts
            const metaString: string | undefined = node?.data?.meta || (props as any)?.metastring
            const titleMatch = metaString?.match(/title=("([^"]+)"|'([^']+)'|([^\s]+))/)
            const codeTitle = titleMatch ? (titleMatch[2] || titleMatch[3] || titleMatch[4]) : undefined
            const highlightRE = /{([\d,-]+)}/
            const highlightMatch = metaString?.match(highlightRE)

            const makeHighlights = (str?: string) => {
              const result = new Set<number>()
              if (!str) return result
              str.split(',').forEach((part) => {
                if (part.includes('-')) {
                  const [start, end] = part.split('-').map((n) => parseInt(n.trim(), 10))
                  if (!isNaN(start) && !isNaN(end)) {
                    for (let i = start; i <= end; i++) result.add(i)
                  }
                } else {
                  const n = parseInt(part.trim(), 10)
                  if (!isNaN(n)) result.add(n)
                }
              })
              return result
            }
            const highlights = makeHighlights(highlightMatch?.[1])

            // Get line style based on diff prefix and highlights
            const getLineStyle = (lineNumber: number) => {
              const line = lines[lineNumber - 1] || ''
              const isHighlighted = highlights.has(lineNumber)
              
              // Diff-style highlighting
              if (isDiff) {
                if (line.startsWith('+')) {
                  return {
                    display: 'block',
                    background: isDark ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.12)',
                    borderLeft: '3px solid rgb(34, 197, 94)',
                    paddingLeft: '12px',
                    marginLeft: '-3px'
                  }
                }
                if (line.startsWith('-')) {
                  return {
                    display: 'block',
                    background: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.12)',
                    borderLeft: '3px solid rgb(239, 68, 68)',
                    paddingLeft: '12px',
                    marginLeft: '-3px'
                  }
                }
              }
              
              // Regular highlighting
              if (isHighlighted) {
                return {
                  display: 'block',
                  background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(59,130,246,0.08)',
                  borderLeft: '3px solid rgb(59,130,246)',
                  paddingLeft: '12px',
                  marginLeft: '-3px'
                }
              }
              
              return { display: 'block' }
            }
            
            return !isInline && match ? (
              <div className="relative overflow-hidden rounded-sm my-6 border border-border shadow-sm">
                <div className="flex items-center justify-between bg-muted px-4 py-2.5 text-xs text-muted-foreground border-b border-border">
                  <div className="flex items-center min-w-0 gap-2">
                    <FileCode className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate font-medium">{codeTitle ? codeTitle : match[1]}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(codeString)}
                    className="p-1.5 rounded-sm bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
                    aria-label="Copy code"
                  >
                    {copiedCode === codeString ? (
                      <CheckCheck className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {!mounted ? (
                  <CodeSkeleton />
                ) : (
                  <SyntaxHighlighter
                    style={isDark ? vscDarkPlus : oneLight}
                    language={match[1] === 'diff' ? 'plaintext' : match[1]}
                    PreTag="div"
                    className="!mt-0 !mb-0 text-sm !rounded-b-md"
                    wrapLines
                    lineProps={(lineNumber: number) => ({
                      style: getLineStyle(lineNumber)
                    })}
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                )}
              </div>
            ) : (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          },
          img: ({ alt, src, ...props }: any) => {
            const imgSrc = String(src)
            let actualAlt = alt ? String(alt) : ''
            let isSmall = false
            const smallImageWidth = 400

            if (actualAlt.startsWith('small|')) {
              isSmall = true
              actualAlt = actualAlt.substring('small|'.length)
            }

            // internal small
            if (isSmall && imgSrc && !imgSrc.startsWith('http')) {
              return (
                <Image
                  src={imgSrc}
                  alt={actualAlt}
                  width={smallImageWidth}
                  height={225}
                  className="not-prose clear-both my-4 mx-auto rounded-lg shadow-sm"
                  quality={75}
                  sizes="400px"
                  loading="lazy"
                  {...props}
                />
              )
            }

            // external small
            if (isSmall) {
              return (
                <img
                  src={imgSrc}
                  alt={actualAlt}
                  className="not-prose block mx-auto my-4 rounded-lg shadow-sm clear-both"
                  style={{ width: `${smallImageWidth}px`, height: 'auto' }}
                  loading="lazy"
                  {...props}
                />
              )
            }

            // internal default
            if (imgSrc && !imgSrc.startsWith('http')) {
              return (
                <Image
                  src={imgSrc}
                  alt={actualAlt}
                  width={800}
                  height={450}
                  className="clear-both mx-auto my-6 rounded-lg shadow-sm"
                  quality={75}
                  sizes="(max-width: 640px) 100vw, 800px"
                  loading="lazy"
                  {...props}
                />
              )
            }

            // external default
            return (
              <img
                src={imgSrc}
                alt={actualAlt}
                className="clear-both mx-auto my-6"
                loading="lazy"
                {...props}
              />
            )
          },
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-border bg-muted/50 pl-6 pr-4 py-2 italic my-6" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-10 border-gray-300 dark:border-gray-700" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}