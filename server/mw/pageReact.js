module.exports = (app, mw) => {
  
  // React = require('react'),
  // ReactDOMServer = require('react-dom/server')
  // UI = require('../../UI/index.server')

  return function(page) {

    return (req, res, next) => {        
      let data = req.locals.r
      // let component = ReactDOMServer.renderToString(UI.Component.Post.PostList({data}))

      res.type('html')
      res.write(app.locals.layoutHTML)
      // res.write(component)
      res.write(`<script> window.__INITIAL__DATA__ = ${JSON.stringify(req.locals.r)}</script>`)
      res.write(`</body></html>`)
      res.end()

      next()
    }
  }


}
