
### 新建项目
```bash
  mkdir big-cli
  cd big-cli
  npm init
```

### 安装依赖
```bash
yarn add -D chalk commander download fs-extra handlebars inquirer log-symbols ora update-notifier

```

### 注册指令
在开发环境调试脚手架时，直接使用注册的指令
```js
  // package.json
  "bin": {
    "big-cli": "./bin/index.js"
  }
```

### 检测版本
```bash
  $ big-cli -v
```
在 bin/index.js 中编写代码检测版本，注意在改文件顶部要写入注释 #!/user/bin/env node，必要添加，让系统更具对应的路径查找命令
然后执行添加软连接 yarn link
```js
  yarn link
```
使用 yarn unlink 解除链接
