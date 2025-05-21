'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { List, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();
  
  // Extract headings from content
  useEffect(() => {
    const extractedHeadings: Heading[] = [];
    const regex = /^(#{1,3})\s+(.+?)(?:\s*\{#([a-zA-Z0-9-_]+)\})?$/gm;
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const explicitId = match[3];
      
      // Generate an ID if not explicitly provided
      const id = explicitId || text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
        
      extractedHeadings.push({ id, text, level });
    }
    
    setHeadings(extractedHeadings);
  }, [content]);
  
  // Track active heading on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );
    
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);
  
  if (headings.length < 2) return null;
  
  return (
    <div className={cn(
      "sticky top-24 w-full lg:w-64 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-all",
      collapsed ? "h-14" : "max-h-[70vh]"
    )}>
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-2 font-medium">
          <List className="h-5 w-5" />
          <span>Table of Contents</span>
        </div>
        {collapsed ? (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        )}
      </div>
      
      {!collapsed && (
        <div className="p-4 overflow-y-auto max-h-[calc(70vh-60px)]">
          <nav>
            <ul className="space-y-1">
              {headings.map((heading) => (
                <li 
                  key={heading.id}
                  style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}
                >
                  <a
                    href={`#${heading.id}`}
                    className={cn(
                      "block py-1 px-2 text-sm rounded transition-colors",
                      activeId === heading.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(heading.id);
                      if (element) {
                        window.scrollTo({
                          top: element.getBoundingClientRect().top + window.pageYOffset - 80,
                          behavior: "smooth"
                        });
                      }
                    }}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
