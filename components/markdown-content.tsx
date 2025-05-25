'use client'

import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from 'next-themes'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import Image from 'next/image'
import 'katex/dist/katex.min.css'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Copy, CheckCheck, ExternalLink, LinkIcon, FileCode } from 'lucide-react'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const { theme } = useTheme()
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

  if (!mounted) return null

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
          img: ({ node, alt, src, ...props }: any) => {
            const imgSrc = String(src);
            let actualAlt = alt ? String(alt) : '';
            let isSmall = false;
            const smallImageWidth = 400; // Width for "small" images

            if (actualAlt.startsWith('small|')) {
              isSmall = true;
              actualAlt = actualAlt.substring('small|'.length);
            }

            if (isSmall) {
              // Small image styling: centered, specific width, consistent styling but opted out of prose for size control
              if (imgSrc && !imgSrc.startsWith('http')) {
                // Internal Next/Image - small
                return (
                  <div className="not-prose clear-both my-4 flex justify-center"> {/* Centering container with custom margin */}
                    <Image
                      src={imgSrc}
                      alt={actualAlt}
                      width={smallImageWidth}
                      height={Math.round(smallImageWidth / (16/9))} // Assuming 16:9 aspect ratio for placeholder height
                      className="rounded-lg shadow-sm" // Apply consistent styling
                      style={{ width: `${smallImageWidth}px`, height: 'auto' }} // Ensure width and auto height
                    />
                  </div>
                );
              }
              // External image using <img> tag - small
              return (
                <img 
                  src={imgSrc} 
                  alt={actualAlt} 
                  className="not-prose block mx-auto my-4 rounded-lg shadow-sm clear-both" // Centered, custom margin, styled
                  style={{ width: `${smallImageWidth}px`, height: 'auto' }}
                  {...props}
                />
              );
            }
            
            // Default image handling (non-small)
            // Relies on prose-img:* styles from the parent .prose scope (e.g., prose-img:mx-auto, prose-img:my-6)
            if (imgSrc && !imgSrc.startsWith('http')) {
              // Internal Next/Image - default size
              // The rendered <img> by Next/Image will be styled by prose-img utilities
              return (
                <Image
                    src={imgSrc}
                    alt={actualAlt}
                    width={800} // Default width for optimization
                    height={500} // Default height for optimization
                    className="clear-both" // Add clear-both; other styles from prose-img
                />
              );
            }
            
            // External image using <img> tag - default size
            // The <img> will be styled by prose-img utilities
            return (
              <img 
                src={imgSrc} 
                alt={actualAlt} 
                className="clear-both" // Add clear-both; other styles from prose-img
                {...props}
              />
            );
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
