import { Separator } from "@/components/ui/separator";

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground animate-pulse">
      <main className="site-shell py-12 sm:py-16">
        <header className="mb-8">
          <div className="h-10 w-32 bg-muted rounded-md"></div>
        </header>

        <div className="border-t border-border">
          {[1, 2, 3].map((i, index) => (
            <div key={i}>
              {index > 0 && <Separator />}
              <div className="grid gap-4 py-7 sm:grid-cols-[8rem_1fr_auto] sm:items-start">
                {/* Left col: date/time */}
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-muted/60 rounded"></div>
                  <div className="h-4 w-16 bg-muted/40 rounded"></div>
                </div>

                {/* Middle col: title/excerpt */}
                <div>
                  <div className="h-7 w-3/4 max-w-lg bg-muted rounded"></div>
                  <div className="h-4 w-full max-w-2xl bg-muted/40 rounded mt-3"></div>
                  <div className="h-4 w-5/6 max-w-2xl bg-muted/40 rounded mt-1.5"></div>
                </div>

                {/* Right col: arrow icon */}
                <div className="size-4 bg-muted/60 rounded mt-1.5"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
