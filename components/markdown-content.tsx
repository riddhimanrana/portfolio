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
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeKatex from 'rehype-katex'
import Image from 'next/image'
import Link from 'next/link'
import { Copy, CheckCheck, FileCode } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  const { theme } = useTheme()
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)

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
      prose-headings:font-bold
      prose-h1:text-3xl prose-h1:mb-6
      prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
      prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
      prose-h4:text-lg prose-h4:mt-5 prose-h4:mb-2
      prose-p:my-4 prose-p:leading-relaxed
      prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
      prose-img:rounded-lg prose-img:shadow-sm prose-img:my-6 prose-img:mx-auto prose-img:clear-both
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800/60 prose-blockquote:pl-4 prose-blockquote:pr-4 prose-blockquote:py-2 prose-blockquote:italic
      prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
      prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-700
      prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-3
      prose-td:p-3 prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700
      prose-hr:my-8
      prose-pre:p-0 prose-pre:my-6 prose-pre:bg-transparent"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeSlug,
          rehypeCodeTitles,
          rehypeKatex
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
            
            return !isInline && match ? (
              <div className="relative overflow-hidden rounded-md my-4">
                <div className="absolute right-2 top-2 z-10">
                  <button
                    onClick={() => handleCopyCode(String(children).replace(/\n$/, ''))}
                    className="p-1.5 rounded bg-gray-600/40 hover:bg-gray-600/60 text-gray-800 dark:text-gray-300 hover:text-white transition-colors mt-8"
                    aria-label="Copy code"
                  >
                    {copiedCode === String(children).replace(/\n$/, '') ? (
                      <CheckCheck className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
                <div className="flex items-center bg-gray-200 dark:bg-gray-950 px-3 py-2 text-xs text-gray-800 dark:text-gray-300">
                  <FileCode className="h-3.5 w-3.5 mr-1.5" />
                  <span>{match[1]}</span>
                </div>
                <SyntaxHighlighter
                  style={theme === 'dark' ? vscDarkPlus : oneLight}
                  language={match[1]}
                  PreTag="div"
                  className="!mt-0 !mb-0 text-sm"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
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