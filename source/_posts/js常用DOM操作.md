---
title: js常用DOM操作
date: 2016-11-10 04:17:34
tags: JavaScript
categories: JavaScript
description: js常用的DOM操作方法
---
# JS常用的DOM操作方法
> 
<!-- more -->
## DOM创建节点
> ```
createElement() 创建元素节点
createTextNode() 创建文本节点
```
## DOM获取节点
> ```
getElementsByTagName() 获取元素值
```
## 删除元素节点
> ```
removeChild() 删除子节点
parentNode.removeChild() 删除当前节点
```
## 替换元素节点
> ```
replaceChild(a,b) 使用a替换b节点
```
## 添加节点
> ```
appendChild(a) 向a节点添加子节点
insertBefore(a) 向a节点之前插入节点
```
## 克隆节点
> ```
cloneNode()
```
## 关于属性
> ```
getAttribute() 获取属性
createAttribute() 来创建新的属性节点
setAttribute() 为一个元素创建一个新的属性
```
## Eg.
> 生成如下html
```
<div class="div">
<p class="childNode">textNode</p>
</div>
```
> 代码如下
```
var div=document.createElement('div');
div.setAttribute('class','div');
var p=document.createElement('p');
p.setAttribute('class','childNode');

p.innerHTML='textNode';

var textNode=document.createTextNode('textNode');
p.appendChild(textNode);


div.document.appendChild(p);
```
> <font color=Crimson>\* </font>innerHTML和createTextNode的区别，两者都可以把一段内容添加到一个节点中，区别是如果这段内容中有html标签时表现就不同了，在createTextNode中会当作文本处理，不会被浏览器解析，但用innerHTML就会被当作HTML代码处理

# 参考文章&链接
> [w3school-XML DOM](http://www.w3school.com.cn/xmldom/)
