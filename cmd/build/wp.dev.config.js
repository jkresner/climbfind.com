let {resolve}  = require('path')
let publicPath = '/public/'
let hmr        = 'webpack-hot-middleware/client?' +
   `reload=true&noInfo=true&path=${publicPath}hmr`

                        
module.exports = {

  mode: 'development',
  context: resolve('ui'),  
  entry: {
    main: [      
      './cf.js',
      hmr
    ]
  },
  output: {
    path: resolve('build'),
    publicPath,
    filename: 'cf.dev.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env','@babel/react'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            //options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  target: 'web',
  devtool: '#source-map'
  
}


/*
  stats: {
    // all:                   true,
    assets:                true,
    // assetsSort:            string,
    builtAt:               false,
    cached:                true,
    cachedAssets:          true,
    children:              false,
    chunkGroups:           true,
    chunkModules:          true,
    chunkOrigins:          true,
    chunks:                true,
    // chunksSort:            string,
    colors:                true,
    // context:               string,
    depth:                 true,
    entrypoints:           false,
    env:                   true,
    errorDetails:          true,
    errors:                true,
    exclude:               true,
    // excludeAssets:         RegExp,
    // excludeModules:        RegExp,
    hash:                  false,
    // maxModules:            number,
    moduleAssets:          true,
    moduleTrace:           true,
    modules:               true,
    // modulesSort:           string,
    nestedModules:         true,
    optimizationBailout:   true,
    outputPath:            false,
    // performance:           true,
    // providedExports:       true,
    publicPath:            false,
    reasons:               true,
    source:                true,
    timings:               true,
    usedExports:           false,
    version:               false,
    warnings:              true,
    // warningsFilter:        RegExp
  }
*/
