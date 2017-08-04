module.exports = (app, mw) =>

  mw.data.recast('post','body.postId', {
    required: false,
    dest: 'body.post',
    project: honey.projector.posts.Project.item,
    queryOpts: { select: '_id userId message meta',
                 join: { userId: '_id name photos' } }
  })
