import wepy from 'wepy'
import mapping from './mapping'
import { logger } from '../utils/logger'

const DEFAULT_OPTIONS = {
  LOGIN_NAME: 'login',
  ROOT_URL: 'http://localhost',
  SHOW_LOADING: false,
}

function createLogger (url) {
  const style = new logger.Style(`API Request: ${url}`).color('blue')
  return {
    log (...args) {
      logger.log(style, ...args)
    },
  }
}

const _state = { api: null, count: 0 }

function request (obj, { SHOW_LOADING }) {
  return new Promise((res, rej) => {
    if (!_state.count && SHOW_LOADING)
      wepy.showLoading({ title: '加载中' }).catch(err => err)
    _state.count++

    const { url, data, method, header, complete } = obj
    const _header = Object.assign({
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Authorization': getToken()
    }, header || {})

    wx.request({
      url, data, method, header: _header, complete: (...args) => {
        _state.count--
        if (_state.count <= 0 && SHOW_LOADING) {
          _state.count = 0
          wepy.hideLoading()
        }
        if (complete)
          complete(...args)
      },
      success: res, fail: rej
    })
  })
}

function createApi (api_config, options, login_api) {
  return async function (args = {}) {
    const { ROOT_URL } = options

    let res = null
    args.method = api_config.method

    const _logger = createLogger(api_config.url)
    _logger.log('START')

    // 前置处理
    if (api_config.before) {
      args.data = await api_config.before(args.data)
    }
    // 转换参数
    if (args.data) {
      args.data = Object.keys(args.data).reduce((obj, key) => {
        if (api_config.request[key])
          obj[key] = api_config.request[key](args.data[key])
        else
          obj[key] = args.data[key]
        return obj
      }, {})
    }
    _logger.log('REQUEST', args.data)
    // 进行请求
    try {
      res = await request({ url: ROOT_URL + api_config.url, ...args }, options)
      _logger.log('RESPONSE', res)
    } catch (e) {
      res = null
      _logger.log('ERROR', e)
    }
    // 处理重登录
    if (!res || res.statusCode !== 200) {
      if (res && res.statusCode === 401 && login_api) {
        await login_api()
      }
      try {
        res = await request({ url: ROOT_URL + api_config.url, ...args }, options)
        _logger.log('RESPONSE', res)
      } catch (e) {
        res = null
        _logger.log('ERROR', e)
      }
      if (!res || res.statusCode >= 500) {
        wx.showModal({
          title: '网络错误',
          content: `网络出现错误，请稍后再试。[错误码:${res ? res.statusCode : 'null'}]`,
          showCancel: false,
        })
      }
    }
    // 后置处理
    if (res) {
      if (api_config.after)
        res = await api_config.after(res)
      return res
    } else
      throw 'request error'
  }
}

function parseMapping (mapping, options, login_api) {
  const rst = {}
  Object.keys(mapping).forEach(key => {
    const item = mapping[key]
    if (item['@@api_config_']) {
      rst[key] = createApi(item, options, login_api)
    } else if (typeof item === 'object') {
      rst[key] = parseMapping(item, options, login_api)
    } else {
      rst[key] = item
    }
  })
  return rst
}

export default function (wepy, options = {}) {
  options = Object.assign(DEFAULT_OPTIONS, options)

  const login_api_config = mapping[options.LOGIN_NAME]
  let api, login_api;

  if (login_api_config) {
    login_api = parseMapping(login_api_config, options, null)
  }
  api = parseMapping(mapping, options, login_api)
  wepy.component.prototype.$$api = wepy.app.prototype.$$api = api
}
