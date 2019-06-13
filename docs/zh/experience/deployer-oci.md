---
layout: Blog
date: 2019/06/13
description: 现在在 Feflow 的工作流里，存在着一个问题，那就是从 Jenkins 迁移到 OCI 后的流程是割裂的。你可以用 Feflow 来创建项目、本地开发，但是部署时却需要去到专门的部署系统查看日志。其实，Feflow 本身就拥有扩展部署的能力。同时，现在团队也统一迁移到了 OCI，于是，这个针对 OCI 部署的 Feflow 部署器就此诞生，旨在让开发部署的整个流程都在 Feflow 中进行。当然，这个部署器带来的好处还远不止于此。
---

# Feflow OCI 部署器 —— Deployer-OCI

## 背景

现在在 Feflow 的工作流里，存在着一个问题，那就是从 Jenkins 迁移到 OCI 后的流程是割裂的。你可以用 Feflow 来创建项目、本地开发，但是部署时却需要去到专门的部署系统查看日志。其实，Feflow 本身就拥有扩展部署的能力。同时，现在团队也统一迁移到了 OCI，于是，这个针对 OCI 部署的 Feflow 部署器就此诞生，旨在让开发部署的整个流程都在 Feflow 中进行。当然，这个部署器带来的好处还远不止于此。

## 如何使用

首先，用 Feflow 安装 `Deployer-OCI` 部署器：

```sh
feflow install @tencent/deployer-oci
```

然后，在项目的 feflow.json 中，加上 `"deployerType": "@tencent/deployer-oci"` 配置。

最后，在项目根目录运行 `feflow deploy` 就能提交本地更改的代码并开始部署了。

## 特性

### 部署环境选择

当运行 `feflow deploy` 后，首先就是选择部署到正式环境还是测试环境，如果是正式环境，会多一个自动打 Tag 并且同步到远程分支的过程。两个环境的部署都会依次执行本地代码提交和部署日志打印的过程。

### 规范 Git Commit

当项目在本地开发好后，通常我们做的第一步就是提交代码。对于新人来说，通常不知道提交代码的规范，即便是一些老员工，也只能记住 feat、fix、docs 等一些常见的提交类型，从而导致很多时候不能够完美的写好一条 Git Commit 信息。

`Deployer-OCI` 要解决的第一个问题就是帮助大家写出更准确的 Commit 信息。当运行 `feflow deploy` 时，如果检测到本地有未提交的更改，就会询问是否执行提交（如果你对提交代码的规范不是特别了解，还是尽可能先使用这个提交流程）。如果你确认执行提交，那么 `Deployer-OCI` 就会依次让你选择提交类型，填写提交影响的范围以及提交说明。

![git-commit-type](https://qpic.url.cn/feeds_pic/PiajxSqBRaEIZuV16jkvE05ONibzJrYHRosnPfTibXjIJFvoqFiaLKeLbQ/)

如上图所示，你会看到每个提交类型代表什么含义，选最贴近的类型进行提交，你也会被要求填写本次提交影响的范围，如果范围比较大，也可以选择不填写。

### 规范 Git Tag

因为 OCI 配置规范约定正式环境的部署由 Tag 提交触发，所以 `Deployer-OCI` 也支持自动打 Tag 并触发部署。自动打 Tag 的好处是规范 Tag 流。比如 v1.0.0 的下个版本到底是 v1.0.1 还是 v1.1.0，可能你思考一段时间能够做出正确选择，但是往往你并没有那么多时间进行思考，需要快速的做决定。然而，给数字进行加减是一项非常不直观的过程，人类往往会有惯性思维，给最后一个数字或者最大的数字进行增加。我们需要一个语义化的选择，然后版本的管理由部署器自动完成。如下图所示：

![git-tag-choose](https://qpic.url.cn/feeds_pic/SAuz8sG6iab13GCjTPqrS7yhr4RvoBiaSa15zaeUJ3xfY/)

Tag 名称是由 `v1.0.0` 这样的字符串命名的，当选择主版本是，第一个数字会增加一，如果是次版本，第二个数字会加一，如果是修订版本，第三个数字会加一，这样一来，Tag 流的命名就规范了。

另外，`Deployer-OCI` 会让输入一个 Tag 的详细描述，这样追溯版本的时候就能一眼明白了。

### 显示部署日志

`Deployer-OCI` 可以让你无需从终端切换到浏览器或者企业微信去查看部署进度和日志，直接显示在终端中，给你无缝体验。下面可以看几种情况下的执行动图：

![本地代码未提交时执行 feflow deploy 部署到测试环境的正常情况](https://qpic.url.cn/feeds_pic/PiajxSqBRaEJ9fMhX4ib6DWlsicUkkyxIcCQAYiavaGM5NhmxjWUZ3Z4PA/)

![本地代码提交后执行 feflow deploy 部署到正式环境的正常情况，由于部署任务和上面一样就不展示了](https://qpic.url.cn/feeds_pic/PiajxSqBRaEJnIVbK8DeIUlUokEwFic4r5rvDnSgfXmAKuW1A8kxmRVQ/)

其他情况，比如本地使用 Git 提交了代码，触发了构建部署，再执行 feflow deploy，将会看到部署时的日志，但由于不是推荐的做法，这里就不展示了。
