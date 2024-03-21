const chalk = require("chalk");
const download = require("download");
const path = require("path");
const ora = require("ora");
const defConfig = require("./config");
const fse = require("fs-extra");

// download 下载、更新模板
// 可以选择 download-git-repo 库， 另外还有 download 库，都是用于远程仓库下载，前者主要是针对 github 平台，download可以指定任意链接资源，还有强大的解压功能无需再安装解压器

const cfgPath = path.resolve(__dirname, "../config.json");
// 凭借 template 模板文件路径, 用于暂存模板
const tmlPath = path.resolve(__dirname, "../template");

async function dlAction() {
  try {
    // 情况木模板文件
    await fse.remove(tmlPath);
  } catch (error) {
    console.log(error);
    process.exit();
  }

  const jsonConfig = await fse.readJson(cfgPath);
  const dlSpinner = ora(chalk.cyan("Downloading template ..."));
  // 开始执行动画
  dlSpinner.start();
  try {
    console.log(jsonConfig.mirror + "template.zip");
    // 读取模板并解压
    await download(
      jsonConfig.mirror + "template.zip",
      path.resolve(__dirname, "../template/"),
      { extract: true },
    );
  } catch (error) {
    dlSpinner.text = chalk.red(`Download template failed. ${error} `);
    dlSpinner.fail();
    process.exit();
  }
  dlSpinner.text = chalk.green("Download template successful.");
  dlSpinner.succeed();
}

async function dlTemplate() {
  const exist = await fse.pathExists(cfgPath);
  if (exist) {
    await dlAction();
  } else {
    await defConfig();
    await dlAction();
  }
}

module.exports = dlTemplate;
