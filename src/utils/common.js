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

const intoArticle = (src) => {
  store.commit('SetOutlinkSrc', src)
  store.commit('SetShowOutlink', true)
}

export const fn = {
  cut,
  removeCut,
  login,
  changeRoute,
  toWebp,
  refreshUserInfo,
  intoArticle
}