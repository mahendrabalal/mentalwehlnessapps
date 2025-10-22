type UnknownFn = (...args: unknown[]) => unknown

declare global {
  interface Window {
    gtag?: UnknownFn
  }
}

declare module '@jest/globals' {
  export const describe: UnknownFn
  export const it: UnknownFn
  export const expect: UnknownFn
  export const beforeEach: UnknownFn
  export const jest: Record<string, UnknownFn> & {
    fn: UnknownFn
    spyOn: UnknownFn
    clearAllMocks: UnknownFn
  }
}

declare module '@testing-library/react' {
  export const renderHook: UnknownFn
  export const act: UnknownFn
}

export {}
