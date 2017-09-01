module.exports = (app, mw) =>

  mw.data.recast('post','body.postId', {
    required: false,
    dest: 'body.post',
    project: d => {
      var r = honey.projector.posts.Project.param(d)
      return assign(r, {log:d.log})
    },
    queryOpts: honey.projector.posts.Opts.param
  })
