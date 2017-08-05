module.exports = (app, mw) =>

  mw.data.recast('post','body.postId', {
    required: false,
    dest: 'body.post',
    project: d => {
      var r = honey.projector.posts.Project.item(d)
      return assign(r, {meta:d.meta})
    },
    queryOpts: { select: '_id userId placeId message meta',
                 join: {
                  userId: '_id name photos',
                  placeId: '_id name',
                } }
  })
