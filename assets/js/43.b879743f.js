(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{562:function(t,e,n){"use strict";n.r(e);var a=n(8),s=Object(a.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h3",{attrs:{id:"需求"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#需求"}},[t._v("#")]),t._v(" 需求")]),t._v(" "),n("p",[t._v("注册改目录下所有组件，可以使用import进行注册，但是改目录下组件后期会根据不同场景进行增加，不能每次增加就进行import一次吧。")]),t._v(" "),n("p",[t._v("所以该目录下新建index.js文件，使用自动注册方式。")]),t._v(" "),n("img",{attrs:{src:t.$withBase("/images/vue/components.png"),alt:"mixureSecure"}}),t._v(" "),n("h3",{attrs:{id:"全局注册"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#全局注册"}},[t._v("#")]),t._v(" 全局注册")]),t._v(" "),n("p",[t._v("语法：Vue.component(组件ID，选项对象)")]),t._v(" "),n("p",[t._v("最后在main.js 引用即可。index.js内容如下：")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("import Vue from 'vue'\n\n// 加载组件\nconst Components = require.context('.', true, /\\.vue$/)\nComponents.keys()\n  .map(Components)\n  .forEach((item) => {\n    if (item.default.name)\n      Vue.component(item.default.name, item.default)\n  })\n")])])]),n("h3",{attrs:{id:"局部注册"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#局部注册"}},[t._v("#")]),t._v(" 局部注册")]),t._v(" "),n("p",[t._v("在需要调用的组件中引用即可，index.js内容如下：")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("const all = {}\n// 加载组件\nconst Components = require.context('.', true, /\\.vue$/)\nComponents.keys()\n  .map(Components)\n  .forEach((item) => {\n    if (item.default.name) all[item.default.name] = item.default\n  })\n\nexport default all\n")])])]),n("p",[t._v("引用")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("import AllComponents from './components'\n\nexport default {\n    name: 'Home',\n    components: {\n    ...AllComponents\n    },\n    data() {\n      return {}\n    },\n")])])]),n("copyright")],1)}),[],!1,null,null,null);e.default=s.exports}}]);