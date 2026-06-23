import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground animate-pulse">
      <main className="site-shell py-12 sm:py-16">
        <header className="mb-8">
          <div className="h-10 w-44 bg-muted rounded-md"></div>
        </header>

        <div className="border-t border-border">
          {[1, 2, 3, 4].map((i, index) => (
            <div key={i}>
              {index > 0 && <Separator />}
              <div className="grid gap-5 py-7 sm:grid-cols-[4rem_1fr_auto] sm:items-center -mx-4 px-4">
                {/* Logo Tile */}
                <div className="size-16 rounded-xl bg-muted/60 border border-border"></div>
                
                {/* Middle details */}
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <div className="h-6 w-48 bg-muted rounded"></div>
                    <div className="h-4 w-10 bg-muted/60 rounded"></div>
                  </div>
                  <div className="h-4 w-full max-w-xl bg-muted/40 rounded mt-3"></div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[1, 2, 3].map((tagIdx) => (
                      <div key={tagIdx} className="h-5.5 w-14 bg-muted/40 rounded"></div>
                    ))}
                  </div>
                </div>

                {/* Right side links */}
                <div className="flex items-center gap-1.5 sm:justify-end">
                  <div className="size-9 rounded-full bg-muted/60"></div>
                  <div className="size-9 rounded-full bg-muted/60"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
