# Customed Starkit

Feflow v0.16.0 version redesigned its ecosystem, removing the concepts of builder, deployer, etc., and integrated it into a suite. It integrates the project's construction, deployment, code inspection and other functions, and the package will follow the project and be stored in the project's node_modules.

Here we focus on explaining how to develop a Feflow kit, taking feflow-devkit-ivweb as an example

## [#](#配置-devkit-json-文件) Configure `devkit.json` file

First, we need to create an empty folder named `feflow-devkit-ivweb`, and create a new `devkit.json` or `devkit.js` file under the folder, take `devkit.json` as an example, configure as follows:

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


## [#](#创建命令对应的实现文件) Create the implementation file corresponding to the command

After configuring the `devkit.json` file, the next step is to implement the scripts corresponding to the commands defined in it one by one. Taking the `dev` command as an example, we can know from the above script address that we need to create a `lib` folder under `feflow-devkit-miniprogram`, then create a `command` folder under the `lib` folder, and finally The `command` file is added to create a `dev.js` file. Of course, the file path can be customized, so the created file is created according to the path defined by yourself.

The `dev.js` file needs to expose a function to the outside. When `fef dev` is executed, the exposed function is actually executed, as shown below:

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

What the specific built script code looks like depends on different build requirements, so we won't continue to show it here.

## [#](#调试和发布) Debug and release

After the kit is developed, it is time to start debugging. This is a bit different from the debugging of the previous builders. **You need to put the kit npm link in the node\_modules of the project, not in the node\_modules of ~/.feflow** , In the project, declare the suite command corresponding to the command of the project through the .feflowrc.json file, the format is as follows (take the file in .js format as an example):

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



After debugging OK, it can be released.

Code address: [feflow-devkit-ivweb](https://github.com/feflow/feflow-devkit-ivweb.git)