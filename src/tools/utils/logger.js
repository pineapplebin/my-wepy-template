class Style {
  constructor (temp) {
    this._styles = {}
    this._content = ''
    if (temp instanceof Style) {
      this._styles = { ...temp._styles }
      this._content = temp._content
    } else {
      this._content = '' + temp
    }
  }

  color (c) {
    this._styles['color'] = c
    return this
  }

  fontWeight (fw) {
    this._styles['font-weight'] = fw
    return this
  }

  get content () {
    return '%c ' + this._content
  }

  get styles () {
    return Object.keys(this._styles).reduce((str, key) => (str + `${key}:${this._styles[key]};`), '')
  }
}

export const logger = {
  Style,
  _log (level, ...args) {
    const outs = []
    for (let arg of args) {
      if (arg instanceof Style) {
        outs.push(arg.content, arg.styles)
      } else {
        outs.push(arg)
      }
    }
    console[level](...outs)
  },
  log (...args) {
    this._log('log', ...args)
  },
  warn (...args) {
    this._log('warn', ...args)
  },
  error (...args) {
    this._log('error', ...args)
  }
}
