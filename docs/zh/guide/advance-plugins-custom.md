# 自定义插件

Feflow 之所以强大离不开它的插件设计，你可以把 Feflow 看成是一个核心和一大堆插件组成的生态。

## 开发一个 Feflow 插件

**开发一个 Feflow 插件非常简单，并且任何程序都能成为 Feflow 插件。**

开发一个 Feflow 插件意味着给 Feflow 增加命令， 例如你可以给 Feflow 增加一个 `add` 命令，让 Feflow 实现一个加法运算：

```sh
fef add 1 2 3
# 输出 6
```

接下来，让我们就用这个例子来讲解一下如何开发一个 Feflow 插件。

## 创建项目

创建一个名为 `feflow-plugin-example` 的文件夹，并用 `npm init` 命令将它初始化。

**注意，所有 Feflow 插件的项目目录名都必须以 `feflow-plugin-` 开头，并且项目内的 `package.json` 文件中的 `name` 字段必须和项目目录名保持一致。**

## 编写逻辑

新建一个 `index.js` 文件， 实现加法运算逻辑，这时候暂时先无需考虑和 Feflow 插件相关的事情，只需要专注于你的逻辑：

```js
/**
 * 加法运算器
 * @param  {Array} args 一些需要累加的数字
 * @return {number} 累加的和
 */
function add(args) {
  const sum = args.reduce((sum, item) => {
    return sum + item;
  }, 0);

  console.log(sum);
  return sum;
}
```

## 注册命令

加法逻辑写好了，现在需要实现的就是将这个程序变成 Feflow 插件，即注册一个 `add` 命令到 Feflow：

```js
const calculate = require('./calculate');

module.exports = context => {
  const calculator = calculate(context);
  const { args } = context;

  // 注册一个 add 命令
  context.commander.register('add', '加法运算器', () => {
    // args 是 add 后面的参数，已被 minimist 库解析
    // 例如 `fef add 1 2 3`，args 就是 { _: [1, 2, 3] }，
    // 再比如 `fef add -x 1 -y 2 --z-value 3 4 5 6`，args 就是 { _: [ 4, 5, 6 ], x: 1, y: 2, 'z-value': 3 }
    // 调用主要的逻辑
    return calculator.add(args._);
  });

  // 注册乘、除、减三个命令
  context.commander.register('multiply', '乘法运算器', () => calculator.multiply(args._));
  context.commander.register('minus', '减法运算器', () => calculator.minus(args._));
  context.commander.register('divide', '除法运算器', () => calculator.divide(args._));
};
```

register 的函数签名

```js
.register(String command, String description, Function fn, Object|Array|undefined helpDescription) => null
```

- **command**, 插件需要注册的命令，例如你想实现一个加法插件，那么这里需要填入'add'。该命令最好可以从你插件名字中得以体现，列入上例的加法运算插件`feflow-plugin-add`或者除法运算插件`feflow-plugin-divide`
- **description**, 关于该插件的描述，会在`fef --help`时展示
- **fn**，插件的入口函数
- **helpDescription**，插件选项或者子命令的描述，可以传入 Object 或者 Array，具体使用参考下文**插件子命令参数**

另外，开发过程中还需要注意的是上下文提供的 API 有所精简和变化，目前 `context` 对象有以下几个属性：

```js
{
  root: '/Users/<username>/.fef', // .fef 主目录的位置
  rootPkg: '/Users/<username>/.fef/package.json',
  args: { _: [ 1, 2 ] }, // 参数
  version: '0.16.0-alpha.7',
  config: { packageManager: 'tnpm' }, // feflow 配置
  commander: Commander, // 命令管理器
  logger: Logger // 日志模块
}
```

## 插件调试

截至目前，你已经完成了一个插件，完整的代码可参考[这里](https://github.com/feflow/feflow-plugin-example/blob/master/lib/index.js)。 你可能迫不及待想试试。别急，让我们一步一步来。

1. 运行 `npm link` 将插件项目链接到 NPM 全局。
1. 运行 `cd ~/.fef` 进入到 Feflow 主目录下。
1. 运行 `npm link feflow-plugin-example` 将插件安装在 Feflow 主目录下。
1. 编辑 `~/.fef/package.json` 文件（可用 `vi ~/.fef/package.json` 编辑），在 `dependencies` 字段中添加一行 `"feflow-plugin-example": "1.0.0"`。
1. 运行 `fef add 1 2 3` 启用插件。

## 插件发布

插件开发完毕后，接下来就可以发布插件了， 你可以发布到 NPM 上，也可以发布到私有 NPM 仓库里。如果发布到私有仓库，可能需要配置一下 Feflow  下载包的 `register` 和 `proxy`，配置方式参考[插件](./base-plugins-inner#全局配置插件)。

发布完之后，你就可以通过  `fef install` 命令安装插件。

## 插件子命令

如果你的插件提供了多个可选命令，`register`也开放了第四个参数，用于描述插件的命令。

传入对象：

```js
context.commander.register('devops', 'Automated Testing Plugin', () => {}, {
  // 简单的命令描述
  force: '强制更新端对端测试模板',
  // 支持别名
  soft: {
    description: '允许在force时保留Devops路径下不冲突的文件',
    alias: 's',
  },
});
```

传入数组时的格式可以参考[command-line-usage](https://github.com/75lb/command-line-usage)的用法：

```js
context.commander.register('devops', 'Automated Testing Plugin', () => {}, [
  {
    header: 'A typical app',
    content: 'Generates something {italic very} important.',
  },
  {
    header: 'Command',
    summary: ['init, generate Devops file'],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'input',
        typeLabel: '{underline file}',
        description: 'The input to process.',
      },
      {
        name: 'help',
        description: 'Print this usage guide.',
      },
    ],
  },
]);
```

只需要在插件命令后跟上`-h`或者`--help`即可

![插件帮助#960px](https://qpic.url.cn/feeds_pic/Q3auHgzwzM6uAzQMicT8RrpML8C5JBJpDBDJUhpKztUjicjk5Wk2ZTvg/)

当然你也可以自定义插件的 Header：
![自定义插件Header#960px](https://qpic.url.cn/feeds_pic/Q3auHgzwzM6SKsSymE6xLic4FaablRUxN55dtod7KB20c26sgojLtVw/)

## 其他注意事项

现在 feflow 插件越来越多，难免会出现重复的命令，在数据收集时就会混淆。
这里的插件第五个参数就是为了解决这个问题而存在的，它在数据收集时提供了该插件的来源，也就是你的包名，推荐填写上，避免数据采集不准确的问题
