# Introduction

Welcome to Feflow, this document will help you get started quickly. And if you have any problems during use, please send feedback on [GitHub](https://github.com/feflow/feflow/issues).

![feflow](https://pub.idqqimg.com/3cb9b240fbbc4a5d946ceb96325be36f.svg)

## What is Feflow

Feflow (pronounced /ˈfefləʊ/) is a **front-end flow and rule tool** to improve engineering efficiency., and is hosted on Github: [feflow](https://github.com/feflow/feflow). At present, it has been used in many application, such as Now, Huayang Live, Huayang Friends, Mobile QQ Near Hand, Group Video, Group Gift, Huiyin, Tencent Myapp, Penguins and etc. With 80+ WEB/IOS/Andriod stable users, the cumulative production project reached 240+.

Feflow refers to the thinking of Pipeline and divides work into five steps: init, develop, build, test, deploy. And corresponding to five basic commands: init, dev, build, test and deploy.

In addition to serving basic development workflows and specifications, Feflow provides an easy-to-expand plug-in mechanism for creating a team-wide toolchain ecosystem.

![](https://qpic.url.cn/feeds_pic/ajNVdqHZLLD5vbArj0iaIkMLnGU3xPohibwRHibiaR3cibuy6RKYgHNCmFg/)

## Concept

Feflow only provides a CLI and kernel. The CLI is responsible for interacting with the command line terminal. The kernel provides update mechanism, plugin mechanism and standardized log output capability. Feflow does not have any built-in logic related to the business.

So, if you want to use Feflow in a team, you need to understand the following concepts:

- [Scaffold](#Scaffold)
- [Starkit](#Starkit)
- [Plugin](#Plugin)
- [Development-specification](#Development-specification)

### Scaffold

In many front-end teams, there is a problem that the project development is not intelligent**. Many developers develop new projects based on the original project copy. This results in different project directory structures developed by different people in a team. It is time-consuming and labor-intensive to transfer and maintain subsequent projects.

To solve this problem, Feflow introduced the community's mainstream scaffolding to initialize the project. The scaffold of Feflow is based on [Yeoman](https://yeoman.io/). It expands the standardized log and CLI tooling function to the scaffold through the context object. At the same time, it provides incremental updating mechanism for scaffolding. When creating the project, it will raise incremental updates when the local version and remote version are incompatible.

After introducing scaffolding, on the one hand, the team can maintain a unified technology stack and unified directory structure; on the other hand, it can also do some automated things when initializing the project, such as automatically creating remote Git repository and assigning developers master/developer rights limit, application monitoring Id, and internal CI/CD system to open quickly and so on.

### Starkit

Feflow introduces the concept of starkits. You can understand the concept of development kits as similar to the relationship between `babel-presets` and `babel-plugin`. `babel-presets` is a collection of a series of `babel-plugins`. The development kit is actually composed of multiple plug-ins. ; The package is used to provide commands for a certain type of project, usually a collection of multiple commands. The Feflow development kit needs to start with feflow-devkit-*, and the development kit needs to be published to npm after the development is completed. Normally, the team members who are familiar with the construction will perform unified maintenance.

### Plugin

In addition to providing basic functionality, Feflow also has a plug-in mechanism to easily extend subcommands. You can use the plugin to do a lot of automation, such as batch compression of images, building operational activities, local development SDK, code statistics and so on.

## Contributor

[![贡献者](https://camo.githubusercontent.com/c7a57799d85cf13ce8ee0ecfb7039922726aff4a/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f6665666c6f772f636f6e7472696275746f72732e7376673f77696474683d38393026627574746f6e3d66616c7365)](https://github.com/feflow/feflow/graphs/contributors)
