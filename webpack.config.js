const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const fileLoaderRule = {
	test: /\.(png|jpe?g|gif)$/i,
	use: [
		'file-loader',
	]
};

module.exports = {
	entry: {
		bundle: ['./src/main.js'],
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte'),
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main'],
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.(js|mjs|svelte)$/,
				include: [
					path.resolve(__dirname, "src"),
					path.resolve(__dirname, "node_modules/svelte"),
					path.resolve(__dirname, "node_modules/@sveltech/routify")
				],				
				use: {
					loader: "babel-loader",
				}
			},
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						dev: !prod,
						emitCss: true,
						hotReload: !prod,
					},
				},
			},
			{
				test: /\.css$/,
				use: [
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader',
				],
			},
            fileLoaderRule
		],
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })
	],
	devtool: prod ? false : 'source-map',
	devServer: {
		contentBase: ['./public', './public/'],
		port: 4200,
		historyApiFallback: true,
	},
	stats: {
		errors: true,
		errorDetails: true,
	},
};
