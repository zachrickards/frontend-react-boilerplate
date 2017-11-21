const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (env) {
	return {
		entry: {
			main: path.resolve(__dirname, "../src/index.js"),
			vendor: ['axios', 'react', 'react-bootstrap', 'react-dom']
		},
		output: {
			path: path.resolve(__dirname, "../build/dev"),
			filename: "[name].bundle.js",
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
				filename: 'vendor.bundle.js',
				chunks: ['vendor']
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, '../public/index.html'),
				hash: true,
				chunks: ['vendor', 'main']
			}),
			new CleanWebpackPlugin(['dev'], {
				root: path.resolve(__dirname, '../build'),
				verbose: true
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(env)
			})
		],
		resolve: {
			extensions: ['.jsx', '.js', '.less', '.css', '.svg', '.png']
		},
		devtool: 'source-map',
		// configure a dev server that can watch and reload when files change
		devServer: {
			port: 9000,
			contentBase: path.resolve(__dirname, '../build/dev'),
			watchContentBase: true,
			stats: {
				modules: true,
				reasons: true
			},
      historyApiFallback: {
          index: '/index.html'
      }
		}
	}
};
