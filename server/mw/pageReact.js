module.exports = (app, mw) => {
  
  // React = require('react'),
  // ReactDOMServer = require('react-dom/server')
  // UI = require('../../build/cf.server')

  return function(page) {

    return (req, res, next) => {        
      let data = assign({session:req.user,page}, req.locals.r || {})
      data.places = CAL.places
      
      // let component = ReactDOMServer.renderToString(UI.Component.Post.PostList({data}))
      res.type('html')
      res.write(app.locals.layoutHTML)
      // res.write(component)
      res.write(`<script> window.__INITIAL__DATA__ = ${JSON.stringify(data)}</script>`)
      res.write('</body></html>')
      res.end()

      next()
    }
  }


}
