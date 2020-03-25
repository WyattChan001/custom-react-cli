const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const utils = require("./utils");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //每次打包前清空dist目录
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")

module.exports = webpackMerge(baseWebpackConfig, {
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      filename: utils.resolve("./../dist/index.html"), //打包后的文件名
      template: "./public/index.html",
      inject: true, //true：默认值，script标签位于html文件的 body 底部
      //  html 文件进行压缩
      minify: {
        removeComments: true, //去注释
        // removeAttributeQuotes: false, //去除属性引号
        collapseWhitespace: true //是否折叠空白
      },
      hash: true //是否加上hash，默认是 false
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ]
});
