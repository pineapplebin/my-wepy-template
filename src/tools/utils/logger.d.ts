type FontWeightValue = 'normal' | 'bold' | 'bolder' | 'lighter';

interface StyleConstructor {
  new (temp: Style | string): Style
}

interface Style {
  color (c: string): Style

  fontWeight (fw: FontWeightValue): Style
}

export interface logger {
  Style: StyleConstructor,

  log (...args: Array<Style | string>): void,

  warn (...args: Array<Style | string>): void,

  error (...args: Array<Style | string>): void
}
