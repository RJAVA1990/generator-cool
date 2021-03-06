/* eslint-disable global-require */
/* eslint-disable import/no-commonjs */
const { resolve } = require("path");
const packageJson = require("../package.json");

function webpackChain(chain) {
  chain.resolve.modules.add(resolve(__dirname, "../src"));
}

const autoprefixer = {
  enable: true,
  config: {
    browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"]
  }
};

const cssModules = {
  enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
  config: {
    namingPattern: "module", // 转换模式，取值为 global/module
    generateScopedName: "[name]__[local]___[hash:base64:5]"
  }
};

const config = {
  projectName: packageJson.name,
  designWidth: 750,
  deviceRatio: {
    "640": 2.34 / 2,
    "750": 1,
    "828": 1.81 / 2
  },
  sourceRoot: "src",
  outputRoot: "dist",
  babel: {
    sourceMap: true,
    presets: [
      [
        "env",
        {
          modules: false
        }
      ]
    ],
    plugins: [
      "transform-decorators-legacy",
      "transform-class-properties",
      "transform-object-rest-spread"
    ]
  },
  defineConstants: {},
  mini: {
    postcss: {
      autoprefixer,
      cssModules,
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      }
    },
    webpackChain
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer,
      cssModules
    },
    webpackChain
  }
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
