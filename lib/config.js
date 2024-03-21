// 用于处理默认的脚手架的默认配置
const path = require("path");
const fse = require("fs-extra");
// fs-extra 是封装的 fs 库，对文件基础操作进行了封装，使用更加的便捷，可以方便的实现 json 读写
// 声明配置文件
const jsonConfig = {
  name: "big-cli",
  mirror: "",
};

// 凭借 config.json完整路径
const configPath = path.resolve(__dirname, "../config.json");
async function defConfig() {
  try {
    // 将jsonConfig 保存到 config.json中
    await fse.outputJSON(configPath, jsonConfig);
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

module.exports = defConfig;
