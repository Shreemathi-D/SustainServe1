const path = require("path");
const webpack = require("webpack");

module.exports = {
    resolve: {
        fallback: {
            "buffer": require.resolve("buffer/"),
            "fs": false, // fs is for backend, so disable it
            "path": require.resolve("path-browserify"),
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
            "url": require.resolve("url/"),
            "zlib": require.resolve("browserify-zlib"), // ✅ Added polyfill for zlib
            "querystring": require.resolve("querystring-es3") // ✅ Added polyfill for querystring
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"]
        })
    ]
};
