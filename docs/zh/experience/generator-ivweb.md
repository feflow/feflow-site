---
layout: Blog
date: 2019/03/26
description: 每个公司甚至每个项目组，在开发新项目的时候都会有一些自己特色的东西，比如公共组件，ajax 请求拦截处理，内部积累的一些业务逻辑等等，如果没有自己的脚手架，那么拷贝代码成为常态，每个项目的结构，甚至是构建配置都会由很大差异，导致代码维护成为一个难题。
---

# generator-ivweb —— 基于 react-redux 的多页脚手架

### 背景

> 每个公司甚至每个项目组，在开发新项目的时候都会有一些自己特色的东西，比如公共组件，ajax 请求拦截处理，内部积累的一些业务逻辑等等，如果没有自己的脚手架，那么拷贝代码成为常态，每个项目的结构，甚至是构建配置都会由很大差异，导致代码维护成为一个难题。

### 简介

generator-ivweb 是由腾讯 IVWEB 团队设计的脚手架，基于团队开源项目 feflow，feflow 是一个前端集成开发环境，详细介绍可以看这里：[feflow](https://github.com/feflow/feflow/wiki/Feflow-%E8%85%BE%E8%AE%AF%E5%BC%80%E6%BA%90%E7%9A%84%E5%89%8D%E7%AB%AF%E5%B7%A5%E4%BD%9C%E6%B5%81%E5%92%8C%E8%A7%84%E8%8C%83%E5%B7%A5%E5%85%B7)。

##### 技术栈

-   React
-   redux
-   less
-   axios
-   webpack4
    ...

##### 让你心动的地方

相对于官方脚手架，我们不仅仅是初始化一个项目，更多的是满足实际开发场景。

-   支持多页项目
-   页面适配
-   内联语法
-   构建优化
-   丰富的默认配置文件

### 架构设计

##### 目录结构

```
generator-ivweb-app
├── README.md
├── package.json
├── .babelrc
├── .editorconfig
├── .eslintrc.js
├── .gitattributes
├── feflow.json
├── config.json
├── node_modules
├── dist
└── src
    ├── assets
    ├── middleware
    ├── modules
    └── pages
        ├── otherPage
        └── indexPage
            ├── index.html
            ├── index.js
            ├── index.less
            ├── index.js
            ├── init.js
            ├── pageComponent.js
            ├── actions
            ├── assets
            ├── components
            └── reducers
```

-   开发和构建

这里我们默认都是 src 为开发目录，dist 为打包目录，当然你可以在 feflow.json 中配置为其他输出目录。

```
{
    "builderOptions": {
        "outDir": "dist" //输出目录名称
    }
}
```

-   多页目录

多页放在 pages 目录下，每个页面一个单独文件夹，访问的路径如下：

```
https://xxx.xxx.xxx/xxx/indexPage.html
https://xxx.xxx.xxx/xxx/otherPage.html
```

##### 页面结构化继承（多页设计）

正常来说，多页应用只需要有自己的入口就可以，在入口文件我们可能需要做这么几件事

-   注入 store
-   设置全局配置
-   页面监控
-   将组件渲染到页面
    ...

上面只是列举了一些基本的东西，当然还会有很多，甚至是一些跟业务相关的基本信息，而这些东西对于一个工程下的多个页面来可能都是一样的，不仅操作不方便，维护也很麻烦。这里我们提出一个概念：**页面结构化继承**。

继承大家都很熟悉，而 react 是可以用 function/class 方式来写组件的，我们在用 class 方式写组件就是继承自 React.Component，那么对于这些公有东西我们也可以封装成一个组件，通过继承的方式来获取这些能力。

![](https://upload-images.jianshu.io/upload_images/454462-5faf87ed4719e7a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/720)

![创建BasePage](https://upload-images.jianshu.io/upload_images/454462-8c4d26422f1d822e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/360)

![继承basePage](https://upload-images.jianshu.io/upload_images/454462-927cb7093d31c5d8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/360)

此处只写了对于多页的应用，对于复杂的单页应用同样是适用的。

##### 组件划分

通常我们在开发一个单页应用都会抽离一些公共组件，比如 title-bar

![image.png](https://upload-images.jianshu.io/upload_images/454462-692ff9bcc6559f73.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/256)

---

![image.png](https://upload-images.jianshu.io/upload_images/454462-e3fc7ca332da4b7d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/256)

如果这里是个多页应用，同样是可以公用的，因此对于多页应用来说，组件应该是这样的结构：

![image.png](https://upload-images.jianshu.io/upload_images/454462-f51b470f0d69895e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/720)

##### 状态管理

每个页面的状态管理同样是可以抽离一些公共 action 和 reducer，比如登录逻辑

![image.png](https://upload-images.jianshu.io/upload_images/454462-18c7ff32478ab060.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/720)

##### 模块化

鉴于脚手架默认是多页项目，我们把公共模块放到外层目录，减少跟每个页面的耦合。

```
modules
├── common //公用js模块
├── components //公用组件
├── globalStore //store配置，包含中间件注入
└── page //页面结构继承组件
```

##### 构建

这里使用 feflow 的构建器：[builder-webpack4](https://github.com/feflow/builder-webpack4)，当然这个东西同样是可以配置的，甚至可以根据我们的官方构建器写自己的构建器。

##### 项目配置

脚手架是基于 feflow 的，因此 feflow.json 文件是 feflow 项目的基础配置，包含了一些构建选项，比如输出目录，域名，webpack 相关等。

```
{
    "builderType": "builder-webpack4", //构建器类型
    "builderOptions": {
        "product": "", //产品民称
        "outDir": "dist", //构建输出目录
        "minifyHTML": true,
        "minifyCSS": true,
        "minifyJS": true,
        "inlineCSS": true,
        "usePx2rem": true, //是否转化px
        "remUnit": 37.5, //rem基准
        "remPrecision": 6,
        "inject": true,
        "useTreeShaking": true,
        "port": 8001, //项目端口
        "hot": true,
        "externals": [
            {
                "module": "react",
                "entry": "//11.url.cn/now/lib/16.2.0/react.min.js?_bid=3123",
                "global": "React"
            },
            {
                "module": "react-dom",
                "entry": "//11.url.cn/now/lib/16.2.0/react-dom.min.js?_bid=3123",
                "global": "ReactDOM"
            }
        ]
    }
}
```

##### 其他

项目默认是不显示构建相关配置的，一方面，我们有暴露一些基础配置项，另一方面避免多人协作开发更改配置问题，如果你想查看或修改可以使用命令展示(不建议修改配置)

```
feflow eject
```

## 优势

##### 多页支持

generator-ivweb 先天支持多页应用，而不用我们再去 webpack 中配置，在开发中只需要在 pages 下创建多个目录即可。

##### 页面适配

项目默认接入 rem 适配，会自动把 px 转成 rem，当然，如果某些地方不想被转化，有两种方式：

-   修改 px 写法
    ```
    height: 300Px;
    ```
-   feflow.json 中设置 usePx2rem 为 false

3. 打包优化

generator-ivweb 默认使用 builder-webpack4 构建，webpack4 中所做的一些优化，比如 treeShaking 都有用到。并且这里我们默认给 react 和 react-dom 加了外链 cdn(使用我们自己的 cdn，如果不放心可以改为自己的 cdn)。

4. 内联语法

    比如一些 meta 标签，页面 loading 等，都可以通过内联方式引入

    ```
    <!--inline[/assets/inline/meta.html]-->
    ```

    还有一些 js 文件我们可能也需要内联到 html 中提前加载

    ```
    <script src="amfe-flexible/index.js?__inline"></script>
    ```

5. 多样化配置文件

    项目默认集成了 gitignore、eslint、editorconfig 等配置，为仓库管理和开发提供了便捷。

```
├── .babelrc
├── .editorconfig
├── .eslintrc.js
├── .gitattributes
```

### 如何使用

```sh
# 安装feflow
npm install feflow-cli -g
# 安装脚手架
feflow install generator-ivweb
# 启动项目
feflow init
```

![](https://pub.idqqimg.com/3321a46b34c249ba945fb73749026bbb.svg)

## 未来规划

1. 添加测试用例，提高稳定性。
2. 完善脚手架内容，提供更高效的内容

## 项目地址

https://github.com/feflow/generator-ivweb， 欢迎大家提 issue 以便于我们改进。
