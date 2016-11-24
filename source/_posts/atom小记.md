---
title: atom小记
date: 2016-11-16 16:15:54
tags: atom
categories: atom
description:
---
# atom
> atom,强，无敌，最好用的编辑器没有之一，可惜插件被墙了，换了公司换了mac，重新装了一遍atom，顺便整理下这次折腾atom的经过，整理下常用的插件。
<!-- more -->
## atom插件安装
> 由于未知的原因，atom直接安装插件很慢，或者无法安装，然后尝试了下列几种方法
+ git clone到本地用apm install安装
> 直接上github下载对应插件仓库至.atom/packages/目录，然后进该插件的文件夹使用apm install进行安装，结果喜闻乐见，先试了terminal-plus，可以从github上面git下来，安装之后，提示报错缺少模块，第二次想直接git clone emmet，结果提示github链接悲剧，挂了代理还拉不下项目，我也是醉，失败。
+ 使用淘宝npm镜像
> 百度和Google轮番上也没几个解决方法，但都找了这条，设置npm淘宝镜像（我npm设置淘宝镜像还是没速度啊，只能用cnpm，不知道为啥），代码如下
```
registry=https://registry.npm.taobao.org/  
strict-ssl=false
```
> 将如上代码添加至.atom/.apmrc文件里面，或者直接在终端里面运行如下代码
```
echo 'registry = https://registry.npm.taobao.org' > ~/.atom/.apmrc
```
> 结果令人悲伤，照理应该能行，结果还是不行，直接使用apm install安装还是不行
+ 使用代理
通过给atom直接设置http代理，socks的代理我也试了，但是没生效，pass了，代码如下
```
strict-ssl=false
https-proxy=http://127.0.0.1:1087/
http-proxy =http://127.0.0.1:1087/
```
> 将以上代码写入至.atom/.apmrc文件之中，端口1087是我使用shadowsocks的http代理监听端口，结果大功告成，可以愉快的安装插件了，无论是在atom里面直接安装还是直接输apm install进行安装。
## 一些常用的atom插件集合
+ [atom-beautify](https://atom.io/packages/atom-beautify) 代码格式化插件
```
apm install atom-beautify
```
> + [atom-ternjs](https://atom.io/packages/atom-ternjs) 对ES5，ES6进行支持
```
apm install atom-ternjs
```
> +  [autocomplete-paths](https://atom.io/packages/autocomplete-paths) 对文件路径进行提示，一级好用
```
apm install autocomplete-paths
```
> + [emmet](https://atom.io/packages/emmet) 前端必备插件，在mac上无法使用tab键，使用shift+command+e，内置计算器简直好用，强，无敌
```
apm install emmet
```
> + [file-icons](https://atom.io/packages/file-icons) 添加文件icon，美观用
```
apm install file-icons
```
> + [git-control](https://atom.io/packages/git-control) 提供一个git的GUI界面进行操作
```
apm install git-control
```
> + [language-stylus](https://atom.io/packages/language-stylus) stylus,强，无敌，js语法的css预处理语言，爱写冒号写冒号，爱写分号写分号，一句写一句不写也行，变量条件语句都是js语法方便
```
apm install language-stylus
```
> + [minimap](https://atom.io/packages/minimap) 类似sublime的代码小地图，其实没什么用，而且我装完了确实不显示，不知道为啥
```
apm install minimap
```
> + [pigments](https://atom.io/packages/pigments) 颜色提示插件，有各种样式供选择，直观地在样式文件里面显示颜色
```
apm install pigments
```
> + [platformio-ide-terminal](https://atom.io/packages/platformio-ide-terminal) 在atom里面运行terminal，啊，装了terminal-plus发现无法输入，才换了这个
```
apm install platformio-ide-terminal
```
> 一些angular和Vue的插件就略过了，需要的时候再装
