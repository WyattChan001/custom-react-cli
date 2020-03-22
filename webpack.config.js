const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')    //每次打包前清空dist目录
const path = require("path");
// const os = require('autoprefixer')

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"), //必须是绝对路径
    filename: "bundle.[hash:6].js",
    //publicPath: "/" //通常是CDN地址
  },
  mode: "development",
  devtool: "eval-cheap-module-source-map", //定位到源码的行
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [
          "style-loader", //动态创建 style 标签，并将 css 插入到 head 中
          "css-loader", // 负责处理 @import 等语句
          {
            loader: "postcss-loader", //负责自动生成浏览器兼容性前缀
            options: {
              plugins: function() {
                return [
                  require("autoprefixer")({
                    overrideBrowserslist: [">0.25%", "not dead"]
                  })
                ];
              }
            }
          },
          "sass-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240, //10K,资源大小小于 10K 时，将资源转换为 base64
              esModule: false, //设置为 false，否则，<img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />
              name: "[name]_[hash:6].[ext]" //默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名, 这里通过 options 参数进行修改
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      //cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**']       //不删除dll目录下的文件
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html", //打包后的文件名
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false //是否折叠空白
      },
      hash: true //是否加上hash，默认是 false
    })
  ],
  devServer: {
    //contentBase: path.join(__dirname, 'dist'),      //配置 html-webpack-plugin 后不起作用
    quiet: false, //是否停止输出控制台日志
    inline: true, //默认情况下，将为应用程序启用内联模式，false使用iframe模式
    compress: true, //是否启用 gzip 压缩
    stats: "errors-only", //终端仅打印 error，优先级低于 quiet、noInfo
    overlay: true, //出现编译器错误或警告时，在浏览器中显示全屏覆盖
    clientLogLevel: "silent", //关闭热更新时的输出信息
    port: 9000
  }
};
