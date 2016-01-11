module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './web/static/js/bundle.js'
  ],
  output: {
    path: "./priv/static",
    filename: "js/bundle.js"
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: "babel",
        exclude: /node_modules/,
        query: { presets: ['stage-2', 'es2015', 'react'] }
      },
      {
        test: /\.(less)$/,
        loader: 'style!css!less'
      },
      {
        test: /\.(css)$/,
        loader: 'style!css'
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      components: __dirname + "/web/static/js/components",
      actions: __dirname + "/web/static/js/actions",
      phoenix_html: __dirname + "/deps/phoenix_html/web/static/js/phoenix_html.js",
      phoenix: __dirname + "/deps/phoenix/web/static/js/phoenix.js"
    }
  },
};