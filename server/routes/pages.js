module.exports = (app, mw) =>


  honey.Router('pages', {type: 'html'})

    .use(mw.$.session)
    .use(mw.$.trackVisit)

    .get('/', mw.data.logic('posts','listPost'), mw.$.page('home'), mw.$.trackPage('home'))
    .get('/love', mw.$.page('love'))

    .use(mw.$.noindex)

    .get('/login', mw.$.page('login'))

    .use(mw.$.setReturnTo)
    .use(mw.$.authd)

    .get('/partner-call', mw.$.page('post'))
    .get('/reply/:post', mw.$.param('post'), mw.$.logic('chats.readPost'), mw.$.page('chat'))
    .get('/messages/:chat', mw.$.param('chat'), mw.$.logic('chats.read'), mw.$.page('chat'))
    .get('/messages', mw.$.logic('chats.getInbox'), mw.$.page('inbox'))
    .get('/account', mw.$.logic('posts.account'), mw.$.page('account'))
    .get('/notifications/:subscription', mw.$.param('subscription'),
      mw.$.logic('subscriptions.getSubscription'), mw.$.page('subscription'))
