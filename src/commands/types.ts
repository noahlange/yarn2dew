declare module '../types' {
  interface State {
    position: Record<string, { x: number; y: number; d: number }>;
    positionOffset: Record<string, { x: number; y: number }>;
    viewport: { x: number; y: number };
  }
}

export {};
