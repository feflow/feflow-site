# Create Project

Go to the folder where you want to create the project and run `fef init`, then you will enter the process:

![choose scaffold](https://pub.idqqimg.com/5a7071770a73496f9bfb8f00ebe0a72e.svg)

Feflow will let you choose one of the installed scaffold to create the project. Now, maybe only one scaffold installed, choose it. It's a multiple pages scaffold with React, Redux and webpack.

> Read [this](https://github.com/feflow/generator-ivweb) can get more informations about the scaffold.



```bash
# Run fef dev to start the project
fef dev
```

## Start development

After the project is created, run npm i in the project directory to install the dependencies, and then run fef dev to start the local service. The service runs at http://127.0.0.1:8001 by default.

Open http://127.0.0.1:8001 and you will see a page in the initial state. If you want to modify this page, you need to understand the project directory structure first and know where to change it.

The directory structure of the project is determined by the scaffold you choose. Taking the scaffold used in this tutorial as an example, the main structure of the generated project is as follows

```sh
|- src
    |- assets # 公共的 JS、CSS、Images 目录
    |- middleware # 公共的 Redux 中间件 目录
    |- modules # 公共模块
    |- pages # 页面目录
        |- index # 首页
            |- actions # 页面级的 actions 目录
            |- components # 页面级的公共组件目录
            |- reducers # 页面级的 reducers 目录
            |- index.html # HTML 入口
            |- index.js # 页面 Class
            |- index.less # pageComponent.js 中元素的样式，或者全局样式
            |- init.js # JS 入口
            |- pageComponent.js # React 根组件
    |- reducers # 公共的 reducers 目录
|- .feflowrc.js # Feflow 配置文件
```

Among them, src/pages/index/index.html is the page displayed at http://127.0.0.1:8001. You can open the src/pages/index/pageComponent.js file to modify