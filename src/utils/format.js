const cutPicUrl = (url, width, height) => {
  if (!url) {
    return ''
  }
  if (!width || !height) {
    return url
  }
  const cutKey = `2/w/${width}/h/${height}`
  return url.replace(/(imageView2\/)(.*)(\/format\/)/g, `$1${cutKey}$3`)
}

export {
  cutPicUrl
}