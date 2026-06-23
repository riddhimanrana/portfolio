export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="site-shell py-12 sm:py-16">
        {/* Header skeleton */}
        <header className="grid gap-8 border-b border-border/80 pb-9 sm:grid-cols-[1fr_auto] sm:items-end animate-pulse">
          <div>
            <div className="h-10 w-44 bg-muted rounded-md mb-2"></div>
            <div className="h-4 w-64 bg-muted/60 rounded"></div>
          </div>
          <div className="grid grid-cols-3 gap-8 w-48">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="h-7 w-8 bg-muted rounded"></div>
                <div className="h-3 w-12 bg-muted/60 rounded mt-1"></div>
              </div>
            ))}
          </div>
        </header>

        {/* Filter controls skeleton */}
        <section className="py-7 animate-pulse">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="h-11 rounded-xl bg-card/70 border border-border/50 flex-1"></div>
            <div className="h-9 w-64 bg-card/70 border border-border/50 rounded-full"></div>
          </div>
        </section>

        {/* Content columns skeleton */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] mt-4 animate-pulse">
          {/* Left Timeline column */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute bottom-4 left-[0.45rem] top-4 w-px bg-border sm:left-[6.45rem]" />

            <div className="flex flex-col gap-12">
              {[2026, 2025].map((year) => (
                <section key={year}>
                  {/* Year header */}
                  <div className="mb-4 grid grid-cols-[1rem_1fr] items-center gap-4 sm:grid-cols-[6rem_1rem_1fr]">
                    <div className="hidden sm:block">
                      <div className="h-7 w-12 bg-muted rounded"></div>
                      <div className="h-3 w-16 bg-muted/60 rounded mt-1.5"></div>
                    </div>
                    <span className="relative z-10 h-px w-4 rounded-full bg-border" />
                    <div className="sm:hidden">
                      <div className="h-7 w-12 bg-muted rounded"></div>
                    </div>
                  </div>

                  {/* Year rows */}
                  <div className="ml-8 border-y border-border sm:ml-[7.5rem] divide-y divide-border">
                    {[1, 2].map((idx) => (
                      <div key={idx} className="grid grid-cols-[1fr_auto] items-center gap-5 px-4 py-5">
                        <div className="grid grid-cols-[3.25rem_1fr] items-center gap-4">
                          <div className="size-[3.25rem] rounded-xl bg-muted/60"></div>
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="h-5 w-40 bg-muted rounded"></div>
                              <div className="h-5 w-16 bg-muted/60 rounded-full"></div>
                            </div>
                            <div className="h-4 w-60 bg-muted/40 rounded mt-2"></div>
                          </div>
                        </div>
                        <div className="h-4 w-12 bg-muted/40 rounded"></div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Right Inspector Column */}
          <aside className="hidden lg:block">
            <div className="border border-border/80 bg-card/40 rounded-2xl p-6 h-[26rem]">
              <div className="flex items-start justify-between gap-5">
                <div className="size-16 rounded-2xl bg-muted/60"></div>
                <div className="h-6 w-20 bg-muted/40 rounded-full"></div>
              </div>
              <div className="h-8 w-48 bg-muted rounded mt-6"></div>
              <div className="h-4 w-28 bg-muted/60 rounded mt-2"></div>
              <div className="h-4 w-full bg-muted/40 rounded mt-8"></div>
              <div className="h-4 w-full bg-muted/40 rounded mt-2"></div>
              <div className="h-4 w-3/4 bg-muted/40 rounded mt-2"></div>
              <div className="border-t border-border mt-8 pt-6 flex flex-col gap-2">
                <div className="h-9 w-full bg-muted/60 rounded"></div>
                <div className="h-9 w-full bg-muted/40 rounded"></div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
