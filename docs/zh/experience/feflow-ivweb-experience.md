---
layout: Blog
date: 2019/03/26
description: 本篇文章主要介绍腾讯 IVWEB 团队从 0 到 1 在工程化的思考和实践。feflow 的全称是 Front-end flow（前端工作流），致力于提升研发效率和规范的工程化解决方案。愿景是通过 feflow，可以使项目创建、开发、构建、规范检查到最终项目上线的整个过程更加自动化和标准化。
---

# 腾讯 IVWEB 前端工程化工具 feflow 思考与实践

![](https://qpic.url.cn/feeds_pic/eMJXws7FFlauUALSWA3S7iceia5xM4HrEfUve3X4PJyAw/)

本篇文章主要介绍[腾讯 IVWEB 团队](https://ivweb.io/)从 0 到 1 在工程化的思考和实践。[feflow](https://github.com/feflow/feflow)的全称是 Front-end flow（前端工作流），致力于提升研发效率和规范的工程化解决方案。愿景是通过 feflow，可以使项目创建、开发、构建、规范检查到最终项目上线的整个过程更加自动化和标准化。

### 要解决的问题

-   项目的目录结构按约定生成
-   团队有一套开发规范进行约束
-   支持多种类型的构建，包括 Fis 构建和 webpack 构建
-   团队内部的代码贡献统计、离线包内置 App 等

为了解决上述问题，我们于 17 年 2 月底开始投入工程化 feflow 工具的开发和相关规范的制定，目前已经研发出了 feflow 的 [CLI](https://github.com/feflow/feflow) 版本，后续会推出 GUI 版本。

### 架构设计

![](https://qpic.url.cn/feeds_pic/Fia6FID6YXfJiaVVicpFaNg2GfB6KzsNIibpxK3YdDINCGY/)

为了让 feflow 的具有高可扩展性，我们设计了 4 层结构，分别是：插件生态、内核层、参数解析器和控制台。除了贯穿整个开发工作流的基础命令选择通过内部插件内置在 CLI 的 Core 里面，其它非必要命令统一通过插件机制进行扩展。

另一方面，为了使得 feflow 能够适用多种类型的项目。我们开发了多种类型的业务脚手架，如：活动模板、App H5 模板、RN 模板和业务组件模板。

### 执行过程

当用户在控制台里面输入某个命令。首先会通过 CLI 的参数解析器，将这个命令解析成一个 object 对象，然后传递给 CLI 的内核。所有的命令都是通过内核上下文提供的 register 函数 进行注册的，一方面内核自身会读取内置插件 注册的基础命令，另一方面，内核会读取本地已经安装的外部插件注册的命令。如果找到用户输入的命令则开始执行命令对应的回调函数。

### 基础命令设计

```
# 初始化项目
$ feflow init

# 本地开发
$ feflow dev

# 代码质量检查
$ feflow lint

# 打包构建
$ feflow build

# 代码发布
$ feflow publish

# 安装插件、脚手架等
$ feflow install package

# 配置本地客户端，如: npm 的源和 proxy
$ feflow config <key> <value>
```

前面提到，CLI 的命令包含两部分，分别是内置在内核里的基础命令和外部插件提供的命令。那么外部插件要如何设计呢？

### 插件机制设计

#### 插件实现原理

这里有一个非常巧妙的设计，通过使用 node 提供的 module 和 vm 模块，可以通注入 feflow 全局变量来访问到 cli 的实例。从而能够访问 cli 上的各种属性，比如 config, log 和一些 helper 等。

```
 loadPlugin(path, callback) {
    const self = this;

    return fs.readFile(path).then((script) => {

      const module = new Module(path);
      module.filename = path;
      module.paths = Module._nodeModulePaths(path);

      function require(path) {
          return module.require(path);
      }

      require.resolve = function(request) {
          return Module._resolveFilename(request, module);
      };

      require.main = process.mainModule;
      require.extensions = Module._extensions;
      require.cache = Module._cache;

      // Inject feflow variable
      script = '(function(exports, require, module, __filename, __dirname, feflow){' +
          script + '});';

      const fn = vm.runInThisContext(script, path);

      return fn(module.exports, require, module, path, pathFn.dirname(path), self);
      }).asCallback(callback);
  }
```

#### 命令注册：

命令需要以 feflow.cmd.register 进行注册，比如：

```
feflow.cmd.register('deps', 'Config ivweb dependencies', function(args) {
    console.log(args);
    // Plugin logic here.
});
```

说明：

-   register 有 3 个参数，第一个是子命令名称，第二个是命令描述说明信息，第三个是对应的子命令执行逻辑函数。
-   feflow 会将命令行参数 args 解析成 Object 对象，传递给插件处理函数

#### 配置

可以通过 feflow.version 获取当前 feflow 的版本，feflow.baseDir 获取 feflow 跟目录（在用户目录下的.feflow），通过 feflow.pluginDir 获取插件目录

#### 日志

通过 feflow.log 来进行相关命令行日志输出

```
const log = feflow.log;
log.info()    // 提示日志，控制台中显示绿色
log.debug()   // 调试日志,  命令行增加--debug可以开启，控制台中显示灰色
log.warn()    // 警告日志，控制台中显示黄色背景
log.error()   // 错误日志，控制台中显示红色
log.fatal()   // 致命错误日志，，控制台中显示红色
```

#### 安装

插件开发完成后，可以通过 feflow 提供的 install 命令安装插件。安装的插件会放置在本地客户端 ~/.feflow/node_modules 文件夹下，并且写入到 ~/.feflow/package.json 中

```
$ feflow install feflow-plugin-xxx   // 安装某个插件
```

之后每次运行命令时，便会从本地加载插件所注册的命令

### 全量更新和增量更新

当 CLI 发布了一个新的版本，可能我们会废弃掉某些功能或者提供了新功能。这个时候如果用户依然使用的是旧版本，由于某些服务已经废弃掉了则会报错。在这种新旧版本不兼容的情况下，如何强制用户进行 CLI 的升级呢？需要在运行命令之前检查本地的 CLI 是否和远程提供的新版本是否兼容。在新旧版本不兼容时，会强制全量更新。如何判断当前用户安装的本地版本和远程最新版本是否兼容呢？

这里非常巧妙的运用了一下 npm 的 registry 机制，每次发布新版本，我们会在 package.json 里面新增一个自定义字段 compatibleVersion，它的值是一个 semver 的版本号。本地检查时，会读取本地已经安装的版本和远程最新的版本进行比较，看看是否满足 compatibleVersion 的要求。如果不满足，则会自动运行 `npm install feflow-cli` 到最新的版本。

```
 "configs": {
    "compatibleVersion": ">=0.13.0"
 },
```

对于插件，采取的是增量更新机制。每个发布到 npm 上的插件的 package.json 中同样会有上面的这个字段，对于本地安装的不兼容的插件列表，会采取增量更新。

### 多类型脚手架的架构设计

项目拷贝存在的问题显而易见，大致有以下三个方面：

-   容易出错；一旦某个关键文件拷贝丢失或者错误，很可能需要耗费半天到一天的时间排查环境问题。
-   不同场景下对目录结构要求不同；平时开发过程中，工程通常会分为运营活动、Hybrid 业务、入口级别的项目（对性能和体验有极致和苛刻的要求）。需要基于 RN 或者 Node.js 的首屏直出，还有常用的业务组件等的开发。
-   新的 Feature 和 BugFix 难以同步；某个同学开发过程中增加的新方法或者解决的 bug 很难传递给其它同学并且沉淀成经验积累下来。

社区里面提供了完美的 Yeoman 解决方案，它是为了自动化项目的创建而生。Yeoman 创建项目包括以下几个阶段：

-   initializing: 初始化一些状态之类的，通常是和用户输入的 options 或者 arguments 打交道
-   prompting: 和用户交互的时候（命令行问答之类的）调用
-   configuring: 保存配置文件（如 .babelrc 等）
-   writing: 生成模板文件
-   install: 安装依赖
-   end: 结束部分，初始代码自动提交

我们只需要继承 Yeoman 的 Generator 类做模板定制化，基于 Yeoman 的脚手架设计思路应该如下图所示：
![](https://qpic.url.cn/feeds_pic/Q3auHgzwzM5OeF65JG7fNeUbvwzbQ7wEjX4Bzs5TBJjgyZ9r8F7gZA/)

当开发者输入 feflow init 命令时，开发者会告诉 CLI 需要创建哪一种类型的项目，CLI 收到命令后。从本地已经安装的 Yeoman 脚手架里面选择某种类型的模板。然后，CLI 会调用 Gitlab API 在远程创建仓库并且授予开发者 master 权限。接下来，会根据实际业务场景需要，自动化申请一些打点信息，常见的如离线包 id，监控告警 id 等等。之后，在本地目录生成代码并且安装项目依赖的 npm 包，最后将本次初始化生成的所有代码自动提交到远程 Git 仓库。

### 多类型主流构建支持

为了让 feflow 支持多种类型的构建环境，比如 Fis3 和 webpack，或者前不久刚推出的号称零配置成本的 Parcel 构建。在每个项目的跟目录会放置一份配置文件，名称为 feflow.json。它的配置可能是这样的：

```
{
    "builderType": "builder-webpack3",
    "builderOptions": {
        "moduleName": "mobile",
        "bizName": "category",
        "minifyHTML": true,
        "minifyCSS": true,
        "minifyJS": true,
        "usePx2rem": true,
        "remUnit": 100,
        "remPrecision": 8,
        "inject": true,
        "port": 8001
    }
}
```

builderType 为构建的 npm 包，builderOptions 为构建的参数配置。

### 最后

腾讯 IVWEB 团队的工程化解决方案 feflow 已经开源：Github 主页：https://github.com/feflow/feflow

如果对您的团队或者项目有帮助，请给个 Star 支持一下哈～
