# 创建项目

进入你想创建项目的目录，使用 `fef init` 命令即可创建项目：

![脚手架选择](/create-project.gif)

Feflow 会让你从现有的脚手架中选择一个来创建项目，目前你只安装一个脚手架，所以只用选择 `腾讯IVWEB出品的基于Redux+Redux开发脚手架` 就好。它是一个多页面脚手架，用它创建的项目自带 `React` 和 `Redux` 库，且使用 `Webpack` 作为构建工具。


## 安装脚手架

如果你本地还未安装任何脚手架，你可以使用 `fef install`(或者 fef i) 来安装一个脚手架，卸载时使用 `fef uninstall` 来进行卸载

### 1) 安装一个脚手架

````bash
fef install @feflow/generator-example
````

### 2）卸载一个脚手架

````bash
fef uninstall @feflow/generator-example
````

### 3) 列出本地安装的脚手架

````bash
fef list
````


> 关于官方推荐的脚手架的详细介绍可参考[这里](https://github.com/feflow/generator-ivweb)


```bash
# 运行fef dev即可启动项目
fef dev
```

## 开始开发

项目创建好后，在项目目录下运行 `npm i` 安装好依赖，然后再运行 `fef dev` 就能启动本地服务，服务默认运行在 http://127.0.0.1:8001。

打开 http://127.0.0.1:8001 ，你会看到初始态的一个页面。如果你想修改这个页面，则需要先大概了解一下项目的目录结构，知道去哪改。

项目的目录结构是由你所选择的脚手架决定的，以本教程所使用的脚手架为例，生成的项目主要结构如下：

```sh
|- src
    |- assets # 公共的 JS、CSS、Images 目录
    |- middleware # 公共的 Redux 中间件 目录
    |- modules # 公共模块
    |- pages # 页面目录
        |- index # 首页
            |- actions # 页面级的 actions 目录
            |- components # 页面级的公共组件目录
            |- reducers # 页面级的 reducers 目录
            |- index.html # HTML 入口
            |- index.js # 页面 Class
            |- index.less # pageComponent.js 中元素的样式，或者全局样式
            |- init.js # JS 入口
            |- pageComponent.js # React 根组件
    |- reducers # 公共的 reducers 目录
|- .feflowrc.js # Feflow 配置文件
```

其中，`src/pages/index/index.html` 就是 `http://127.0.0.1:8001` 展示的页面。你可以打开 `src/pages/index/pageComponent.js` 文件进行修改。


