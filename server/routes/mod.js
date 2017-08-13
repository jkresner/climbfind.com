module.exports = (app, mw) =>


  honey.Router('mod', {type: 'html', mount: '/mod' })

    .use([mw.$.session, mw.$.adm])

    .get('/templates', mw.data.logic('mod','templates'), mw.res.page('tmpls', {layout:'mod'}))
    .get('/goals', mw.data.logic('mod','goals'), mw.res.page('goals', {layout:'mod'}))
    .get('/users', mw.data.logic('mod','users'), mw.res.page('users', {layout:'mod'}))
    .get('/comm', mw.data.logic('mod','commStats'), mw.res.page('comm', {layout:'mod'}))
