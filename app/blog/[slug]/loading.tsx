import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground animate-pulse">
      <main className="site-shell py-12 sm:py-16">
        <div className="mx-auto mb-10 max-w-5xl">
          <div className="h-9 w-24 bg-muted/60 rounded"></div>
        </div>

        <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[1fr_180px] lg:gap-10">
          {/* Main article content column */}
          <div>
            <header className="mb-12">
              <div className="mb-5 flex flex-wrap gap-2">
                <div className="h-5.5 w-14 bg-muted/40 rounded"></div>
                <div className="h-5.5 w-16 bg-muted/40 rounded"></div>
              </div>
              <div className="h-10 w-5/6 max-w-3xl bg-muted rounded"></div>
              <div className="h-4 w-28 bg-muted/60 rounded mt-5"></div>
            </header>

            <Separator className="mb-10" />

            <div className="max-w-3xl space-y-6">
              {/* Paragraphs simulation */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted/40 rounded"></div>
                <div className="h-4 w-full bg-muted/40 rounded"></div>
                <div className="h-4 w-5/6 bg-muted/40 rounded"></div>
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full bg-muted/40 rounded"></div>
                <div className="h-4 w-11/12 bg-muted/40 rounded"></div>
                <div className="h-4 w-full bg-muted/40 rounded"></div>
                <div className="h-4 w-2/3 bg-muted/40 rounded"></div>
              </div>

              {/* Code block skeleton */}
              <div className="h-32 w-full bg-muted/20 border border-border/80 rounded-xl"></div>

              <div className="space-y-2">
                <div className="h-4 w-full bg-muted/40 rounded"></div>
                <div className="h-4 w-3/4 bg-muted/40 rounded"></div>
              </div>
            </div>

            <div className="mt-12 border-t border-border pt-6">
              <div className="h-9 w-32 bg-muted/60 rounded"></div>
            </div>
          </div>

          {/* Right column: Table of Contents skeleton */}
          <div className="hidden lg:block">
            <div className="h-5 w-32 bg-muted rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-3.5 w-full bg-muted/40 rounded"></div>
              <div className="h-3.5 w-11/12 bg-muted/40 rounded"></div>
              <div className="h-3.5 w-full bg-muted/40 rounded pl-2"></div>
              <div className="h-3.5 w-10/12 bg-muted/40 rounded pl-2"></div>
              <div className="h-3.5 w-full bg-muted/40 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
