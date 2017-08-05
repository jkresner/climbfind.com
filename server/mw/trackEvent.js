module.exports = (app, mw) => {

  return name =>
    mw.analytics.event('name', analytics.event, {
      project: honey.projector.analytics.Project[name.split(':')[0]]
    })

}
