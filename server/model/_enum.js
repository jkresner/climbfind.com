module.exports = {

  SUBSCRIPTION: {
    BEAT: ['instant','daily','weekly','off']
  },

  PLACE: {
    TYPE: ['indoor','outdoor','area']
  },

  CLIMBING: ['boulder','ice','lead','summit','tr','trad','water'],

  COMM: {
    TYPE: ['chats_message', 'posts_notify', 'posts_weekly', 'auth_signup']
  },

  POST: {
    TYPE: ['indoor','outdoor','intro']
  },

  ROUTE: {
    TYPE: [
      '301',                 // 301 forward (string/pattern) from => to
      '302',                 // 302 forward (string/pattern) from => to
      '410',                 // forward (string/pattern) from => to
      '501',                 // 501 Not implemented
      // 'bait',             // 418 teapot (RFC 2324) url.match(from:regex)
      'track',               // 302 forward from => to
      'rewrite'              // 301 forward string.replace from(regex), to(string)
    ]
  }

}
