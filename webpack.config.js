const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./script/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "script"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "script"),
    },
    compress: true,
    port: 9001,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./script/templates/index.html"),
      filename: "index.html",
    }),
  ],
  mode: "development",
  stats: {
    children: true,
  },
};
