const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  target: "node",
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : '',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  node: {
    __dirname: false
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./node_modules/swagger-ui-dist/swagger-ui.css", to: "." },
        {
          from: "./node_modules/swagger-ui-dist/swagger-ui-bundle.js",
          to: "."
        },
        {
          from: "./node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js",
          to: "."
        },
        { from: "./node_modules/swagger-ui-dist/favicon-16x16.png", to: "." },
        { from: "./node_modules/swagger-ui-dist/favicon-32x32.png", to: "." }
      ]
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[name].js.map"
    }),
    new NodemonPlugin({
      script: "./dist/server.js",
      watch: [path.resolve(__dirname, "dist")],
      ignore: ["*.js.map"],
      verbose: true,
      ext: "js,json",
      nodeArgs: ["--inspect"]
    })
  ]
};
