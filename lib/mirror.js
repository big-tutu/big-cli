const symbols = require("log-symbols");
const fse = require("fs-extra");
const path = require("path");
const defConfig = require("./config");
const chalk = require("chalk");

// 拼接 config.json文件路径
const configJsonPath = path.resolve(__dirname, "../config.json");

async function mirrorAction(link) {
  try {
    // 读取 json 文件
    const jsonConfig = await fse.readJSON(configJsonPath);
    jsonConfig.mirror = link;
    await fse.writeJSON(configJsonPath, jsonConfig);
    console.log(symbols.success, "Set the mirror successful.");
  } catch (error) {
    console.log(symbols.error, chalk.red(`Set the mirror failed, ${error}`));
  }
}

async function setMirror(link) {
  const exist = await fse.pathExists(configJsonPath);
  if (exist) {
    mirrorAction(link);
  } else {
    await defConfig();
    mirrorAction(link);
  }
}

module.exports = setMirror;
