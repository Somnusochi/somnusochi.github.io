---
title: phantomjs小试
date: 2017-03-09 10:19:51
tags: phantomjs
categories: JavaScript
description: 试着用了一下phantomjs
---
# 安装phantomjs
> phantomjs是一个无界面的,可脚本编程的WebKit浏览器引擎。它原生支持多种web 标准：DOM 操作，CSS选择器，JSON，Canvas 以及SVG
<!-- more -->
> `npm install phantomjs -g`

# 使用
> 使用`phantomjs --version`查看安装的phantomjs版本
## 查看网页加载速度
`phantomjs loadspeed.js https://somnusochi.github.io/`
## 分析页面加载资源
`phantomjs netsniff.js https://somnusochi.github.io/`将抓捕到的网络请求导出成 HAR 格式可以访问`http://www.softwareishard.com/har/viewer/`进行可视化分析

# 更多
> 更多的例子可以去[PhantomJS](http://phantomjs.org/)官网查看
