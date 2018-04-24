async function _wait (seconds) {
  return new Promise((res) => setTimeout(res, seconds))
}

class Director {
  constructor (component, options = {}) {
    this.component = component
    this.animation = wx.createAnimation(options)
    this.planning = {}
  }

  command (fn) {
    fn(this.animation)
    return this.animation.export()
  }

  plan (target, fn) {
    fn(this.animation)
    this.planning[target] = this.animation.export()
    return this
  }

  action ({ wait = 100 } = {}) {
    const self = this
    return new Promise((res, rej) => {
      const keys = Object.keys(self.planning)
      keys.forEach(key => self.component[key] = self.planning[key])
      self.component.$apply()

      _wait(wait).then(() => {
        keys.forEach(key => self.component[key] = null)
        self.component.$apply()
        self.planning = {}
        res()
      })
    })
  }
}

export function connectDirector (animations, options = {}) {
  return function (cls) {
    return class extends cls {
      constructor () {
        super()
        if (animations)
          this.data = Object.assign(animations, this.data)
        const _director = new Director(this, options)
        this.getDirector = this.methods.getDirector = function () {
          return _director
        }
      }
    }
  }
}

