(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{270:function(t,a,e){"use strict";e.r(a);var s=e(0),i=Object(s.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"content"},[e("h1",{attrs:{id:"feflow-oci支持eslint检查"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#feflow-oci支持eslint检查","aria-hidden":"true"}},[t._v("#")]),t._v(" Feflow-OCI支持ESlint检查")]),t._v(" "),e("h3",{attrs:{id:"背景"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#背景","aria-hidden":"true"}},[t._v("#")]),t._v(" 背景")]),t._v(" "),e("p",[t._v("近期，团队已经从JenkinsCI迁移到OCI一段时间，但是由于历史项目原因，一直没有接入代码检查。为了提升团队的代码质量，feflow官方经过调研和探索，给出了一套OCI + ESLint的解决方案。")]),t._v(" "),e("h3",{attrs:{id:"方案设计"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#方案设计","aria-hidden":"true"}},[t._v("#")]),t._v(" 方案设计")]),t._v(" "),e("h4",{attrs:{id:"增量检查"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#增量检查","aria-hidden":"true"}},[t._v("#")]),t._v(" 增量检查")]),t._v(" "),e("p",[t._v("对于新项目来说，可以从一开始就遵循eslint规范，但是老项目也想接入的时候就比较困难，eslint检查一片红，要改动的地方太多，但是真的很想接入怎么办？\n"),e("img",{attrs:{src:"http://km.oa.com/files/photos/pictures//20190530//1559217319_27.png",alt:""}})]),t._v(" "),e("p",[t._v("鉴于老项目修改点较多，我们采用增量检查的方案，也就是有变动的js文件再去检查，这样对于老项目就可以渐进式的接入。文件改动基本是以下四种，而对于删除的文件是没必要检查的。\n✅ A：新增\n✅ C：拷贝\n✅ M：修改\n✅ D：删除\n对于项目的变动文件，在开发中大体分两种情况：第一是未commit；第二种是已经commit。对于这两种情况使用"),e("code",[t._v("feflow lint")]),t._v("都可以帮你进行增量检查。\n"),e("img",{attrs:{src:"http://km.oa.com/files/photos/pictures//20190530//1559221989_26.png",alt:""}})]),t._v(" "),e("p",[t._v("大家都知道，我们可以通过在package.json中设置commit钩子的方式，在提交代码时检查代码。对于未commit的文件，feflow检查跟precommit + lint-stage功能一致，只检测暂存区域的文件。对于已经commit的代码，则通过对比commit记录，获取最后一次提交的文件（对于只有一次提交记录的进行全量检查），大大降低了老项目的接入成本。\n"),e("img",{attrs:{src:"http://km.oa.com/files/photos/pictures//20190530//1559217805_66.png",alt:""}})]),t._v(" "),e("h4",{attrs:{id:"检查点"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#检查点","aria-hidden":"true"}},[t._v("#")]),t._v(" 检查点")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("预检查\n把代码添加到暂存区未commit之前，可以使用命令"),e("code",[t._v("feflow lint")]),t._v("提前检测代码，功能跟precommit + lint-stage 一致，预检查可以减少一些不必要的commit记录。\n"),e("img",{attrs:{src:"http://km.oa.com/files/photos/pictures//20190530//1559219680_99.png",alt:"预检查"}})])]),t._v(" "),e("li",[e("p",[t._v("commit 检查\n在package.json中利用precommit 和 lint-stage 进行第一步检查。")])])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('"scripts": {\n    "precommit": "lint-staged"\n  },\n  "lint-staged": {\n    "*.js": [\n      "eslint",\n      "git add"\n    ]\n  }\n')])])]),e("p",[e("img",{attrs:{src:"http://km.oa.com/files/photos/pictures//20190530//1559219729_48.png",alt:"precommit检查"}})]),t._v(" "),e("ul",[e("li",[e("p",[t._v("本地自主检查\n对于一些未设置precommit的项目，如果commit之前忘了检查代码，在push之前依然可以使用 "),e("code",[t._v("feflow lint")]),t._v("进行增量检查。当然如果有些同学使用"),e("code",[t._v("--no-verify")]),t._v("跳过检查，但是push之前又“良心发现”也是可以满足的。\n"),e("img",{attrs:{src:"http://km.oa.com/files/photos/pictures//20190530//1559219783_84.png",alt:"本地自主检查"}})])]),t._v(" "),e("li",[e("p",[t._v("CI检查\n在提交代码后，OCI构建过程中会再次进行eslint检查，检查不通过则中断构建，这一步主要是为了防止开发者在提交代码时使用"),e("code",[t._v("--no-verify")]),t._v("跳过检查。\n"),e("img",{attrs:{src:"http://km.oa.com/files/photos/pictures//20190530//1559216887_2.png",alt:"feflow lint in oci"}})])])]),t._v(" "),e("h4",{attrs:{id:"检查流程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#检查流程","aria-hidden":"true"}},[t._v("#")]),t._v(" 检查流程")]),t._v(" "),e("p",[t._v("基于上述方案，从本地开发到CI构建，全方位提供代码检测能力，尽可能保证代码的质量（不排除有些同学使用--no-verify并且删除OCI的lint配置）。\n"),e("img",{attrs:{src:"http://km.oa.com/files/photos/pictures//20190530//1559220809_95.png",alt:""}})]),t._v(" "),e("h3",{attrs:{id:"项目接入"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#项目接入","aria-hidden":"true"}},[t._v("#")]),t._v(" 项目接入")]),t._v(" "),e("h4",{attrs:{id:"新项目"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#新项目","aria-hidden":"true"}},[t._v("#")]),t._v(" 新项目")]),t._v(" "),e("p",[t._v("脚手架创建的项目默认已经通过eslint检查，并且配置了precommit和CI构建时进行代码检查，因此只需要关注自己写的代码即可。")]),t._v(" "),e("h4",{attrs:{id:"老项目"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#老项目","aria-hidden":"true"}},[t._v("#")]),t._v(" 老项目")]),t._v(" "),e("p",[t._v("对于老项目，本地代码检测可以直接更新feflow到最新版本，便可以使用"),e("code",[t._v("feflow lint")]),t._v("检查代码，想配置precommit的上面也有截图。CI构建进行代码检查也很简单，只需要添加一些OCI配置。\n"),e("img",{attrs:{src:"http://km.oa.com/files/photos/pictures//20190530//1559221415_27.png",alt:".orange-ci.yml"}})]),t._v(" "),e("p",[t._v("注意：构建时必须保证OCI的docker镜像已经更新了feflow(>=0.15.8)。")])])}],!1,null,null,null);a.default=i.exports}}]);