const utils = require("./utils");
const path = require("path");
const postcssNormalize = require("postcss-normalize");

module.exports = {
  entry: {
    app: "./src/index"
  },
  output: {
    path: utils.resolve("../dist"),
    filename: "static/js/[name].[hash:8].js",
    publicPath: "/" //打包后的资源的访问路径前缀
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, //一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader" // 创建 <style></style>
          },
          {
            loader: "css-loader", // 转换css
            options: {
              modules: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", //动态创建 style 标签，并将 css 插入到 head 中
          {
            loader: "css-loader", // 负责处理 @import 等语句
            options: {
              modules: false
            }
          },
          {
            loader: "postcss-loader", //负责自动生成浏览器兼容性前缀
            options: {
              plugins: function() {
                return [
                  require("autoprefixer")({
                    overrideBrowserslist: [">0.25%", "not dead"]
                  }),
                  // postcssNormalize()
                ];
              }
            }
          },
          "sass-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240, //10K,资源大小小于 10K 时，将资源转换为 base64
              esModule: false, //设置为 false，否则，<img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />
              name: "static/img/[name]_[hash:7].[ext]" //默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名, 这里通过 options 参数进行修改
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10240,
          name: "static/fonts/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"], // 解析扩展。（当我们通过路径导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
    alias: {
      "@": path.join(__dirname, "..", "src") // 在项目中使用@符号代替src路径，导入文件路径更方便
    }
  }
};
