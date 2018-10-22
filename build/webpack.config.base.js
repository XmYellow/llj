const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PATH = require('./filePath')
const path = require('path')
const {entries, html_plugins} = require('./tool/getFile')

const NODE_ENV = process.env.NODE_ENV || 'development'

const __DEV__ = NODE_ENV === 'development'

let config = {
    entry: Object.assign(entries(PATH.VIEW), {
        'vendor': [
            path.join(PATH.POLYFILL),
            PATH.CSSIMPORT
        ],
    }),
    output: {
        path: PATH.DIST,
        filename: "js/[name].[chunkhash:8].js",
        publicPath: PATH.PUBLICPATH
    },
    module: {
        rules: []
    },
    resolve: {
        modules: [
            'node_modules',
        ],
        extensions: ['*', '.js', '.jsx', '.json'],
    },
    plugins: [].concat(html_plugins(PATH.VIEW, PATH.FAVICON))
}

config.module.rules.push({
        test: '/\.js$/',
        loader: 'babel',
        // exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
        query: {
            presets: ['env']
        }
    },
)
// Images
// ------------------------------------
config.module.rules.push({
    test: /\.(png|jpg|gif)$/,
    loader: 'url-loader',
    options: {
        limit: 8192,
        name: 'image/[name].[hash:8].[ext]',
    }
})


// ------------------------------------
// Styles
// ------------------------------------

const extractStyles = new ExtractTextPlugin({
    filename: 'style/[name].[contenthash:8].css',
    allChunks: false,
    disable: false,
})

config.module.rules.push({
    test: /\.(sass|scss|css$)$/,
    loader: extractStyles.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    sourceMap: __DEV__ ? true : false,
                    minimize: {
                        autoprefixer: {
                            add: true,
                            remove: true,
                            browsers: ['last 2 versions', 'ie 6-8', 'Android > 4', 'ios > 7'],
                        },
                        discardComments: {
                            removeAll: true,
                        },
                        discardUnused: false,
                        mergeIdents: false,
                        reduceIdents: false,
                        safe: true,
                        sourcemap: __DEV__ ? true : false,
                    },
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: __DEV__ ? true : false,
                    includePaths: [
                        PATH.STYLE
                    ],
                },
            }
        ],
    })
})


config.plugins.push(extractStyles)
// Fonts
// ------------------------------------
;[
    ['woff', 'application/font-woff'],
    ['woff2', 'application/font-woff2'],
    ['otf', 'font/opentype'],
    ['ttf', 'application/octet-stream'],
    ['eot', 'application/vnd.ms-fontobject'],
    ['svg', 'image/svg+xml'],
].forEach((font) => {
    const extension = font[0]
    const mimetype = font[1]
    config.module.rules.push({
        test: new RegExp(`\\.${extension}$`),
        loader: 'url-loader',
        options: {
            name: 'fonts/[name].[ext]',
            limit: 10000,
            mimetype,
        },
    })
})
config.module.rules.push({
    test: /\.(htm|html)$/i,
    use: ['html-withimg-loader']
})

module.exports = config
