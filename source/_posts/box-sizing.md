---
title: box-sizing
date: 2016-11-10 06:09:58
tags: ['box-sizing','css3']
categories: CSS
description: box-sizing理解盒模型
---
# box-sizing
> 写了一年多的html与css以为理解了盒模型，然而并没有。
<!-- more -->
## box-sizing:content-box
> 标准盒模型，对应于一个div块来说，在标准盒模型下，div的宽度不包含border与padding，改变宽度只改变容器内部content的宽度。
## box-sizing：border-box
> 怪异盒模型或者说IE盒模型，在怪异盒模型下，div的宽度包含border与padding，当div宽度不变时，改变div的padding值或者border值会压缩容器内部content的宽度。
