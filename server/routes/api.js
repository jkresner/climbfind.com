module.exports = (app, mw) => {


  app.API('places', { baseUrl:'/api/mod/places' })
    .params('place')
    .uses('authd adm')
    .get({ listPlace:            '',
           getPlace:             'place'               })
    .put({ updatePlace:          'place body'          })
      //      approvePlace:      'place body'          })
    .delete({ deletePlace:       'place'               })


  app.API('posts')
    .params('post place')
    .uses('authd')
    .get ({ listPost:            ''                    })
    .post({ createPost:          'body place'          })
    .delete({ deletePost:        'post'                })


  app.API('subscriptions')
    .params('subscription')
    .uses('authd')
    .get({ listSubscription:     ''                    })
    .put({ updateSubscription:   'subscription body'   })


  app.API('chats')
    .params('post chat')
    .uses('authd')
    .get ({ getInbox:            '',
            read:                'chat',
            readPost:            'post'                })
    .post({ use: 'reqChat reqPost' },
          { message:             'body.chat body.text body.post' })
    // .delete({ deleteMessage:   'params.id'          })

}
