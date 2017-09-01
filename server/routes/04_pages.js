module.exports = (app, mw) =>


  honey.Router('pages', {type: 'html'})

    .use(mw.$.session)
    .use(mw.$.trackVisit)

    .get('/', mw.$.pd('posts.listPost',{assign:'posts'}), mw.$.page('home'), mw.$.trackPage('home'))
    .get('/love', mw.$.page('love'))

    .use(mw.$.noindex)

    .get('/login', mw.$.page('login'))
    .get(/\/legal\/(terms-of-service|privacy-policy)/, mw.$.page('legal'))

    .use(mw.$.setReturnTo)
    .use(mw.$.authd)

    .get('/partner-call', mw.$.page('post'))
    .get('/reply/:post', mw.$.param('post'), mw.$.pd('chats.readPost'), mw.$.page('chat'))
    .get('/messages/:chat', mw.$.param('chat'), mw.$.pd('chats.read'), mw.$.page('chat'))
    .get('/messages', mw.$.pd('chats.getInbox'), mw.$.page('inbox'))
    .get('/account', mw.$.pd('posts.account'), mw.$.page('account'))
    .get('/notifications/:subscription', mw.$.param('subscription'),
      mw.$.pd('subscriptions.getSubscription'), mw.$.page('subscription'))
