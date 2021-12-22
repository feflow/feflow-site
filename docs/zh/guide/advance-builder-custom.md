# 自定义套件

Feflow v0.16.0 版本重新设计了它的生态体系，去掉了构建器、部署器等概念，整合为一个套件。它将项目的构建、部署、代码检查等功能都整合在一起，并且套件会跟随项目一起走，存储在项目的 node\_modules 里。

这里我们重点对如何开发一个 Feflow 套件进行讲解，以 feflow-devkit-ivweb 为例。

## [#](#配置-devkit-json-文件) 配置 `devkit.json` 文件

首先，我们需要创建一个空文件夹，命名为 `feflow-devkit-ivweb`，并且在文件夹下新建一个 `devkit.json` 或者 `devkit.js` 文件，以 `devkit.json` 为例，配置如下：

```json
{
  // 必须，builder 包含各种构建命令的集合
  "builders": {
    // 开发者自己定义，dev 意味着套件包含 dev 命令，一般本地开发命令约定俗成就是 dev
    "dev": {
      // dev 命令对应的真正实现脚本
      "implementation": "./lib/commands/dev.js",
      // dev 的描述，会在 fef -h 的时候显示出来
      "description": "Mini program development mode.",
      // dev 的子命令
      "optionsDescription": {
        // 简单的命令描述
        "p": "选择端口构建",
        // 支持别名
        "dist": {
          "description": "构建产物目录",
          "alias": "d"
        }
      }
    },
    // 套件 build 命令的配置，一般构建部署时的构建就是用 build 命令
    "build": {
      "implementation": "./lib/commands/build.js",
      "description": "Build a mini program bundle."
    }
    // ...... 其他命令
  }
}

```


## [#](#创建命令对应的实现文件) 创建命令对应的实现文件

配置好了 `devkit.json` 文件，接下来就是一一实现里面定义的各个命令对应的脚本。以 `dev` 命令为例，通过上述脚本地址可以知道我们需要在 `feflow-devkit-miniprogram` 下创建一个 `lib` 文件夹，然后在 `lib` 文件夹下创建 `command` 文件夹，最后在 `command` 文件加下创建 `dev.js` 文件。当然，文件路径可以自定义，这样的创建文件就按照自己定义的路径去创建。

`dev.js` 文件需要向外部暴露一个函数，当执行 `fef dev` 的时候其实就是执行暴露出来的函数，如下所示：

```js

// main.ts
import webpack from 'webpack';
import Builder from './builder';
import Config from './config';
import Server from './server';
import { postMessage, BuilderType } from './util';
export interface BaseConfig {
    [propName: string]: any;
}

function builderWebpack(cmd: string) {
    const builderOptions = Config.getBuildConfig(cmd);
    const devConfig: BaseConfig = Builder.createDevConfig(builderOptions);
    const prodConfig: BaseConfig = Builder.createProdConfig(builderOptions);
    if (cmd === 'dev') {
        Server(devConfig);
    } else if (cmd === 'build') {
        webpack(prodConfig, (err: any, stats: any) => {
            if (err) {
                console.log(err);
                postMessage.error(BuilderType.build, err);
                process.exit(2);
            }

            postMessage.success(BuilderType.build);

            console.log(
                stats &&
                    stats.toString({
                        chunks: false,
                        colors: true,
                        children: false,
                    })
            );
        });
    }
}
export default builderWebpack;
module.exports = exports.default;

// dev.ts
import Main from '../index';

function run(){
    Main('dev');
}

module.exports = run;
export default run;

```



具体构建的脚本代码是什么样子，根据不同的构建需求决定，我们这里就不继续展示了。

## [#](#调试和发布) 调试和发布

开发好了套件，就要开始调试了，这里和以前构建器的调试有点区别，**你需要将套件 npm link 在项目的 node\_modules 里面，而不是 ~/.fef 的 node\_modules 里面**，项目里通过 `.feflowrc.json` / `.feflowrc.js` 文件来声明项目的命令所对应的套件命令，格式如下（以 .js 格式的文件为例）：

```js
module.exports = {
    // 必须
    devkit: {
        // 必须，代表着 feflow 的命令
        commands: {
            // 推荐，代表着 fef dev 的命令
            dev: {
                // 必须，代表着 fef dev 命令对应执行的套件命令，这里表示使用套件 @tencent/feflow-devkit-miniprogram 的 dev 命令，配置格式为 `<套件>:<命令>`
                builder: "@tencent/feflow-devkit-ivweb-example:dev",
                // 可选，如果上述套件命令支持一些配置，可以写在这里
                options: {}
            },
            // 推荐，代表着 fef build 的命令
            build: {
                // 必须，代表着 fef build 命令对应执行的套件命令，这里表示使用套件 @tencent/feflow-devkit-miniprogram 的 build 命令
                "builder": "@tencent/feflow-devkit-ivweb-example:build",
                // 可选，如果上述套件命令支持一些配置，可以写在这里
                "options": {}
            }
        }
    }
}

```



调试 OK 后就可以发布了。


代码地址: [feflow-devkit-ivweb](https://github.com/feflow/feflow-devkit-ivweb.git)