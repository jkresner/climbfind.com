/* 
  
  github.com/webpack/webpack-dev-middleware

*/
let dev = x => null


if (honey.cfg('env') == 'dev') { 

  const webpack       = require('webpack'),
        HtmlPlugin    = require('html-webpack-plugin'),
        wp_dev_mw     = require('webpack-dev-middleware'),
        wp_hot_mw     = require('webpack-hot-middleware'),
        wp_cfg        = require('../../cmd/build/wp.dev.config') 
  
  let html_cfg = {
    template: wp_cfg.output.path+"/public/index.html",
    filename: wp_cfg.output.path+"/index.dev.html" 
  }

  let plugins         = [new HtmlPlugin(html_cfg),
                         new webpack.HotModuleReplacementPlugin(),
                         new webpack.NoEmitOnErrorsPlugin()]
  let cfg             = assign({}, wp_cfg, {plugins})

  const compiler = webpack(Object.assign({
    // webpack options
  }, cfg))
  
  let {publicPath} = cfg.output

  let ops = { 
    wpk: {
        // logLevel:          'silent',
        // logTime: false,
        // logger: null,
        // noInfo:            true,
      publicPath: publicPath,
        // mimeTypes: null,
        // reporter,
        // stats: {
        //   colors: true,
        //   context: process.cwd() },
        // watchOptions: { aggregateTimeout: 200, },
      // writeToDisk: true,
      stats: {
        assets:          false,
        builtAt:         false,
        children:        false,
        // chunkModules:    false,
        // chunkOrigins:    false,
        // chunks:          false,
        // chunksSort:      false,
        entrypoints:     false,
        hash:            false,
        modules:         false,
        // timings:         false,
        version:         false
      }
    },
    hpk: {
      path: `${publicPath}hmr`,
      heartbeat:         3000
    }
  }

  // hack to hook into honey middleware pipeline
  dev = (app, mw) => {
    app
      .use(wp_dev_mw(compiler, ops.wpk))
      .use((req, res, next) => {
        // $log('used.webpage.mw'.magenta)
        if (app.locals.layoutHTML) return next()
        
        compiler.outputFileSystem.readFile(html_cfg.filename, (e, html) => {
          if (e) return next(e)
          app.locals.layoutHTML = html
          next()
        })
      })
      .get(ops.hpk.path, wp_hot_mw(compiler, ops.hpk))

    return null
  }

}

module.exports = dev 
