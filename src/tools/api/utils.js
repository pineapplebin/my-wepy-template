export function apiConfig (opt = {}) {
  const default_api = {
    '@@api_config_': true,
    url: '', request: {},
    before: null, after: null,
    relogin: true, method: 'GET'
  }
  return Object.assign(default_api, opt)
}

export const types = {
  toInt: () => (value) => {
    const rst = Number(value)
    if (Number.isNaN(rst))
      throw new Error(`${value} is not Integer type`)
    return Math.floor(value)
  },
  toFloat: (fixed = null) => (value) => {
    const rst = Number(value)
    if (Number.isNaN(rst))
      throw new Error(`${value} is not Integer type`)
    if (fixed) {
      const digits = Math.pow(10, fixed)
      return Math.floor(value * digits) / digits
    } else {
      return rst
    }
  },
  toStr: () => (value) => {
    return ('' + value)
  },
  toBoolean: () => (value) => {
    return !!value
  },
  raw: () => value => value,
}
