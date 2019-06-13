---
layout: Blog
date: 2019/06/13
description: 近期，团队已经从JenkinsCI迁移到OCI一段时间，但是由于历史项目原因，一直没有接入代码检查。为了提升团队的代码质量，feflow官方经过调研和探索，给出了一套OCI + ESLint的解决方案。
---

# Feflow-OCI支持ESlint检查

### 背景
近期，团队已经从JenkinsCI迁移到OCI一段时间，但是由于历史项目原因，一直没有接入代码检查。为了提升团队的代码质量，feflow官方经过调研和探索，给出了一套OCI + ESLint的解决方案。

### 方案设计
#### 增量检查

对于新项目来说，可以从一开始就遵循eslint规范，但是老项目也想接入的时候就比较困难，eslint检查一片红，要改动的地方太多，但是真的很想接入怎么办？
![](http://km.oa.com/files/photos/pictures//20190530//1559217319_27.png)

鉴于老项目修改点较多，我们采用增量检查的方案，也就是有变动的js文件再去检查，这样对于老项目就可以渐进式的接入。文件改动基本是以下四种，而对于删除的文件是没必要检查的。
:white_check_mark: A：新增
:white_check_mark: C：拷贝
:white_check_mark: M：修改
:white_check_mark: D：删除
对于项目的变动文件，在开发中大体分两种情况：第一是未commit；第二种是已经commit。对于这两种情况使用```feflow lint```都可以帮你进行增量检查。
![](http://km.oa.com/files/photos/pictures//20190530//1559221989_26.png)

大家都知道，我们可以通过在package.json中设置commit钩子的方式，在提交代码时检查代码。对于未commit的文件，feflow检查跟precommit + lint-stage功能一致，只检测暂存区域的文件。对于已经commit的代码，则通过对比commit记录，获取最后一次提交的文件（对于只有一次提交记录的进行全量检查），大大降低了老项目的接入成本。
![](http://km.oa.com/files/photos/pictures//20190530//1559217805_66.png)


#### 检查点

- 预检查
把代码添加到暂存区未commit之前，可以使用命令```feflow lint```提前检测代码，功能跟precommit + lint-stage 一致，预检查可以减少一些不必要的commit记录。
![预检查](http://km.oa.com/files/photos/pictures//20190530//1559219680_99.png)

- commit 检查
在package.json中利用precommit 和 lint-stage 进行第一步检查。
```
"scripts": {
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "*.js": [
      "eslint",
      "git add"
    ]
  }
```
![precommit检查](http://km.oa.com/files/photos/pictures//20190530//1559219729_48.png)

- 本地自主检查
对于一些未设置precommit的项目，如果commit之前忘了检查代码，在push之前依然可以使用 ``` feflow lint ```进行增量检查。当然如果有些同学使用```--no-verify```跳过检查，但是push之前又“良心发现”也是可以满足的。
![本地自主检查](http://km.oa.com/files/photos/pictures//20190530//1559219783_84.png)

- CI检查
在提交代码后，OCI构建过程中会再次进行eslint检查，检查不通过则中断构建，这一步主要是为了防止开发者在提交代码时使用```--no-verify```跳过检查。
![feflow lint in oci](http://km.oa.com/files/photos/pictures//20190530//1559216887_2.png)

#### 检查流程
基于上述方案，从本地开发到CI构建，全方位提供代码检测能力，尽可能保证代码的质量（不排除有些同学使用--no-verify并且删除OCI的lint配置）。
![](http://km.oa.com/files/photos/pictures//20190530//1559220809_95.png)

### 项目接入

#### 新项目
脚手架创建的项目默认已经通过eslint检查，并且配置了precommit和CI构建时进行代码检查，因此只需要关注自己写的代码即可。

#### 老项目
对于老项目，本地代码检测可以直接更新feflow到最新版本，便可以使用```feflow lint```检查代码，想配置precommit的上面也有截图。CI构建进行代码检查也很简单，只需要添加一些OCI配置。
![.orange-ci.yml](http://km.oa.com/files/photos/pictures//20190530//1559221415_27.png)

注意：构建时必须保证OCI的docker镜像已经更新了feflow(>=0.15.8)。
