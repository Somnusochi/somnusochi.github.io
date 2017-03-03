---
title: Effective-JavaScript读书笔记（二）
date: 2016-11-30 13:44:32
tags: JavaScript
categories: JavaScript
description: 多读书，多看报，少打游戏，多睡觉
---
# Effective JavaScript
> 忙着公司的项目，终于自己亲自玩了玩webpack，隔了四天有空写笔记二了
<!-- more -->
## 理解JavaScript的浮点数
> 大多数编程语言都有几种数值型数据类型，但是JavaScript只有一种数值类型，我们可以使用type of运算符查看数字的类型。
```
  type of 17; //"number"
  type of 98.6; //"number"
  type of -2.1; //"number"
```
> 当我们进行浮点数运算时，浮点运算只能产生近似的结果，四舍五入到最接近的可表示的实数。当我们执行一系列的运算后，随着摄入误差的积累，运算结果会越来越不准确。
```
  0.1 + 0.2; //0.30000000000000004
  (0.1 + 0.2) + 0.3; //0.6000000000000001
  0.1 + (0.2 + 0.3); //0.6
```
> 我们可以尽可能采用整数值运算，因为整数在表示时不需要舍入，当进行货币相关的计算时，我们可以按比例将数值转化为最小的货币单位来表示再进行计算，这样就可以以整数进行计算。
```
  (10 + 20) + 30; //60
  10 + (20 + 30); //60
```
> 对于整数运算，虽然不用担心舍入误差，但是计算范围只适用于-2<sup>53</sup>~2<sup>53</sup>的整数。
## 当心隐式的强制转换
> JavaScript对类型错误出奇宽容。
```
  3 + true; //4
```
> 如上所示，JavaScript能顺利产生运算结果4。在JavaScript中有一些极少数的情况，提供错误的类型会产生一个即时错误。例如，调用一个非函数对象(nonfunction)或试图选择null的属性。
```
  "hello"(1); //Uncaught TypeError: "hello" is not a function(…)
  null.x; //Uncaught TypeError: Cannot read property 'x' of null(…)
```
> 在大多数情况下，JavaScript不会抛出错误，而是按照多种多样的自动转换协议将值强制转换为期望的类型。算数运算符-、*、/、%在计算之前都会尝试将参数转换为数字。算数运算符+，是数字相加还是字符串连接取决与其参数类型,但JavaScript更偏爱字符串。
```
  数值与数值相加时
  2 + 3; //5
  字符串与字符串相连时
  "hello" + "world"; //"hello world"
  字符串与数值相连时
  "2" + 3; //"23"
  数值与字符串相连时
  2 + "3"; //"23"
```
> 当进行混合表达式时，JavaScript对操作顺序是敏感的。
```
  1 + 2 + "3"; //"33"
  1 + "2" + 3; //"123"
```
> 位运算符不仅会将操作数转换为数字，而且还会将操作数转换为32位整数。
```
  "17" * 3; //51
  "8" | "1"; //9
```
> 强制转换隐藏的错误。
+ 结果为null的变量在算术运算中不会导致失败，而是被隐式地转换为0；
+ 一个未定义的变量将被转换为特殊浮点数值NaN(NaN不等于其本身)。
```
  var x = NaN;
  x === NaN; //false
```
> 当对于一个值是数字的情况时，我们可以采用isNaN函数测试它是否是NaN。但是对于其他绝对不是NaN，但会被强制转换为NaN的值，使用isNaN方法是无法区分的。
```
  isNaN("foo"); //true
  isNaN(undefined); //true
  isNaN({}); //true
  isNaN({valueOf: "foo"}); //true
```
> 可以通过检查一个值是否等于其自身的方式来测试该值是否是NaN。
```
  var a = NaN;
  a !== a;          //true

  var b = "foo";
  b !== b;         //false

  var c = undefined;
  c !== c;        //false

  var d = {};
  d !== d;       //false

  var e = { valueOf: "foo"};
  e !== e;      //false

  我们也可以构造一个辅助函数
  function isReallyNaN(x){
    return x !== x;
}
```
