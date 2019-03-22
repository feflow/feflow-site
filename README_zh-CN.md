# Feflow 官网

Feflow 官网源码和文档。

## 如何开发

```sh
npm run docs:dev
```

## 如何撰写文档

Feflow 的文档都放在 `docs` 目录下，目录结构如下：

```sh
|- docs # 根目录下的文件夹存放的都是英文文档
    |- .vuepress # Feflow 文档官网主题源码，撰写文档时无需关注
    |- encology # 生态系统列表和详情页面，撰写文档时无需关注
    |- active # 【文档目录】最新动态相关的文章，英文文档
    |- example # 【文档目录】示例相关的文章，英文文档
    |- experience # 【文档目录】实践案例相关的文章，英文文档
    |- guide # 【文档目录】文档指南，英文文档
    |- zh # 中文文档
        | - ... # 目录结构和根目录一致
```

## 如何部署

首先，执行下述命令进行打包

```sh
npm run docs:build
```

然后，进入到 `docs/.vuepress` 目录下，你会发现 `dist` 目录，执行以下命令进行压缩：

```sh
tar zcvf dist.tar.gz dist
```

最后，把 `dist.tar.gz` 包上传到我们的系统中进行部署。
