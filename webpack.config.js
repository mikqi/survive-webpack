const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Define Useable Path
 * @type {Object}
 */
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

module.exports = {
  /**
   * Masukkan yang akan di proses
   * yang di ambil dari folder PATHS.app
   * @type {Object}
   */
  entry: {
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
  },

  /**
   * Pengaturan untuk mengatur list plugin
   * apa saja yang digunakan dalam project
   * @type {Array}
   */
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
    }),
  ],
};
