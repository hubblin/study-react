const path = require('path');

module.exports = {
    mode: "development",
    resolve: {
        extensions: [".js", ".jsx"]
    },
    entry: './client',
    module: {
        rules: [
          {
            test: /\.jsx?/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env','@babel/preset-react']
              }
            }
          }
        ]
      },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "app.js",
        clean: true,
        publicPath: "/dist"
    },
    devServer: {
        static: {
          directory: path.join(__dirname, '/'),
        },
        compress: true,
        port: 3000,
        hot: true
      },
}