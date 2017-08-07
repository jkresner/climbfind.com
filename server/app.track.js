module.exports = ({select}, view) => ({

  'visit': d => select(d, 'url ts'),

  'auth.signup': d => ({name:d.signup.name,fb:d.signup.auth.fb.id,profile:d.signup.auth.fb.link,email:d.signup.auth.fb.email,avatar:d.signup.auth.fb.picture.data.url}),

  'auth.login': d => ({name:d.login.name,fb:d.login.auth.fb.id,profile:d.login.auth.fb.link}),

  'post': d => ({place:d.place._id, for: `${d.climbing.join('|')} @ ${d.place.name}`}),

  'post.reply': d => ({post:d._id, place:d.place._id, to: d.user._id, info: `${d.user.name} @ ${d.place.name}` }),

  'chat.message': d => ({chat:d._id, message:d.history[0]._id }),

})
