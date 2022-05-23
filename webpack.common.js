const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src", "index.js"),
  },

  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        cssbundle: {
          test: path.join(__dirname, "src/dependencies/scss"),
          name: "compressed",
          chunks: "all",
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [
      {test: /\.json$/, loader: "json-loader"},

      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        options: {cacheDirectory: true},
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            }
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => {
                  [
                    require('autoprefixer')
                  ]
                }
              }
            }
          },
          {
            loader: 'sass-loader',
          }
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.((png)|(eot)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "name=/[hash].[ext]",
          esModule: false
        },
      },

    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch:
        "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch",
    }),

    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(process.cwd(), "site/data"),
      prettyPrint: true,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/fonts/",
          to: "fonts/",
        },
      ],
    }),
  ],
};
