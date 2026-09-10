import { useEffect, useMemo, useSyncExternalStore } from "react";

import {
  createBrowserEnv,
  createLiquidGlass,
  type LiquidGlassController,
  type LiquidGlassState,
} from "@/lib/liquid-glass";

// One controller per page load, shared by every subscriber (the navbar is
// the only one today). Created lazily in the browser; SSR sees a stable
// idle snapshot so hydration matches the server markup.
let controller: LiquidGlassController | undefined;
function getController() {
  controller ??= createLiquidGlass(createBrowserEnv());
  return controller;
}

const SERVER_STATE: LiquidGlassState = { enabled: true, status: "idle" };

export function useLiquidGlass({ waitForHero }: { waitForHero: boolean }) {
  const state = useSyncExternalStore(
    (listener) => getController().subscribe(listener),
    () => getController().getState(),
    () => SERVER_STATE
  );

  useEffect(() => {
    getController().init({ waitForHero });
    // The controller outlives React re-renders; it is only disposed with the page.
  }, [waitForHero]);

  return useMemo(
    () => ({
      ...state,
      setEnabled: (enabled: boolean) => getController().setEnabled(enabled),
      refresh: () => getController().refresh(),
      hide: () => getController().hide(),
    }),
    [state]
  );
}
