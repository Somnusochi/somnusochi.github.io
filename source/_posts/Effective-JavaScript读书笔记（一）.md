---
title: Effective JavaScript读书笔记（一）
date: 2016-11-25 10:28:14
tags: JavaScript
categories: JavaScript
description: 多读书，多看报，少打游戏，多睡觉
---
# Effective JavaScript
> 室友推荐的书，试着写一写
<!-- more -->
## 了解你使用的JavaScript版本
### strict mode
+ 什么是严格模式
> ES5中引入了严格模式，使用严格模式，能允许你选择在受限制的JavaScript版本中禁止使用一些JavaScript语言中问题较多或易于出错的特性。
```
"use strict"
```
> + Eg1.
```
 function f(x){
    "use strict"
    //TODO
}
```
> + Eg2.
```
function f(x){
    "use strict"
    var arguments = []; //error: redefinition of arguments
}
```
>  Eg2的代码在严格模式下会报错，因为在严格模式下，不允许重定义arguments变量。
+ "use strict"的位置
> "use strict"指令只有在脚本或函数的顶部才能生效，对于脚本连接会变得敏感，例如对于一些大型的应用软件，当使用多个独立的文件，然而部署在产品环境时却需要连接成一个单一的文件。
+ Eg3.
> ```
//file1.js
"use strict"
function f(){
    //TODO
}
//TODO
而另一个文件不是运行与严格模式下：
//file2.js
//no strict-mode directive
function g(){
    var arguments = [];
    //TODO
}
//TODO
```
>  如下我们以file1.js文件开始，那么连接后的代码运行于严格模式下，file2里面的代码就会报错。
+ Eg4.
```
//file1.js
"use strict"
function f(){
    //TODO
}
//TODO
//file2.js
//no strict-mode directive
function f(){
    var arguments = [];//error: redefinition of arguments
    //TODO
}
//TODO
```
>  如下我们以file2.js文件开始，那么连接后的代码运行于非严格模式下。
+ Eg5.
```
//file2.js
//no strict-mode directive
function g(){
    var arguments = [];
    //TODO
}
//TODO
//file1.js
"use strict"
function f(){ //no longer strict
    //TODO
}
//TODO
```
>  上面的两个例子都不能解决当一个文件使用严格模式一个不使用严格模式的连接问题，在自己的项目中，我们可以坚持只使用“严格模式”或“非严格模式”的策略，但如果要编写健壮的代码应对各种各样的代码连接，我们有如下两个可选方案。
+ 方案一
> 不要将进行严格模式检查的文件和不进行严格模式检查的文件连接起来。
+ 方案二
> 如下通过将其自身包裹在立即调用的函数表达式
```
//no strict-mode directive
(function(){
    //file1.js
    "use strict";
    function f(){
        //TODO
    }
    //TODO
})();
(function(){
    //file2.js
    //no strict-mode directive
    function f(){
        var arguments = [];
        //TODO
    }
    //TODO
})();
```
> + 当我们构建代码以获得最大的兼容性时，最简单的方法是在严格模式编写代码，并显式地选择严格模式，如下代码所示。
```
(function(){
    "use strict";
    function f(){
        //TODO
  }
  //TODO
})();
```
> 为了达到更为普遍的兼容性，建议在严格模式下编写代码。


# 参考文章&链接
> [英文版][1]
  [中文版][2]
  [effective-javascript demo][3]



[1]:http://o8qt8c0nf.bkt.clouddn.com/%5BEffective%20JavaScript%2068%20Specific%20Ways%20to%20Harness%20the%20Power%20of%20JavaScript%20%28Effective%20Software%20Development%20Series%29%20by%20David%20Herman%20-%202013%5D.pdf
[2]:http://o8qt8c0nf.bkt.clouddn.com/Effective%20JavaScript%EF%BC%9A%E7%BC%96%E5%86%99%E9%AB%98%E8%B4%A8%E9%87%8FJavaScript%E4%BB%A3%E7%A0%81%E7%9A%8468%E4%B8%AA%E6%9C%89%E6%95%88%E6%96%B9%E6%B3%95%EF%BC%88%E5%B8%A6%E4%B9%A6%E7%AD%BE%E4%B8%AD%E6%96%87%E6%89%AB%E6%8F%8F%E7%89%88%EF%BC%89.pdf
[3]:https://github.com/dreamapplehappy/effective-javascript
