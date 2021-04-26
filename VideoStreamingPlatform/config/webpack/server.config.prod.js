/* eslint-disable global-require */
const nodeExternals = require('webpack-node-externals');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const paths = require('../paths');

const publicPath = paths.servedPath;

const server = {
  mode: 'production',
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  externals: [nodeExternals()],
  entry: [paths.appServerIndexJs],
  output: {
    path: paths.appServerBuild,
    filename: 'index.js',
    publicPath,
    libraryTarget: 'commonjs2'
  },
  stats: 'errors-only',
  optimization: {
    minimize: false,
    namedModules: true,
    namedChunks: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint')
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        include: paths.appServerSrc
      },
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              require.resolve('cache-loader'),
              {
                loader: require.resolve('babel-loader'),
                options: {
                  babelrc: false,
                  presets: [
                    [
                      require.resolve('@babel/preset-env'),
                      {
                        targets: {
                          node: 'current'
                        }
                      }
                    ],
                    require.resolve('@babel/preset-react')
                  ],
                  plugins: [
                    require.resolve('babel-plugin-dynamic-import-node'),
                    // class { handleClick = () => { } }
                    require.resolve('@babel/plugin-proposal-class-properties'),
                    // The following two plugins use Object.assign directly, instead of Babel's
                    // extends helper. Note that this assumes `Object.assign` is available.
                    // { ...todo, completed: true }
                    [
                      require.resolve(
                        '@babel/plugin-proposal-object-rest-spread'
                      ),
                      {
                        useBuiltIns: true
                      }
                    ],
                    // Transforms JSX
                    [
                      require.resolve('@babel/plugin-transform-react-jsx'),
                      {
                        useBuiltIns: true
                      }
                    ],
                    // Polyfills the runtime needed for async/await and generators
                    [
                      require.resolve('@babel/plugin-transform-runtime'),
                      {
                        helpers: false,
                        regenerator: true
                      }
                    ]
                  ]
                }
              }
            ]
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: 'css-loader',
                options: {
                  exportOnlyLocals: true
                }
              }
            ]
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
              emitFile: false
            }
          }
        ]
      }
    ]
  }
};

module.exports = server;
