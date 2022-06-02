const ctx = require.context('../components', true, /\.vue$/)

export default (app) => {
  ctx.keys().forEach(row => {
    if (/.*Al.*/.test(row) && !(/components/.test(row))) {
      const component = ctx(row).default
      app.component(
        component.name,
        component
      )
    }
  })
}
