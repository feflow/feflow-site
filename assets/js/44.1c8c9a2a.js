(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{298:function(t,e,n){"use strict";n.r(e);var s=n(0),a=Object(s.a)({},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[t._m(0),t._v(" "),n("p",[n("a",{attrs:{href:"https://eslint.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("ESLint"),n("OutboundLink")],1),t._v(" 是目前最主流的 Javascript 和 JSX 代码检查的利器。")]),t._v(" "),n("p",[t._v("很多大公司比如 "),n("a",{attrs:{href:"https://github.com/airbnb/javascript",target:"_blank",rel:"noopener noreferrer"}},[t._v("Airbnb"),n("OutboundLink")],1),t._v(" 和 "),n("a",{attrs:{href:"https://google.github.io/styleguide/javascriptguide.xml",target:"_blank",rel:"noopener noreferrer"}},[t._v("Google"),n("OutboundLink")],1),t._v(" 都有一套自己的 Javascript 编码规范，而规范能够实施离不开 ESLint。像 Airbnb 就有大名顶顶的 "),n("a",{attrs:{href:"https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb",target:"_blank",rel:"noopener noreferrer"}},[t._v("eslint-config-airbnb"),n("OutboundLink")],1),t._v("，而 Google 则有 "),n("a",{attrs:{href:"https://github.com/google/eslint-config-google",target:"_blank",rel:"noopener noreferrer"}},[t._v("eslint-config-google"),n("OutboundLink")],1),t._v("。但他们都适合他们自己的团队，并不适合 Feflow 团队。")]),t._v(" "),n("p",[t._v("经过调研和探索，Feflow 也推出了适用于自己团队的 ESLint 解决方案 —— "),n("a",{attrs:{href:"https://github.com/feflow/eslint-config-ivweb",target:"_blank",rel:"noopener noreferrer"}},[t._v("eslint-config-ivweb"),n("OutboundLink")],1),t._v("。这套方案最核心的理念是"),t._m(1),t._v("。")]),t._v(" "),t._m(2),t._v(" "),n("p",[t._v("2017年4月13日，腾讯高级工程师小圣在做充值业务时，修改了苹果iap支付配置，将JSON配置增加了重复的key。代码发布后，有小部分使用了vivo手机的用户反馈充值页面白屏，无法在Now app内进行充值。最后问题定位是：vivo手机使用了系统自带的webview而没有使用X5内核，解析JSON时遇到重复key报错，导致页面白屏。")]),t._v(" "),n("p",[t._v("类似的问题其实很多： 比如变量未定义，方法被覆盖等等都会造成js代码执行时报错。那么如何避免呢？ESLint官方提供sharable config（可共享配置），前端团队可以根据自身团队情况定制ESLint规范配置。")]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),n("p",[t._v("eslint-config-ivweb是腾讯NOW直播IVWEB团队的ESLint配置。目前发布初版，目前大约有130条规则，包含可能存在的错误、最佳实践、变量、代码风格、ES6相关等5个大的规则板块。")]),t._v(" "),n("p",[t._v("仓库地址：https://github.com/feflow/eslint-config-ivweb\n欢迎提交issue或者PR一起参与团队规则维护")]),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),n("p",[t._v("更加详细的规则说明可以前往： "),n("a",{attrs:{href:"https://github.com/feflow/eslint-config-ivweb/blob/master/docs/RULE.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("规则文档"),n("OutboundLink")],1)]),t._v(" "),t._m(8),t._v(" "),n("p",[t._v("基本理念： 项目代码太多，不影响历史代码。只针对有改动的代码（.js和.jsx后缀）才进行校验。")]),t._v(" "),n("p",[t._v("第一步：添加或者修改.eslintrc.js 配置文件")]),t._v(" "),t._m(9),n("p",[t._v("有部分eslint:recommended提到的规则在ivweb中没有提到，因此最好配合eslint:recommend一起使用。")]),t._v(" "),n("p",[t._v("只需要同时继承eslint:recommend 和 ivweb 即可，确保 ivweb 放置在最后。部分eslint:recommend定义的规则有点严格，ivweb里面有做定制化的修改。")]),t._v(" "),n("p",[t._v("第二步：增加precommit的hook和eslint-config-ivweb依赖")]),t._v(" "),n("p",[t._v("此处我们使用husky来管理所有的Hook，同之前的commit message校验。")]),t._v(" "),t._m(10),t._m(11),t._v(" "),n("p",[t._v("Q： 为什么不直接使用airbnb团队的 eslint-config-airbnb？\nA： airbnb官方的规则过于庞大，有10多个规则文件。维护起来成本较高，选择基于轻量级的 eslint:recommend 基础之上定制团队ESLint规则更加简单，也便于维护。")]),t._v(" "),n("p",[t._v("Q： 我觉得eslint-config-ivweb有些规则不太合适，怎么办？\nA： 欢迎提交issue讨论或者直接提交PR。仓库地址：https://github.com/feflow/eslint-config-ivweb")]),t._v(" "),n("p",[t._v("Q： 为什么使用lint-staged？\nA： lint-staged只会对修改过的js文件行数进行代码规范检查，不会对所有的代码检查，更加合理和可操作。")])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"eslint-规范"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#eslint-规范","aria-hidden":"true"}},[this._v("#")]),this._v(" ESLint 规范")])},function(){var t=this.$createElement,e=this._self._c||t;return e("strong",[this._v("基于 "),e("code",[this._v("eslint:recommend")]),this._v(" 做规则的定制化")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"从一次生产事故说起"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#从一次生产事故说起","aria-hidden":"true"}},[this._v("#")]),this._v(" 从一次生产事故说起")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"规则定义准则"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#规则定义准则","aria-hidden":"true"}},[this._v("#")]),this._v(" 规则定义准则")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("不重复造轮子，基于 eslint:recommend 配置并改进")]),this._v(" "),e("li",[this._v("能够帮助发现代码错误的规则，全部开启")]),this._v(" "),e("li",[this._v("目的是团队的代码风格统一，而不是限制开发体验")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"eslint-config-ivweb-介绍"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#eslint-config-ivweb-介绍","aria-hidden":"true"}},[this._v("#")]),this._v(" eslint-config-ivweb 介绍")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"部分规则说明"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#部分规则说明","aria-hidden":"true"}},[this._v("#")]),this._v(" 部分规则说明")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"https://pub.idqqimg.com/pc/misc/files/20171011/7a4572cf1c4b4690895f80bce33a76a1.jpg",alt:""}}),this._v("\n包含3个信息： 最左侧是规则，中间是错误级别，右侧是解释说明含义。错误级别包含：error、warn和off三个级别。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"项目接入使用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#项目接入使用","aria-hidden":"true"}},[this._v("#")]),this._v(" 项目接入使用")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"language-javascript extra-class"},[n("pre",{pre:!0,attrs:{class:"language-javascript"}},[n("code",[t._v("module"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"env"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"es6"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"browser"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"node"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"extends"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"eslint:recommended"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ivweb"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"globals"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"__inline"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"IS_SERVER"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"__uri"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v('{\n  "name": "with-lint-staged",\n  "version": "0.0.1",\n  "scripts": {\n    "precommit": "lint-staged"\n  },\n  "lint-staged": {\n    "src/*.{js,jsx}": [\n      "eslint --fix",\n      "git add"\n    ]\n  },\n  "devDependencies": {\n    "eslint": "^4.8.0",\n    "eslint-config-ivweb": "^0.1.0",\n    "husky": "^0.14.3",\n    "lint-staged": "^4.2.3"\n  }\n}\n')])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"答疑互动"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#答疑互动","aria-hidden":"true"}},[this._v("#")]),this._v(" 答疑互动")])}],!1,null,null,null);e.default=a.exports}}]);