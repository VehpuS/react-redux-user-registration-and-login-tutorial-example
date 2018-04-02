import webpack from 'webpack'
import path from 'path'

/*
Webpack is the build tool that takes our application code and generates
static assets as well as a development server.

Webpack has several advantages over other build tools:
- it strips out unused code
- supports hot module replacement
- easily configured.

To get started we need to install webpack both globally and in the project.
We install it globally to make the webpack command available and we install
it locally so we can specify which version of webpack the project should use
instead of relying on the global install.

npm install webpack --global
npm install webpack --save-dev
 */

export default {
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, 'client/src/index.js')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'client/output'),
    filename: 'index.js'
  },
  module: {
    // use loaders to send our code through Babel and transform our JSX into JS.
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      }
    ]
  }
}
