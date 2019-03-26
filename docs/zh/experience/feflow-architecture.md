---
layout: Blog
date: 2019/03/26
description: Feflow 是一个前端集成开发环境，最新版本是 v0.14.1，托管在 Github 上。目前已经在 NOW 直播、花样直播、花样交友、手 Q 附近、群视频、群送礼、回音等业务广泛使用。有 60+ WEB/IOS/Andriod 稳定用户，累计投入生产项目达到 200+。
---

# Feflow-架构篇

Feflow 是一个前端集成开发环境，最新版本是 v0.14.1，托管在 Github 上：[feflow](https://github.com/feflow/feflow)。目前已经在 NOW 直播、花样直播、花样交友、手 Q 附近、群视频、群送礼、回音等业务广泛使用。有 60+ WEB/IOS/Andriod 稳定用户，累计投入生产项目达到 200+。

本文将会详细介绍 Feflow 的技术架构和实现原理。

## 1. 起源

Feflow 于 2017 年 3 月份投入开发，最初只是为了解决项目创建不智能的问题。后面逐步解决了团队的构建、规范、CI 和自动化问题，最终随着功能的不断完善而成为团队基础的前端集成开发环境。

开发 Feflow 并不是为了重复造轮子，最核心的目的是打造一体化的工作流程和一致性的团队开发方式。它基于社区已有的完备工具链体系，取众家之所长。

下图描述了社区工具链生态：

![](https://qpic.url.cn/feeds_pic/ajNVdqHZLLDibkFicGKKu78lJUnQopphrJNPnKJG4Xx7bwEkr4okqakQ/)

## 2. 设计思路

Feflow 借鉴了 Pipline 的思想，将日常的研发工作划分为：初始化、本地开发、打包构建、检查、发布上线五个步骤。分别对应 init、dev、build、test 和 deploy 五个基本命令。

除了服务好基本的开发工作流和规范，Feflow 提供了易于扩展的插件机制，用于打造团队统一的工具链生态。

![](https://qpic.url.cn/feeds_pic/ajNVdqHZLLAZuO7FTJMGZkRTRySZEHKr4KicKeialLLOmxjdstpB5unA/)

## 3. 整体架构

下图介绍了 Feflow 的系统架构，从下到上分为 4 层。分别是控制台、参数解析器、Feflow 内核、插件层。对应的功能分别是：

- 控制台：开发者和 Feflow 的命令交互层，开发者在控制台里面输入一系列的命令。
- 参数解析器：负责解析开发者输入的命令信息，转换成一个 Object 对象。然后将对象传递给 Feflow 内核。
- 内核层：一方面提供 Feflow 的上下文(包括版本信息、Feflow 配置信息、日志模块和一些帮助函数)、插件注册和加载机制、内核和插件的更新机制；另一方面提供基础的工作流命令。
- 插件层：主要是官方插件和开发者编写的插件。

![](https://qpic.url.cn/feeds_pic/ajNVdqHZLLDsuocibo3TZ3GE5TMmVywG0lRyiayfI8D3icgW8FrkFKFOQ/)

## 4. 插件机制

插件是为了扩展子命令而设计的，Feflow 插件需要以 `feflow-plugin-*` 开头，插件开发完成需要发布到 npm 或者 tnpm。

### 4.1 插件上下文

在 Feflow 插件中，可以直接通过全局变量 `feflow` 来获取上下文。这个实现是借助 Node.js 提供的 module 和 vm 模块来实现全局变量的注入。从而能够访问上下文的各种属性和方法，包括：

- Feflow 配置：版本信息、Home 目录路径、插件路径等
- 上下文函数：命令注册对象、日志对象
- 帮助函数

部分实现源码：

```javascript
  /**
   * Load a plugin with vm module and inject feflow variable,
   * feflow is an instance and has context environment.
   *
   * @param path      {String}    Plugin path
   * @param callback  {Function}  Callback
   */
  loadPlugin(path, callback) {
    const self = this;

    return fs.readFile(path).then((script) => {

      const module = new Module(path);
      module.filename = path;
      module.paths = Module._nodeModulePaths(path);

      function require(path) {
        return module.require(path);
      }

      require.resolve = function (request) {
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

### 4.2 命令注册

Feflow 上下文提供了 cmd 对象，所有的命令都需要通过 cmd 进行注册，部分实现源码：

```javascript
  /**
   * Register a command, unique entrance for command registry.
   *
   * @param name   {String}   command name
   * @param desc   {String}   command description
   * @param options
   * @param fn     {Function} command callback
   */
  register(name, desc, options, fn) {
    if (!name) throw new TypeError('name is required');

    if (!fn) {
      if (options) {
        if (typeof options === 'function') {
          fn = options;

          if (typeof desc === 'object') { // name, options, fn
            options = desc;
            desc = '';
          } else { // name, desc, fn
            options = {};
          }
        } else {
          throw new TypeError('fn must be a function');
        }
      } else {
        // name, fn
        if (typeof desc === 'function') {
          fn = desc;
          options = {};
          desc = '';
        } else {
          throw new TypeError('fn must be a function');
        }
      }
    }

    if (fn.length > 1) {
      fn = Promise.promisify(fn);
    } else {
      fn = Promise.method(fn);
    }

    const c = this.store[name.toLowerCase()] = fn;
    c.options = options;
    c.desc = desc;

    this.alias = abbrev(Object.keys(this.store));
  }
```

### 4.3 插件安装

插件开发好并且发布到 npm 或者 tnpm 后，接下来就是插件安装使用了。通过以下命令安装一个插件：

```sh
$ feflow install <package>
```

Feflow 会将插件安装在 `~/.feflow/node_modules` 下。

## 5. 更新机制

对于软件系统而言，都会存在发布新版本增加 Feature 或者修复 Bug 的情况。比如大家玩王者荣耀或者吃鸡游戏时刚刚进入启动界面会下载更新包，部分大版本会强制升级等等。

### 5.1 更新检查流程

Feflow 也提供了增量更新机制，每次初始化 Feflow 时都会将本地的版本和远程版本进行比较，如果本地版本和远程版本不兼容，则会强制帮开发者进行增量更新。

![](https://qpic.url.cn/feeds_pic/ajNVdqHZLLD3Ol5cpaNrV4zicpfbqCBcticlPHY6KwplgW8d8K8xakKw/)

### 5.2 实现原理

版本检查机制主要是借助 npm 的 registry 机制来实现的。如果你有使用过 Feflow 或者它的插件，你会发现相关 npm 包的 `package.json` 里面有一个自定义字段：

```sh
  "configs": {
    "compatibleVersion": ">=0.14.0"
  },
  ...
```

`compatibleVersion`表示和即将发布版本兼容的用户使用版本，此处遵从 semver 版本校验规范。如果是兼容的，则不会帮开发者更新本地插件，不兼容则会强制更新。

### 5.3 实际效果

更新机制最大的优势是：统一管控能力，将最新的 Feature 同步给开发者，同时可以保证大家使用的版本没有致命 Bug。

下图是创建项目的效果（可以保证团队每次创建新项目使用的是最新的脚手架）：
![](https://qpic.url.cn/feeds_pic/Q3auHgzwzM7RACqronCTACiaV4cBOqjIkhIs8FhOqFonqXrhvkYXZTg/)

## 6. 日志

Feflow 上下文提供了 log 对象，通过这个对象可以让控制台里面显示出规范的日志输出。

### 6.1 日志分级

```javascript
const log = feflow.log;
log.info(); // 提示日志，控制台中显示绿色
log.debug(); // 调试日志,  命令行增加--debug可以开启，控制台中显示灰色
log.warn(); // 警告日志，控制台中显示黄色背景
log.error(); // 错误日志，控制台中显示红色
log.fatal(); // 致命错误日志，，控制台中显示红色
```

### 6.2 日志分片

如果使用了 Feflow 上下文提供了 log 对象进行日志输出，那么这些日志信息会写入到 `~/.feflow/logs`本地文件系统里面。这便于后续问题的排查及错误上报等。

Feflow 提供了日志分片的能力，将日志按天进行输出。
![](https://qpic.url.cn/feeds_pic/ajNVdqHZLLCgE6SUBtibasPFVlunUyfGcOCwbCtDF7ESriarcqxF0a9g/)

## Issues

反馈或建议地址：[issues](https://github.com/feflow/feflow/issues)，如果您的业务希望接入 Feflow，可以联系我。
