# Feflow Site

Feflow official site source code and docs.

[中文文档](./README_zh-CN.md)

## How to develop

```sh
npm run docs:dev
```

## How to deploy

First, run this command:

```sh
npm run docs:build
```

Then, `cd` to `docs/.vuepress`, you can find the `dist` directory, and run this command:

```sh
tar zcvf dist.tar.gz dist
```

Finally, publish the `dist.tar.gz` package to our system.
