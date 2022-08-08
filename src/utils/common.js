import store from '../store/index'

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

const login = () => {
  store.commit('SetLoginVisible', true)
}

export const fn = {
  cut,
  login,
}