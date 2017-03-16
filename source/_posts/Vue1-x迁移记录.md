---
title: Vue1.x迁移记录
date: 2017-03-03 11:33:10
tags: vue
categories: vue
description: 记录从Vue1.x迁移到Vue2.x的过程
---
# 从Vue1.x迁移到2.x
> 记录下项目迁移到2.x的过程以及注意事项
<!-- more -->
## 升级脚手架
>
升级package文件
```
"vue": "^1.0.21" -> "vue": "^2.0.0",
"vue-router": "^0.7.13" -> "vue-router": "^2.0.0",
"vue-loader": "^8.3.0" -> "vue-loader": "^9.0.0",
"vue-router": "^0.7.13" -> "vue-router": "^2.0.0",
"vue-lazyload": "^1.0.0-rc10" -> "vue-lazyload": "^1.0.0-rc12",
"vue-hot-reload-api": "^1.2.0" -> "vue-hot-reload-api": "^2.0.11"
```

> ## 运行项目修正语法错误
> 运行项目会发现有vue-loader语法错误，项目无法运行，错误主要分为2类
* 过滤器语法错误，以及vue移除了自带的过滤器
* vue2.x的组件的html代码需要包裹在一个div里面

> ## 修改vue-router
> vue-router升级至2.x版本较原来的0.7.x有较大改变
* 修改入口文件
```
var router = new VueRouter({
  root: '/wx',
  hashbang: false,
  history: true, //html5模式
  saveScrollPosition: true //记住页面的滚动位置 html5模式适用
});
// 路由部分
router.map(RouteConf.route);
// 启动整个应用
router.start(App, '#app');

--------------------------------------------------------

var router = new VueRouter({
  base: '/wx',
  mode: 'history', //html5模式 去掉锚点
  routes: RouteConf.route,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
});


new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
```
>
* 修改路由文件
```
let router = {
  // 首页
  "/index": {
    name: 'index',
    component: function(resolve) {
      require(['../../pages/index/index.page'], resolve);
    }
  }
};

export default router;

---------------------------------------------------------

'use strict';
let router = {
  // 首页
  path: "/index",
  name: 'index',
  component: function(resolve) {
    require(['../../pages/index/index.page'], resolve);
  }

};

export default router;
```
> ## 运行项目
