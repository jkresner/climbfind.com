module.exports = (app, mw) =>

  mw.data.recast('chat','body.chatId', { dest: 'body.chat' })
