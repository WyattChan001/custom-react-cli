const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index"
  },
  output: {
    path: resolve("../dist"),
    filename: "js/[name].[hash:8].js",
    publicPath: "/" //打包后的资源的访问路径前缀
  },
  module: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: true, //true：默认值，script标签位于html文件的 body 底部
      filename: "index.html", //打包后的文件名
      //  html 文件进行压缩
      minify: {
        removeComments: true, //去注释
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: true //是否折叠空白
      },
      hash: true //是否加上hash，默认是 false
    })
  ],
  devServer: {}
};
