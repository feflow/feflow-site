(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{280:function(e,t,i){"use strict";i.r(t);var a=i(0),s=Object(a.a)({},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"content"},[e._m(0),e._v(" "),i("p",[e._v("At present, you may meet some of Feflow's commands, and now I will uncover their true face. They are all registered by Feflow's inner plugins.")]),e._v(" "),i("p",[e._v("Plugin is an important feature of Feflow. In fact, Feflow is a plugin management tool, each plugin can register multiple commands on Feflow, so Feflow can support many commands.")]),e._v(" "),i("p",[e._v("Now let's take a look at all of Feflow's inner plugins and the commands they registered.")]),e._v(" "),e._m(1),e._v(" "),i("p",[e._v("The plugin contains two commands:")]),e._v(" "),e._m(2),e._m(3),e._v(" "),e._m(4),e._v(" "),i("p",[e._v("The plugin can install or uninstall any NPM module, so we call it package management plugin. With this plugin, it's easy to manage such as scaffold, builder, deployer, and plugin.")]),e._v(" "),e._m(5),e._v(" "),i("p",[e._v("This plugin contains one command:")]),e._v(" "),e._m(6),i("p",[e._v("The plugin allows the user to select one of the local installed scaffolds for project creation, so it calls scaffold dispatch plugin.")]),e._v(" "),e._m(7),e._v(" "),e._m(8),i("blockquote",[i("p",[e._v("Read "),i("router-link",{attrs:{to:"./advance-scaffold-custom.html"}},[e._v("this")]),e._v(" can get more informations about scaffold developement.")],1)]),e._v(" "),e._m(9),e._v(" "),i("p",[e._v("This plugin contains two commands:")]),e._v(" "),e._m(10),e._m(11),e._v(" "),i("p",[e._v("Builder is independent, and the plugin will select builder for building via configuration, so we call it builder dispatch plugin. This method effectively helps project migrate to new building code.")]),e._v(" "),i("blockquote",[i("p",[e._v("Read "),i("router-link",{attrs:{to:"./advance-scaffold-custom.html"}},[e._v("this")]),e._v(" can get more informations about builder developement.")],1)]),e._v(" "),e._m(12),e._v(" "),i("p",[e._v("This plugin contains one command:")]),e._v(" "),e._m(13),e._m(14),e._v(" "),e._m(15),e._v(" "),e._m(16),e._v(" "),e._m(17),e._v(" "),e._m(18),e._m(19),e._v(" "),i("p",[e._v("Feflow also has a code lint plugin, so it is easy for you to check the project's code with ESLint:")]),e._v(" "),e._m(20),e._m(21),e._v(" "),e._m(22),e._v(" "),i("p",[e._v("In addition to inner plugins, Feflow alse supports developers to write their own plugins and register them, so you can get a special engineering tool. If you want to know more about how to develop a plugin, please read "),i("router-link",{attrs:{to:"./advance-plugins-custom.html"}},[e._v("custom plugin")]),e._v(" chapter.")],1)])},[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"plugin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#plugin","aria-hidden":"true"}},[this._v("#")]),this._v(" Plugin")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"package-management-plugin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#package-management-plugin","aria-hidden":"true"}},[this._v("#")]),this._v(" Package Management Plugin")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("# 1. install package\nfeflow install <package-name>\n# 2. uninstall package\nfeflow uninstall <package-name>\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("code",[this._v("feflow install <package-name>")]),this._v(" can install NPM modules under "),t("code",[this._v("~/.feflow/node_modules")]),this._v(". We can use it to install scaffolds, builders and plugins.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("code",[this._v("feflow uninstall <package-name>")]),this._v(" is the opposite of the above command. It is used to uninstall NPM modules.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"scaffold-dispatch-plugin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#scaffold-dispatch-plugin","aria-hidden":"true"}},[this._v("#")]),this._v(" Scaffold Dispatch Plugin")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("feflow init\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Each time the plugin is executed, it will automatically update all local scaffolds. If you want to skip the update, you can add a "),t("code",[this._v("--disableCheck")]),this._v(" parameter.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("feflow init --disableCheck\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"builder-dispatch-plugin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#builder-dispatch-plugin","aria-hidden":"true"}},[this._v("#")]),this._v(" Builder Dispatch Plugin")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("# 1. Local development\nfeflow dev\n# 2. Generate bundle file\nfeflow build\n")])])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("p",[e._v("The plugin will get the value of the "),i("code",[e._v("builderType")]),e._v(" field as builder's name from the "),i("code",[e._v("feflow.js")]),e._v(" or "),i("code",[e._v("feflow.json")]),e._v(" configuration file which is in the project root. If you haven't installed the builder via Feflow, the plugin will automatically install it for you, and it will tell the builder to run "),i("code",[e._v("dev")]),e._v(" or "),i("code",[e._v("build")]),e._v(" command to finish the build process.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"deployer-dispatch-plugin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#deployer-dispatch-plugin","aria-hidden":"true"}},[this._v("#")]),this._v(" Deployer Dispatch Plugin.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("feflow deploy\n")])])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("p",[e._v("The plugin will get the value of the "),i("code",[e._v("deployerType")]),e._v(" field as deployer's name from the "),i("code",[e._v("feflow.js")]),e._v(" or "),i("code",[e._v("feflow.json")]),e._v(" configuration file which is in the project root, then tell the builder to run "),i("code",[e._v("deploy")]),e._v(" command to finish the deploy process.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"global-config-plugin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#global-config-plugin","aria-hidden":"true"}},[this._v("#")]),this._v(" Global Config Plugin")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Perhaps the plugin is used less, it is always used to set or get the configuration items in ~/.feflow/.feflowrc.yml file. This file can be used as a Feflow global configuration file. The inner plugin will use two configuration items in the file, one is "),t("code",[this._v("registry")]),this._v(" and the other is "),t("code",[this._v("proxy")]),this._v(", which is used when Feflow or the plugin needs private repository or proxy to download the package. If you develop a plugin and want to give users some custom configuration, you can use the plugin to add these configurations, and then your plugin can get these configurations from the context by Feflow.")])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("p",[e._v("Global config plugin registers a "),i("code",[e._v("config")]),e._v(" command and supports three subcommands: "),i("code",[e._v("set")]),e._v(", "),i("code",[e._v("get")]),e._v(", "),i("code",[e._v("list")]),e._v(". The usage is as follows:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("# list all the config items.\nfeflow config list\n# Get a config item.\nfeflow config get <key>\n# Add or modify a config item.\nfeflow config set <key> <value>\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"code-lint-plugin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#code-lint-plugin","aria-hidden":"true"}},[this._v("#")]),this._v(" Code Lint Plugin")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("feflow lint [folder]\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("It supports the "),t("code",[this._v("--ignore")]),this._v(" parameter, which allows you to ignore some directories or files when checking.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"custom-plugin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#custom-plugin","aria-hidden":"true"}},[this._v("#")]),this._v(" Custom Plugin")])}],!1,null,null,null);t.default=s.exports}}]);