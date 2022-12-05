
const JavaScriptObfuscator = require('webpack-obfuscator');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
let config = defaults.__get__('config');

config.optimization.splitChunks = {
    cacheGroups: {
        default: false,
    },
};

config.optimization.runtimeChunk = false;
config.optimization.minimizer.push(
    new UglifyJsPlugin({
        test: /Config.js/,
        uglifyOptions: {
            warnings: false,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_fnames: true,
        }
    })
);

// config.module.rules.push(      {
//     test: /\Config.js$/,
//     include: [ path.resolve(__dirname + '/../src/') ],
//     enforce: 'post',
//     use: { loader: 'obfuscator-loader', options: {/* options here */} }
//   });


// // config.plugins.push(
// //     new JavaScriptObfuscator({
// //         rotateUnicodeArray: true
// //     })
// // );