---
layout: doc
outline: deep
title: 文字流光效果
description: animation-direction marquee-words
---
<FlipWords :words="['animation-direction']"/>

## 前言

通过`animation-direction`实现文字流光效果

### `animation-direction`属性

| 值      | 描述 |
| ----------- | ----------- |
| normal (默认)      | 动画正向播放，每次循环从头开始       |
| reverse   | 动画反向播放，每次循环从终点开始        |
| alternate   | 动画在奇数次正向播放，偶数次反向播放（形成往返效果）        |
| alternate-reverse   | 动画在奇数次反向播放，偶数次正向播放        |


## 代码实现
```vue 
<template>
  <h3 class="marquee-words">
    <span
      class="char"
      v-for="(char, index) in words"
      :key="char"
      :style="{ animationDelay: `${index * 0.2}s` }">
      {{ char }}
    </span>
  </h3>
</template>

<script setup lang="ts">
  const props = defineProps<{
    words: string;
  }>();
  const words = ref(props.words);
</script>

<style lang="scss" scoped>
  @keyframes changeColor {
    to {
      color: #000;
    }
  }
  .marquee-words {
    font-size: 32px;
    font-weight: 400;
    line-height: 1;
    margin-right: auto;
    display: flex;
    cursor: default;
  }
  .char {
    color: #fff;
    animation: changeColor 1s infinite ease-in-out alternate forwards;
  }
</style>
```

## 使用示例

<MarqueeWords words="MarqueeWords"/>


```vue
<MarqueeWords words="MarqueeWords"/>
```

---
::: info 参考资料
[animation-direction](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-direction)
:::
