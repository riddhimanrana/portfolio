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
  <div className="relative overflow-hidden rounded-md my-4 animate-pulse">
    <div className="flex items-center bg-gray-200 dark:bg-gray-950 px-3 py-2 text-xs">
      <div className="h-3.5 w-3.5 bg-gray-300 dark:bg-gray-700 rounded mr-1.5"></div>
      <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
    <div className="bg-gray-100 dark:bg-gray-900 p-4">
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
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
      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-800
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
      prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2
      prose-p:my-5 prose-p:leading-7 prose-p:text-gray-700 dark:prose-p:text-gray-300
      prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline prose-a:font-medium hover:prose-a:underline
      prose-img:rounded-xl prose-img:shadow-md prose-img:my-8 prose-img:mx-auto prose-img:clear-both
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/10 prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-3 prose-blockquote:italic prose-blockquote:rounded-r-lg
      prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
      prose-table:border prose-table:border-gray-200 dark:prose-table:border-gray-800 prose-table:rounded-lg prose-table:overflow-hidden
      prose-th:bg-gray-50 dark:prose-th:bg-gray-800/50 prose-th:p-3 prose-th:font-medium
      prose-td:p-3 prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-800
      prose-hr:my-10 prose-hr:border-gray-200 dark:prose-hr:border-gray-800
      prose-pre:p-0 prose-pre:my-6 prose-pre:bg-transparent
      prose-li:my-1 prose-li:leading-7
      prose-strong:font-semibold prose-strong:text-gray-900 dark:prose-strong:text-white"
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
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-500 hover:dark:text-blue-300 transition-colors transition-300 no-underline hover:no-underline"
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
              <div className="relative overflow-hidden rounded-lg my-6 border border-gray-200/80 dark:border-gray-800/80 shadow-sm">
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/80 px-4 py-2.5 text-xs text-gray-600 dark:text-gray-400 border-b border-gray-200/50 dark:border-gray-800/50">
                  <div className="flex items-center min-w-0 gap-2">
                    <FileCode className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
                    <span className="truncate font-medium">{codeTitle ? codeTitle : match[1]}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(codeString)}
                    className="p-1.5 rounded-md bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-300/50 dark:hover:bg-gray-700/50 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-200"
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
              <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm" {...props}>
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
            <blockquote className="border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-800/60 pl-6 pr-4 py-2 italic my-6" {...props} />
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