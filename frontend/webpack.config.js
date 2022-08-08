const resolve = require('resolve');
const paths = require('./paths');

const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env) => {
    const environment = env.environment;
    const isProduction = environment === 'production';
    const isDevelopment = environment === 'development';

    return {
        mode: environment,

        entry: paths.appIndexTS,

        output: {
            filename: '[name].bundle.js',
            path: paths.appBuild,
            clean: true,
        },

        cache: {
            type: 'filesystem',
            allowCollectingMemory: true,
            store: 'pack',
            buildDependencies: {
                config: [__filename],
            },
        },

        devServer: {
            static: {
                directory: paths.appSrc,
            },
            host: 'localhost',
            port: 3000,
            hot: true,
        },

        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        },

        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true,
                        },
                    },
                    // Enable threads
                    parallel: true,
                    extractComments: false,
                }),
                new CssMinimizerPlugin(),
            ],
            runtimeChunk: 'single',
        },

        module: {
            rules: [
                {
                    // TS files inside an src folder processing
                    test: /\.(ts|js)?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            // Disable types checking during processing to delegate this matter
                            // to the fork-ts-checker-webpack-plugin
                            transpileOnly: true,
                        },
                    },
                    include: paths.appSrc,
                    exclude: /node_modules/,
                },
                {
                    // SCSS files processing
                    test: /\.(s(a|c)ss)$/,
                    use: [
                        isProduction
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: isDevelopment,
                            },
                        },
                        'postcss-loader',
                        'resolve-url-loader',
                        'sass-loader',
                    ],
                    exclude: /\.module.(s(a|c)ss)$/,
                },
                {
                    // Module SCSS files processing
                    test: /\.module.(s(a|c)ss)$/,
                    use: [
                        isProduction
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: isDevelopment,
                                modules: {
                                    localIdentName: isDevelopment
                                        ? '[folder]__[local]-[hash:base64:5]'
                                        : '[hash:base64:12]',
                                },
                            },
                        },
                        'postcss-loader',
                        'resolve-url-loader',
                        'sass-loader',
                    ],
                },
                {
                    // Images build-in processing
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: 'asset/resource',
                },
                {
                    // Fonts and SVG build-in processing
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: 'asset/inline',
                },
            ],
        },

        resolve: {
            extensions: ['.ts', '.js', '.css', '.scss'],
        },

        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: paths.appTemplate,
                minify: isProduction && {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            }),
            new ForkTsCheckerWebpackPlugin({
                async: isDevelopment,
                typescript: {
                    typescriptPath: resolve.sync('typescript', {
                        basedir: paths.appNodeModules,
                    }),
                    configOverwrite: {
                        compilerOptions: {
                            sourceMap: true,
                            skipLibCheck: true,
                            inlineSourceMap: false,
                            declarationMap: false,
                            noEmit: true,
                            incremental: true,
                            tsBuildInfoFile: paths.appTsBuildInfoFile,
                        },
                    },
                    context: paths.appPath,
                    diagnosticOptions: {
                        syntactic: true,
                    },
                    mode: 'write-references',
                },
                issue: {
                    include: [
                        { file: '../**/src/**/*.{ts}' },
                        { file: '**/src/**/*.{ts}' },
                    ],
                },
            }),
            isProduction &&
                new MiniCssExtractPlugin({
                    filename: '[name].[contenthash:8].css',
                    chunkFilename: '[name].[contenthash:8].chunk.css',
                }),
            isDevelopment && new CleanWebpackPlugin(),
        ].filter(Boolean),

        devtool: isProduction ? 'source-map' : 'inline-source-map',
    };
};
