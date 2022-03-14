const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const { node } = require('webpack');

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
		mainFields: ['svelte', 'browser', 'module', 'main']
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
						compilerOptions: {
							// NOTE Svelte's dev mode MUST be enabled for HMR to work
							dev: !prod, // Default: false
						},
						// NOTE emitCss: true is currently not supported with HMR
						// Enable it for production to output separate css file
						emitCss: prod, // Default: false
						// Enable HMR only for dev mode
						hotReload: !prod, // Default: false
						// Extra HMR options, the defaults are completely fine
						// You can safely omit hotOptions altogether
						hotOptions: {
							// Prevent preserving local component state
							preserveLocalState: false,

							// If this string appears anywhere in your component's code, then local
							// state won't be preserved, even when noPreserveState is false
							noPreserveStateKey: '@!hmr',

							// Prevent doing a full reload on next HMR update after fatal error
							noReload: false,

							// Try to recover after runtime errors in component init
							optimistic: false,

							// --- Advanced ---

							// Prevent adding an HMR accept handler to components with
							// accessors option to true, or to components with named exports
							// (from <script context="module">). This have the effect of
							// recreating the consumer of those components, instead of the
							// component themselves, on HMR updates. This might be needed to
							// reflect changes to accessors / named exports in the parents,
							// depending on how you use them.
							acceptAccessors: true,
							acceptNamedExports: true
						}
					}
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
        }),
		new CopyPlugin({
			patterns: [
				{ from: "./public/images", to: "./images" }
			]
		})
	],
	devtool: prod ? false : 'source-map',
	devServer: {
		static: ['./public', './public/'],
		port: 4200,
		historyApiFallback: true,
	},
	stats: {
		errors: true,
		errorDetails: true,
	},
};
