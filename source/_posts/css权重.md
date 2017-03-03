---
title: css选择器权重
date: 2016-12-23 17:00:36
tags: css
categories: CSS
description: 学习CSS选择器权重
---
# CSS选择器权重
> 看了[things I don't know about CSS](https://img.w3ctech.com/slide/4.20%20things%20I%20didn%E2%80%99t%20know%20about%20CSS.pdf)发现覆盖样式有比important更好的方法，又去学习了一遍CSS选择器的优先级，丢图跑
![](/images/specificitywars-05v2.jpg)

<!-- more -->

## 关于!important
> 之前在使用AmazeUI与Bootstrap时，常常遇见会需要覆盖原生样式的情况，一般情况我们可以添加类去覆盖CSS样式效果，或者通过一样的类名去覆盖样式文件，当我们通过覆盖类发现CSS优先级较低无法覆盖时我们可以使用如下方式
```
.foo .bar {
  color: red;
}
.bar {
  color: green;
}

//bad
.bar {
  color: green !important;
}

//good
.bar.bar{
  color: green;
}
```

# 参考文章&链接
>
  [things I don't know about CSS](https://img.w3ctech.com/slide/4.20%20things%20I%20didn%E2%80%99t%20know%20about%20CSS.pdf)
  [css_specificity_wars](https://stuffandnonsense.co.uk/archives/css_specificity_wars.html)
