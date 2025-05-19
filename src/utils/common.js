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
  store.dispatch('app/UpdateLoginVisible', true)
}

const changeRoute = () => {
  store.dispatch('app/UpdateRouteTabVisible', true)
}

const refreshUserInfo = () => {
  const userInfo = store.state.app.userInfo
  if (userInfo.uuid) {
    const params = {
      id: userInfo.uuid,
      type: 'uuid'
    }
    apis.getUserInfo(params).then(res => {
      if (res.uuid) {
        store.dispatch('app/UpdateUserInfo', res)
      }
    })
  }
}

const intoArticle = (src) => {
  store.dispatch('app/UpdateOutlinkSrc', src)
  store.dispatch('app/UpdateShowOutlink', true)
}

const addJs = (url, cb) => {
  const body = document.getElementsByTagName('body')[0]
  const js = document.createElement('script')
  js.setAttribute('type', 'text/javascript')
  js.setAttribute('src', url)
  js.onload = cb
  body.appendChild(js)
}

export const fn = {
  cut,
  removeCut,
  login,
  changeRoute,
  toWebp,
  refreshUserInfo,
  intoArticle,
  addJs
}