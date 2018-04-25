const _login_state = {
  is_logined: false,
  login_action: null,
}

export function configLoginAction (login_action) {
  if (typeof login_action === 'function')
    _login_state.login_action = login_action
  else
    throw Error('configLoginAction argument 1 require a function type')
}

export function isLoginPage (login_action = null) {
  return function (cls) {
    const o_onLoad = cls.prototype.onLoad || null

    cls.prototype.onLoad = async function (...args) {
      const self = this

      if (!_login_state.is_logined) {
        if (!_login_state.login_action)
          throw Error('need invoke configLoginAction(fn) before')
        await _login_state.login_action.call(this)
        if (typeof login_action === 'function')
          await login_action.call(this)

        _login_state.is_logined = true
      }

      if (o_onLoad) {
        o_onLoad.apply(this, args)
      }
    }

    return cls
  }
}
