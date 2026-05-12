"use client";

import { useSyncExternalStore } from "react";

// Returns `false` during server render and the first paint of hydration,
// `true` on subsequent client renders. Avoids the setState-in-effect lint
// while keeping Recharts off the SSR pass.
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function useIsClient(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
