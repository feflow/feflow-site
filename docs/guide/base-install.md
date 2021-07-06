# Installation

## Install Feflow CLI

Feflow support Node 6.0 and above, you can use follow command to install it:

**Use npm**

```sh
npm install @feflow/cli -g
```

**use yarn**

```sh
npm install yarn -g

yarn global add @feflow/cli

fef config set packageManager yarn
```

If you are installing for the first time, you need to run `Feflow` once to initialize:

```sh
fef
```


After install, you can run `feflow` to init:

```sh
fef
```

![Feflow Init](https://pub.idqqimg.com/45b5f10631af4b6da8a7c81ac8eea01c.svg)

Here you may write the npm registry and npm proxy config to make Feflow download package from NPM or a private registry in a smooth network. For example, if you want to use Taobao registry, you must write https://registry.npm.taobao.org here.

If you accidentally use the default configuration, you can also configure it with the following command. Take the Taobao registry as an example:

```sh
fef config set registry https://registry.npm.taobao.org
```

> Read [this](./base-plugins-inner.md#Global-Config-Plugin) can get more informations about feflow config command.

## Install Scaffold

Feflow core doesn't contain scaffold, you should install it via Feflow. To be simple, you can install [generator-ivweb](https://github.com/feflow/generator-ivweb) to be continue.

```sh
feflow install generator-ivweb
```

> Read [this](./advance-scaffold-custom.md) can get more informations about scaffold.

Now, the scaffold is installed successfully, you can start creating your project.

