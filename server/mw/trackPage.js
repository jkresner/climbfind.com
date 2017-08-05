module.exports = (app, mw) =>

  view =>
    mw.analytics.view('page', analytics.view, {
      onBot: () => {},
      project: () => ({view})
    })
