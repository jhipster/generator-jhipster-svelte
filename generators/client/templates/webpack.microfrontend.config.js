const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: {
		main: './src/main.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build'),
		publicPath: 'http://localhost:5001/',
	},
	plugins: [
		new ModuleFederationPlugin({
			name: '<%= remoteName || "remote-app" %>',
			filename: 'remoteEntry.js',
			exposes: {
				'./RemoteComponent': './src/app/lib/microfrontend/RemoteComponent.svelte',
			},
			shared: {
				svelte: {
					singleton: true,
					eager: true,
					requiredVersion: '^4.0.0',
				},
			},
		}),
	],
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: 'svelte-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main'],
	},
	devServer: {
		port: 5001,
		hot: true,
	},
};
