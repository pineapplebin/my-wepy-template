import wepy from 'wepy'
import { setStore } from 'wepy-redux'
import configStore from './store'
import initApi from './tools/api'
import config from './config'

// init redux
const store = configStore()
setStore(store)

// others
initApi(wepy, {
  ...config
})
