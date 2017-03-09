---
title: 常用git操作
date: 2016-11-07 19:06:51
tags: git
categories: git
description: 常用的git操作
---
# 常用的git操作
> 
<!-- more -->
## 什么是git
> Git是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。
## 为什么要用git
> Git是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。
## 常用的git命令
> ### [git-clone](https://git-scm.com/docs/git-clone)
克隆项目仓库至新目录
```
git clone [--template=<template_directory>]
	  [-l] [-s] [--no-hardlinks] [-q] [-n] [--bare] [--mirror]
	  [-o <name>] [-b <name>] [-u <upload-pack>] [--reference <repository>]
	  [--dissociate] [--separate-git-dir <git dir>]
	  [--depth <depth>] [--[no-]single-branch]
	  [--recursive | --recurse-submodules] [--[no-]shallow-submodules]
	  [--jobs <n>] [--] <repository> [<directory>]
```
> Eg.
```
git clone https://github.com/Somnusochi/somnusochi.github.io.git
```
> ### [git-init](https://git-scm.com/docs/git-init)
创建新仓库
```
git init [-q | --quiet] [--bare] [--template=<template_directory>]
	  [--separate-git-dir <git dir>]
	  [--shared[=<permissions>]] [directory]
```
> Eg.
```
git init
```
> ### [git-add]()
添加文件
```
git add [--verbose | -v] [--dry-run | -n] [--force | -f] [--interactive | -i] [--patch | -p]
	  [--edit | -e] [--[no-]all | --[no-]ignore-removal | [--update | -u]]
	  [--intent-to-add | -N] [--refresh] [--ignore-errors] [--ignore-missing]
	  [--chmod=(+|-)x] [--] [<pathspec>…​]
```



# 参考文章&链接
> [Pro Git（中文版）](http://git.oschina.net/progit/)
  [git - 简易指南](http://www.bootcss.com/p/git-guide/)
  [Git - Reference](https://git-scm.com/docs)
