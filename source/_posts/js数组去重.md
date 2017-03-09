---
title: js数组去重
date: 2016-11-10 04:17:56
tags:
categories:
description:
---
# js数组去重方法
> 
```
Array.prototype.unique = function() {
  var res = [];
  var json = {};
  for (var i = 0; i < this.length; i++) {
    if (!json[this[i]]) {
      res.push(this[i]);
      json[this[i]] = 1;
    }
  }
  return res;
}
```
