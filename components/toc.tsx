'use client';

import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { List, ChevronDown } from 'lucide-react';

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface GroupedHeading {
  heading: Heading;
  children: Heading[];
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  
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

  // Group h3s under their parent h2s
  const groupedHeadings = useMemo(() => {
    const groups: GroupedHeading[] = [];
    let currentGroup: GroupedHeading | null = null;

    headings.forEach((heading) => {
      if (heading.level === 2) {
        currentGroup = { heading, children: [] };
        groups.push(currentGroup);
      } else if (heading.level === 3 && currentGroup) {
        currentGroup.children.push(heading);
      }
    });

    return groups;
  }, [headings]);

  // Find active parent h2 for a given heading
  const activeParentId = useMemo(() => {
    if (!activeId) return null;
    
    for (const group of groupedHeadings) {
      if (group.heading.id === activeId) return group.heading.id;
      if (group.children.some(child => child.id === activeId)) {
        return group.heading.id;
      }
    }
    return null;
  }, [activeId, groupedHeadings]);
  
  // Track active heading on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId((prev) => (prev === entry.target.id ? prev : entry.target.id));
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

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: "smooth"
      });
      setMobileOpen(false);
    }
  };
  
  if (groupedHeadings.length < 2) return null;

  const TocContent = () => (
    <nav>
      <ul className="space-y-1">
        {groupedHeadings.map((group) => {
          const isActive = activeParentId === group.heading.id;
          const isDirectlyActive = activeId === group.heading.id;
          
          return (
            <li key={group.heading.id}>
              <a
                href={`#${group.heading.id}`}
                className={cn(
                  "block py-1.5 text-sm border-l-2 -ml-px pl-4 transition-all duration-200 truncate",
                  isDirectlyActive
                    ? "border-foreground text-foreground font-medium"
                    : isActive
                    ? "border-border text-foreground/80"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(group.heading.id);
                }}
              >
                {group.heading.text}
              </a>
              
              {/* Keep children mounted; animate expand/collapse for smoothness */}
              {group.children.length > 0 && (
                <ul
                  className={cn(
                    "overflow-hidden transition-[max-height,opacity] duration-200 ease-out",
                    isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  )}
                >
                  {group.children.map((child) => (
                    <li key={child.id}>
                      <a
                        href={`#${child.id}`}
                        className={cn(
                          "block py-1 text-xs border-l-2 -ml-px pl-6 transition-all duration-200 truncate",
                          activeId === child.id
                            ? "border-foreground text-foreground font-medium"
                            : "border-transparent text-muted-foreground hover:text-foreground/80"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToHeading(child.id);
                        }}
                      >
                        {child.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
  
  return (
    <>
      {/* Desktop TOC */}
      <div className="hidden lg:block w-full max-w-[200px]">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          On this page
        </div>
        <div className="border-l border-border">
          <TocContent />
        </div>
      </div>

      {/* Mobile TOC */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-sm shadow-lg transition-all duration-200",
            mobileOpen 
              ? "bg-foreground text-background" 
              : "bg-card text-foreground border border-border"
          )}
        >
          <List className="h-4 w-4" />
          <span className="text-sm font-medium">Contents</span>
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform duration-200",
            mobileOpen && "rotate-180"
          )} />
        </button>

        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 dark:bg-black/40 -z-10"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Mobile menu */}
            <div className="absolute bottom-full right-0 mb-2 w-72 max-h-[60vh] overflow-y-auto bg-card rounded-sm shadow-xl border border-border p-4">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                On this page
              </div>
              <div className="border-l border-border">
                <TocContent />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
