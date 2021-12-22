# 安装

## Feflow CLI 安装

`Feflow` 支持 Node 6.0 以上的版本，你可以使用以下命令来安装我们提供的命令行工具：

**使用npm安装**


```sh

npm install @feflow/cli -g

```

**使用yarn安装**

```sh
# 如未安装 yarn，请先执行这一步安装。已安装的忽略。
npm install yarn -g

# 安装 feflow
yarn global add @feflow/cli
# 重新设置包管理器
fef config set packageManager yarn
```

如果你是第一次安装，那么需要运行一次 `Feflow` 来初始化：

```sh
fef
```


这里让你填写的 npm registry 和 npm proxy 是为了让你用 `Feflow` 安装模块的时候保证网络畅通或者是从私有仓库上下载 NPM 包。比如说你想用淘宝镜像安装模块，那么这里的 npm registry 要填写 https://registry.npm.taobao.org， 这样一来，`Feflow` 在安装模块时，就会通过这个配置进行包的下载。

如果你不小心一路回车使用了默认配置，那么你还可以通过以下命令来配置。以淘宝镜像为例：

```sh
fef config set registry https://registry.npm.taobao.org
```

> 关于 feflow config 命令的详解可以看[这里](./base-plugins-inner.md#全局配置插件)

## 样例脚手架安装

`Feflow` 的核心部分并没有一个脚手架，脚手架都是通过 `Feflow` 来安装的。为了简单起见，你可以先使用我们团队提供的脚手架 [generator-ivweb](https://github.com/feflow/generator-ivweb) 来继续这个教程。可以用如下命令安装：

```sh
fef install @feflow/generator-example
```

> 关于脚手架详细内容可以看[这里](./advance-scaffold-custom.md)

到这里，脚手架就安装成功了，下面就可以开始创建项目了。
