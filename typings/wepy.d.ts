declare module wepy {
  export interface app {
    $wxapp: object
    $pages: page[]
    $interceptors: object[]

    use (middleware: string | Function): void

    intercept (api: string, provider: {
      config?: (obj: object) => object,
      success?: (obj: object) => object,
      fail?: (obj: object) => object,
      complete?: (obj: object) => void
    }): void
  }

  export interface component {
    $name: string
    $isComponent: boolean
    $wxpage: object
    $parent: page
    $root: page
    $coms: component[]
    $mixins: mixin[]
    data: object
    methods: Function[]
    props: object[]
    events: Function[]

    setData (key: string | object, value?: object): void

    getCurrentPages (): page[]

    $getComponent (com: string): component

    $invoke (com: string | component, func: string, ...args): Promise

    $broadcast (eventName: string, ...args): void

    $emit (eventName: string, ...args): void

    $apply (func?: Function): void

    $nextTick (func?: Function): Promise
  }

  export interface page extends component {
    $preload (key: string | object, value?: object): void

    $redirect (url: string | object, params?: object): void

    $navigate (url: string | object, params?: object): void

    $switch (url: string | object): void
  }

  export interface event {
    name: string
    source: component
    type: string

    $destroy (): void

    $transfor (wxevent: object): void
  }

  export interface mixin {

  }

  interface RequestOptions {
    url?: string,
    body?: string | object | ArrayBuffer,
    header?: object,
    complete?: () => void
  }

  export function login (options: { timeout?: number }): Promise

  export function getUserInfo (options?: { withCredentials?: boolean, lang?: string, timeout?: number }): Promise<{
    userInfo: { nickName: string, avatarUrl: string, gender: string, city: string }
  }>

  export function request (url_or_options: string | RequestOptions, options?: RequestOptions): Promise

  export function showLoading (obj: { title: string, mask?: boolean, complete?: Function }): Promise

  export function hideLoading (): void

  export function showModal (options: {
    title: string, content: string, showCancel?: boolean, cancelText?: string, cancelColor?: string,
    confirmText?: string, confirmColor?: string
  }): Promise

  export function requestPayment (options: {
    timeStamp: string,
    nonceStr: string,
    package: string,
    signType: 'MD5',
    paySign: string,
  }): Promise
}

