module.exports = (app, mw) =>


  honey.Router('mod', {type: 'html', mount: '/mod' })

    .use([mw.$.session, mw.$.adm])

    .get('/templates', mw.$.pd('mod.templates'), mw.res.page('tmpls', {layout:'mod'}))
    .get('/goals', mw.$.pd('mod.goals'), mw.res.page('goals', {layout:'mod'}))
    .get('/users', mw.$.pd('mod.users'), mw.res.page('users', {layout:'mod'}))
    .get('/comm', mw.$.pd('mod.commStats'), mw.res.page('comm', {layout:'mod'}))
