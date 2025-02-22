const {resolve} = require('path'), 
  publicPath    = '/public/',
  nodeExternals = require('webpack-node-externals')


module.exports = (env, argv) => ({

  entry: {
    server: resolve('ui/cf')
  },
  output: {
    path: resolve('build'),
    publicPath,
    filename: 'cf.server.js',
    libraryTarget: 'commonjs'
  },
  mode: argv.mode,
  target: 'node',
  node: {
    __dirname: false,   
    __filename: false
  },
  externals: [
    nodeExternals()
  ], 
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /honey\/node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/react', '@babel/env'] }   
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  stats: { 
    assets:          false,    
    builtAt:         false,    
    children:        false,
    chunks:          false,     
    hash:            false,
    // version:         false
  }

})
