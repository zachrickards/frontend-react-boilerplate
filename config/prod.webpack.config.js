const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (env) {
	return {
		entry: {
			main: path.resolve(__dirname, "../src/index.js"),
			vendor: ['axios', 'react', 'react-bootstrap', 'react-dom']
		},
		output: {
			path: path.resolve(__dirname, "../build/prod"),
			filename: "[name].[chunkhash].bundle.js",
		},
		module: {
			rules: [
				{
					// Before running any of our loaders, lint our code with ESLint
					enforce: 'pre',
          test: /(\.jsx|\.js)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
				},
				{
					// transpile our ES6 code with Babel
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: "babel-loader"
				},
				{
					// extract the CSS we imported as modules and inject it into the transpiled JS code
					test: /\.css$/,
					loader: 'style-loader!css-loader'
				},
				{
					test: /\.less$/,
					loader: "style-loader!css-loader!less-loader" // compiles Less to CSS
				},
				{
					// load other media assets
					test: [/\.eot$/, /\.ttf$/, /\.woff2?$/, /\.png$/, /\.svg$/],
					use: 'url-loader?limit=100000'
				}
			]
		},
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				filename: 'vendor.[chunkhash].bundle.js',
				chunks: ['vendor']
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, '../public/index.html'),
				hash: true,
        chunks: ['vendor', 'main'],
        minify: {
            collapseWhitespace: true
        }
			}),
			new CleanWebpackPlugin(['prod'], {
				root: path.resolve(__dirname, '../build'),
				verbose: true
      }),
      new OptimizeCssAssetsWebpackPlugin({
          cssProcessorOptions: { discardComments: {removeAll: true}}
      }),
      new webpack.optimize.UglifyJsPlugin({
          output: {
              comments: false
          },
          mangle: false,
          sourceMap: true
      }),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(env)
			})
		],
		resolve: {
			extensions: ['.jsx', '.js', '.less', '.css', '.svg', '.png']
		},
		devtool: 'source-map',
		devServer: {
			port: 9000,
			contentBase: path.resolve(__dirname, '../build/prod'),
			inline: true,
			stats: {
				modules: true,
				reasons: true
			}
		}
	}
};
