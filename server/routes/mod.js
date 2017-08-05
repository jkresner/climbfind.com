module.exports = (app, mw) =>


  honey.Router('mod', {type: 'html'})

    .use([mw.$.session, mw.$.adm])

    .get('/mod/goals', mw.data.logic('mod','goals'), mw.res.page('mod', {layout:null}))

