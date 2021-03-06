const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./lib/parts');

/**
 * Define Useable Path
 * @type {Object}
 */
const PATHS = {
  app: path.join(__dirname, 'app'),
  style: [
    path.join(__dirname, 'node_modules', 'purecss'),
    path.join(__dirname, 'app', 'main.css'),
  ],
  build: path.join(__dirname, 'build'),
};

const common = {
  /**
   * Masukkan yang akan di proses
   * yang di ambil dari folder PATHS.app
   * @type {Object}
   */
  entry: {
    style: PATHS.style,
    app: PATHS.app,
  },

  /**
   * Pengaturan output yang akan di hasilkan
   * dari input, yang akan disimpan di dalam
   * folder build
   * @type {Object}
   */
  output: {
    path: PATHS.build,
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    devtoolModuleFilenameTemplate: 'webpack',
  },

  /**
  * apa saja yang digunakan dalam project
   * Pengaturan untuk mengatur list plugin
   * @type {Array}
   */
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
    }),
  ],
};

var config;

/**
 * untuk mendeteksi bagaimana dijalankan
 */
switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js',
        },
      },
      parts.clean(PATHS.build),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.extractBundle({
        name: 'vendor',
        entries: ['react'],
      }),
      parts.minify(),
      parts.extractCSS(PATHS.style),
      parts.purifyCSS([PATHS.app])
    );
    break;
  case 'stats':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js',
        },
      },
      parts.clean(PATHS.build),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.extractBundle({
        name: 'vendor',
        entries: ['react'],
      }),
      parts.minify(),
      parts.extractCSS(PATHS.style),
      parts.purifyCSS([PATHS.app])
    );

    break;
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map',
      },
      parts.minify(),
      parts.setupCSS(PATHS.style),
      parts.devServer({
        // untuk mengkustom host/port jika dibutuhkan
        host: process.env.HOST,
        port: process.env.PORT,
      }));
}

module.exports = validate(config, {
  quiet: true,
});
