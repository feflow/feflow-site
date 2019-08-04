(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{267:function(t,e,s){"use strict";s.r(e);var a=s(0),n=Object(a.a)({},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),s("blockquote",[s("p",[t._v("文档中的示例构建器是 "),s("router-link",{attrs:{to:"./advance-scaffold-custom.html"}},[t._v("自定义脚手架")]),t._v(" 文档内的构建器，可以结合以来一起看。")],1)]),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._m(9),t._v(" "),t._m(10),t._v(" "),s("p",[s("code",[t._v("builder-feflow-example")]),t._v(" 构建器的构建逻辑很简单，你可以前往仓库 "),s("a",{attrs:{href:"https://github.com/feflow/builder-feflow-example",target:"_blank",rel:"noopener noreferrer"}},[t._v("builder-feflow-example"),s("OutboundLink")],1),t._v(" 查看。")]),t._v(" "),s("p",[t._v("由于构建器和项目是分离的，所以在编写 Webpack 配置时要注意几个点：")]),t._v(" "),t._m(11),t._v(" "),t._m(12),t._v(" "),s("p",[t._v("上述的例子，仅仅是为了简单而砍掉了很多开发必备的功能，如果你想看更成熟的 React + Webpack 打包方案，我们现在就有，建议去看看：")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/feflow/builder-webpack4",target:"_blank",rel:"noopener noreferrer"}},[t._v("builder-webpack4"),s("OutboundLink")],1)])])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"自定义构建器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#自定义构建器","aria-hidden":"true"}},[this._v("#")]),this._v(" 自定义构建器")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("开发一个构建器并不困难，如果你的项目中已经有构建代码了，那么抽离成构建器轻而易举。本文会以一个简单的 Webpack 构建器为例，详细讲解如何开发出自己的构建器。当然，Feflow 并不限制构建器的技术选型，你用 "),e("code",[this._v("Rollup")]),this._v("、"),e("code",[this._v("Parcel")]),this._v(" 也是完全没问题的。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"创建构建器项目"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建构建器项目","aria-hidden":"true"}},[this._v("#")]),this._v(" 创建构建器项目")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("新建一个目录，名为 "),e("code",[this._v("builder-feflow-example")]),this._v("，然后，用 "),e("code",[this._v("npm init")]),this._v(" 初始化为一个 NPM 包。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("注意："),e("code",[this._v("name")]),this._v(" 字段和项目目录名保持一致，"),e("code",[this._v("main")]),this._v(" 字段的值是 Feflow 要执行的入口文件，示例写的是 "),e("code",[this._v("lib/index.js")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("构建器名字推荐以 "),e("code",[this._v("builder-")]),this._v(" 开头。虽然 Feflow 并不限制构建器的名字，但是 Feflow 在更新本地构建器时会找到 "),e("code",[this._v("builder-")]),this._v(" 开头的依赖包进行更新。")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"编辑入口文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#编辑入口文件","aria-hidden":"true"}},[this._v("#")]),this._v(" 编辑入口文件")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("创建或打开你刚刚创建的项目的入口文件，示例中是 "),e("code",[this._v("lib/index.js")]),this._v("，然后暴露出一个接收参数的函数：")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * 暴露给 Feflow 的函数\n * @param {string} cmd 用户在使用 feflow 构建时传给 feflow 的命令，例如执行 feflow dev 时 cmd 是 dev\n * @param {string} ctx feflow 上下文，和插件上下文一致\n */")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("exports")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cmd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ctx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cmd "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"dev"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 本地开发构建逻辑 */")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cmd "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"build"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 生产环境打包构建逻辑 */")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Feflow 内置的构建器调度插件会调用 "),e("code",[this._v("lib/index.js")]),this._v(" 这个模块，并传入两个参数给构建器，参数的解释在上述代码中已经给出了。目前支持两种构建命令，一个是 "),e("code",[this._v("feflow dev")]),this._v("，一个是 "),e("code",[this._v("feflow build")]),this._v("，分别对应开发环境和生产环境的打包构建。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"编写构建逻辑"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#编写构建逻辑","aria-hidden":"true"}},[this._v("#")]),this._v(" 编写构建逻辑")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ol",[e("li",[this._v("入口文件以及 HTML 文件都是在项目目录下的，所以 Webpack 配置的路径一定要写对")]),this._v(" "),e("li",[this._v("如果你的项目要共享构建器的 Loader，一定要让 resolveLoader.modules 包含构建器项目下的 node_modules，否则 Webpack 只会去找项目下安装的 Loader")]),this._v(" "),e("li",[this._v("其他涉及到路径的问题也一定要注意")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"更成熟的方案"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#更成熟的方案","aria-hidden":"true"}},[this._v("#")]),this._v(" 更成熟的方案")])}],!1,null,null,null);e.default=n.exports}}]);