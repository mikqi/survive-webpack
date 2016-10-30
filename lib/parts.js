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

exports.setupCSS = function (paths) {
  return {
    module: {
      loaders: [
        {
          // hanya untuk merubah file yang berekstensi .css
          test: /\.css$/,
          /**
           * style-loader: berfungsi untuk melakukan
           * import pada file javascript
           *
           * css-loader: berfungsi untuk resolve
           * @import dan url statment pada CSS file
           * @type {Array}
           */
          loaders: ['style', 'css'],

          // jika include tidak di definiskan maka webpack
          // akan menelusuri seluruh file dari base directory
          include: paths,
        },
      ],
    },
  };
};

exports.minify = function () {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,

        // delete all comments
        comments: false,

        // compress specific options
        compress: {
          warnings: false,

          // remove console statments
          drop_console: true,
        },

        // setting untuk penamaan variable / function
        mangle: {
          // tidak merubah $
          except: ['$'],

          // fvck you IE
          screw_ie8: true,

          // keep function name same
          keep_fnames: true,
        },
      }),
    ],
  };
};

exports.setFreeVariable = function (key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ],
  };
};
