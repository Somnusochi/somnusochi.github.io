---
outline: deep
---
<FlipWords :words="['文字粒子效果组件','FlipWords']"/>

## 前言

在进行前端动画效果调研时，发现一个基于`React`实现的文字粒子动画效果。该效果通过`framer-motion`动画库实现文字切换时的粒子飘散效果，具有以下技术特点：

1. 分层动画体系：字符级入场动画 + 容器级离场动画
2. 时间轴控制：通过延迟(delay)实现逐字动画序列
3. 物理动画引擎：采用`spring`物理模型实现自然运动效果

为将其接入`Vue`技术栈项目，现进行技术方案改造和组件化封装。

## 原理解析

### React实现方案

```tsx
"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
}: {
  words: string[];
  duration?: number;
}) => {
  // 状态管理
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  // 动画切换逻辑
  const startAnimation = useCallback(() => {
    const nextIndex = (words.indexOf(currentWord) + 1) % words.length;
    setCurrentWord(words[nextIndex]);
    setIsAnimating(true);
  }, [currentWord, words]);

  // 定时器控制
  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(startAnimation, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
      {/* 容器动画 */}
      <motion.div 
        key={currentWord}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40, x:40, filter: "blur(8px)", scale:2 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        {/* 逐词动画 */}
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word+wordIndex}
            transition={{ delay: wordIndex * 0.3 }}
          >
            {/* 逐字动画 */}
            {[...word].map((char, charIndex) => (
              <motion.span
                key={char+charIndex}
                transition={{ delay: wordIndex*0.3 + charIndex*0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
```

实现亮点：

1. 双状态管理：`currentWord`控制当前显示词汇，`isAnimating`跟踪动画状态
2. 时序控制：通过`setTimeout`实现非阻塞动画序列
3. 复合动画：

- 容器级：Y轴位移 + 透明度 + 模糊滤镜
- 字符级：错峰延迟实现波浪效果

## Vue3实现方案

### 技术选型

采用`motion-v`动画库实现兼容`Vue3`的动画效果，主要优势:

1. 类`Framer Motion API`设计
2. 支持`Composition API`
3. 内置动画队列管理

### 组件实现

```vue
<template>
  <AnimatePresence>
    <motion.div
      class="flip-words"
      :key="currentWord"
      :initial="{
        opacity: 0,
        y: 10,
      }"
      :animate="{
        opacity: 1,
        y: 0,
      }"
      :transition="{
        type: 'spring',
        stiffness: 100,
        damping: 10,
      }"
      :exit="{
        opacity: 0,
        y: -40,
        x: 40,
        filter: 'blur(10px)',
        scale: 2,
        position: 'absolute',
      }">
      <motion.span
        class="word"
        v-for="(word, wordIndex) in currentWord.split(' ')"
        :key="word + wordIndex"
        :initial="{
          opacity: 0,
          y: 10,
          filter: 'blur(8px)',
        }"
        :animate="{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        }"
        :transition="{
          delay: wordIndex * 0.3,
          duration: 0.3,
        }">
        <motion.span
          class="char"
          v-for="(char, charIndex) in word.split('')"
          :key="char + charIndex"
          :initial="{
            opacity: 0,
            y: 10,
            filter: 'blur(8px)',
          }"
          :animate="{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }"
          :transition="{
            delay: wordIndex * 0.3 + charIndex * 0.05,
            duration: 0.2,
          }">
          {{ char }}
        </motion.span>
        <span class="inline-block">&nbsp;</span>
      </motion.span>
    </motion.div>
  </AnimatePresence>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { AnimatePresence, motion } from 'motion-v';
  const props = defineProps<{
    words: Array<string>;
    duration?: number;
  }>();

  const currentWord = ref(props.words[0] || 'flip');
  const duration = ref(props.duration || 3000);
  let intervalId: NodeJS.Timeout | null = null;

  const startAnimation = () => {
    const wordIndex = props.words.indexOf(currentWord.value);
    const nextWord = props.words[(wordIndex + 1) % props.words.length];
    currentWord.value = nextWord;
  };

  onMounted(() => {
    intervalId = setInterval(startAnimation, duration.value);
  });

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
</script>

<style lang="scss" scoped>
  .flip-words {
    position: relative;
    display: inline-block;
    font-size: 32px;
  }

  .word {
    display: inline-block;
    white-space: nowrap;
  }

  .char {
    display: inline-block;
  }
</style>
```

## 使用示例

<FlipWords
  :words="['动态效果', '交互体验', '粒子动画']"
  :duration="2500"
/>

```vue
<FlipWords
  :words="['动态效果', '交互体验', '粒子动画']"
  :duration="2500"
/>
```

## 总结

本文完整实现了从`React`到`Vue3`的动画组件迁移，关键技术点包括：

1. 动画系统转换：`framer-motion` → `motion-v`
2. 状态管理： `useState` → `ref` + `Composition API`
3. 生命周期： `useEffect` → `onMounted/onUnmounted`
