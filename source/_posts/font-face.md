---
title: '@font-face'
date: 2016-11-05 21:49:59
tags: ['css3','css', '@font-face']
categories: CSS
description: 学习CSS3的@font-face属性
---
# @font-face
> 为了实现网页的特殊字体效果，我们可以利用css3的@font-face属性

<!-- more -->

# Browser Support
> ![](/images/@font-face.png)
 <font color=Crimson>\* </font>Edge and IE: The font format only works when set to be "installable".<br><font color=Crimson>\* </font>Firefox: Disabled by default, but can be enabled (need to set a flag to "true" to use WOFF2).

# 属性
>  |属性|可能的值|说明|
  |-|-|-|
  |font-family|name|必需的。定义字体的名称。|
  |src|URL|必需的。定义该字体下载的网址。|
  |font-stretch|normal<br>condensed<br>ultra-condensed<br>extra-condensed<br>semi-condensed<br>expanded<br>semi-expanded<br>extra-expanded<br>ultra-expanded|可选。定义该字体应该如何被拉长。默认值是"normal"。|
  |font-style|normal<br>italic<br>oblique|可选。定义字体样式。默认值是"normal"。|
  |font-weight|normal<br>bold<br>100-900|可选。定义字体粗细。默认值是"normal"。|
  |unicode-range|unicode-range|可选。定义该字体支持Unicode字符的范围。默认值是"ü+0-10 FFFF"。|
  ## Eg.
```
  fontface(family, filename)
    @font-face
      font-family family 设置文本的字体名称
      font-weight normal
      font-style normal
      src url(font-url(filename + '.eot'))
      src url(font-url(filename + '.eot?#iefix')) format('embedded-opentype'),
      url(font-url(filename + '.svg#'+ family)) format('svg'),
      url(font-url(filename + '.woff')) format('woff'),
      url(font-url(filename + '.ttf')) format('truetype')
  ```
# Font Creator
> 为了使字体文件不至于过大可以使用[Font Creator](http://www.zhaozi.cn/html/prog/47.html)创建自己的字体库
  ## 打开需要即将要使用的字体
  ![](/images/font-creator-open.png)
  ## 按 Ctrl+F 寻找需要的字体
  ![](/images/font-creator-search.png)
  ## 新建字体库，插入新字形
  ![](/images/font-creator-new-1.png)
  ## 复制需要的字体
  ![](/images/font-creator-copy.png)
  ## 粘贴至新建的未映射的字形中
  ![](/images/font-creator-paste.png)
  ## 右键原字体的字形属性查阅字码点
  ![](/images/font-creator-set-1.png)
  ## 右键新建的未映射字形字形属性填写字码点，并应用
  ![](/images/font-creator-set-2.png)
  ## 存储新建的字体库
  ![](/images/font-creator-save.png)
  <font color=Crimson>\* </font>由于通过Font Creator新建的字体一般只有ttf与otf格式，我们需要使用Font Squirrel来生成其他对应格式





# Font Squirrel
> 通过[Font Squirrel](http://www.zhaozi.cn/html/prog/47.html)将新生成的字体转化为其他格式
  ## 上传字体，并设置转化参数
  ![](/images/font-squirrel-upload.png)
  ## 下载
  ![](/images/font-squirrel-download.png)

# 设置新建字体
> ```
font-custom-family = "wb-webfont"
font-custom-filename = wb-webfont
fontface(font-custom-family,font-custom-filename)

```
# 显示效果
> ![](/images/@font-face-active.png)

# 参考文章&链接
> [w3schools.com](http://www.w3schools.com/cssref/css3_pr_font-face_rule.asp)
  [runoob.com](http://www.runoob.com/cssref/css3-pr-font-face-rule.html)
  [caniuse.com](http://caniuse.com/#search=%40fon)
  [使用 @font-face 个性化你网站的字体](http://www.asheep.cn/skill/font-face.html)
  [Font Creator](http://www.zhaozi.cn/html/prog/47.html)
  [Font Squirrel](http://www.zhaozi.cn/html/prog/47.html)
