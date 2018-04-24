interface Animation {
  export (): object

  step (options?: {
    duration?: number,
    timingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'step-start' | 'step-end',
    delay?: number,
    transformOrigin?: string
  }): void

  opacity (value: number): Animation

  backgroundColor (color: string): Animation

  width (length: number | string): Animation

  height (length: number | string): Animation

  top (length: number | string): Animation

  left (length: number | string): Animation

  bottom (length: number | string): Animation

  right (length: number | string): Animation

  rotate (deg: number): Animation

  rotateX (deg: number): Animation

  rotateY (deg: number): Animation

  rotateZ (deg: number): Animation

  rotate3d (x: number, y: number, z: number, deg: number): Animation

  scale (sx: number, sy?: number): Animation

  scaleX (sx: number): Animation

  scaleY (sy: number): Animation

  scaleZ (sz: number): Animation

  scale3d (sx: number, sy: number, sz: number): Animation

  translate (tx: number, ty?: number): Animation

  translateX (tx: number): Animation

  translateY (ty: number): Animation

  translateZ (tz: number): Animation

  translate3d (tx: number, ty: number, tz: number): Animation

  skew (ax: number, ay?: number): Animation

  skewX (ax: number): Animation

  skewY (ay: number): Animation

  matrix (a: number, b: number, c: number, d: number, tx: number, ty: number): Animation

  matrix3d (...args: number[]): Animation
}

declare function getCurrentPages (): ({ route: string })[]

export module wx {
  export function createAnimation (options?: {
    duration?: number,
    timingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'step-start' | 'step-end',
    delay?: number,
    transformOrigin?: string
  }): Animation

  export function request (obj: {
    url: string,
    data?: object | string | ArrayBuffer,
    header?: object,
    method?: string,
    dataType?: string,
    responseType?: string,
    success?: (data: object | string | ArrayBuffer, statusCode: number, header: object) => void,
    fail?: () => void,
    complete?: () => void,
  }): void

  export function setStorageSync (key: string, data: object | string): void

  export function getStorageSync (key: string): string

  export function navigateTo (options: { url: string, success?: Function, fail?: Function, complete?: Function }): void

  export function redirectTo (options: { url: string, success?: Function, fail?: Function, complete?: Function }): void

  export function navigateBack (delta?: number): void

  export function reLaunch (options: { url: string, success?: Function, fail?: Function, complete?: Function }): void

  export function showToast (options: {
    title: string, icon?: 'success' | 'loading' | 'none',
    image?: string, duration?: number, mask?: boolean,
    success?: Function, fail?: Function, complete?: Function
  }): void
}
