const webpack = require('webpack');

exports.devServer = function (options) {
  return {
    watchOptions: {
      // delay rebuild setelah pertama kali berubah
      aggregateTimeout: 300,
      poll: 1000,
    },
    devServer: {
      /**
       * Untuk mengaktifkan API history untuk HTML5
       * berguna untuk routing berbasis HTML5 history API
       * @type {Boolean}
       */
      historyApiFallback: true,

      /**
       * Bukan untuk mengaktifkan
       * Hot module replacement
       * @type {Boolean}
       */
      hot: true,
      inline: true,

      /**
       * setting untuk menampilkan error saja
       * @type {String}
       */
      stats: 'errors-only',

      host: options.host, // Defaults host 'localhost'
      port: options.port, // Defaults port 8080
    },
    plugins: [

      /**
       * untuk mengaktifkan multiple-pass compilation
       * untuk meningkatkan perofrmansi pada projek
       * yang besar
       * @type {Boolean}
       */
      new webpack.HotModuleReplacementPlugin({
        ministep: true,
      }),
    ],
  };
};
