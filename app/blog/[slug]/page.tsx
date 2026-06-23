import { getPostBySlug, getAllSlugs } from '@/utils/blog'
import { MarkdownContent } from '@/components/markdown-content'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { formatDate } from '@/lib/utils'
import { TableOfContents } from '@/components/toc'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const param = await params; // Ensure params is awaited
  const post = await getPostBySlug(param.slug); // Add await here
  
  if (!post) {
    return {
      title: 'Post Not Found | Riddhiman Rana',
      description: 'The blog post you are looking for does not exist.',
    }
  }
  
  return {
    title: `${post.title} | Riddhiman Rana`,
    description: post.excerpt,
    keywords: post.tags,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs(); // Add await here

  // Ensure slugs is an array before mapping
  if (!Array.isArray(slugs)) {
    console.error("generateStaticParams: getAllSlugs did not return an array", slugs);
    return []; // Return empty array or handle error appropriately
  }

  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = await params
  const post = await getPostBySlug(slug.slug)

  if (!post) {
    notFound()
  }
  
  const formattedDate = formatDate(post.date)
  
  return (
    <div className="min-h-screen overflow-x-clip">
      <main className="site-shell py-12 sm:py-16">
        <div className="mx-auto mb-10 max-w-5xl">
          <Button variant="ghost" asChild className="-ml-4">
            <Link href="/blog">
              <ArrowLeft data-icon="inline-start" />
              All writing
            </Link>
          </Button>
        </div>
        
        <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[1fr_180px] lg:gap-10">
          <div className="min-w-0">
            <header className="mb-12">
              <div className="mb-5 flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="max-w-4xl text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">
                {post.title}
              </h1>
              
              <p className="mt-5 text-sm text-muted-foreground">
                {formattedDate}
              </p>
            </header>
            
            <article>
              <Separator className="mb-10" />
              <div className="max-w-3xl">
                <MarkdownContent content={post.content} />
              </div>
              
              <div className="mt-12 border-t border-border pt-6">
                <Button variant="outline" asChild>
                  <Link href="/blog">
                    <ArrowLeft data-icon="inline-start" />
                    Back to blog
                  </Link>
                </Button>
              </div>
            </article>
          </div>
          
          <aside className="hidden lg:block min-w-0 lg:self-stretch">
            <div className="sticky top-24">
              <TableOfContents content={post.content} />
            </div>
          </aside>
        </div>
      </main>
      
      <div className="lg:hidden">
        <TableOfContents content={post.content} />
      </div>
    </div>
  )

}
