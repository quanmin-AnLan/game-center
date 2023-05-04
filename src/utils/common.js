import store from '../store/index'
import apis from '@/api'

const cut = (url, width, height) => {
  if (!url) {
    return ''
  }
  if (!width || !height) {
    return url
  }
  const cutKey = `2/w/${width}/h/${height}`
  return url.replace(/(imageView2\/)(.*)(\/format\/)/g, `$1${cutKey}$3`)
}

const removeCut = (url) => {
  if (!url) {
    return ''
  }
  const cutKey = '0'
  return url.replace(/(imageView2\/)(.*)(\/format\/)/g, `$1${cutKey}$3`)
}

const toWebp = (url) => {
  if (!url) {
    return ''
  }
  let base = url
  base += '?imageView2/0/format/webp/interlace/1/q/70'
  return base
}

const login = () => {
  store.commit('SetLoginVisible', true)
}

const changeRoute = () => {
  store.commit('SetRouteTabVisible', true)
}

const refreshUserInfo = () => {
  const userInfo = localStorage.getItem('user_info')
  if (userInfo) {
    const params = {
      id: JSON.parse(userInfo)?.uuid,
      type: 'uuid'
    }
    apis.getUserInfo(params).then(res => {
      if (res.uuid) {
        store.commit('SetUserInfo', res)
        localStorage.setItem('user_info', JSON.stringify(res))
      }
    })
  }
}

// 1：在这里导出了fn对象，里面包含所有的方法，2：在main.js里面直接注册到vue的原型里面去，3：全局可以通过直接的this.$fn调用对应的方法
export const fn = {
  cut,
  removeCut,
  login,
  changeRoute,
  toWebp,
  refreshUserInfo
}