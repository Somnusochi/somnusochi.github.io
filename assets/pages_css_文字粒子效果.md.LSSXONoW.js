import{_ as o}from"./chunks/theme.Cda8gEDC.js";import{_ as p,c as e,G as a,am as l,o as t}from"./chunks/framework.m8Ul0eMb.js";const m=JSON.parse('{"title":"文字粒子效果组件","description":"FlipWords 文字粒子效果组件","frontmatter":{"layout":"doc","outline":"deep","title":"文字粒子效果组件","description":"FlipWords 文字粒子效果组件"},"headers":[],"relativePath":"pages/css/文字粒子效果.md","filePath":"pages/css/文字粒子效果.md"}'),c={name:"pages/css/文字粒子效果.md"};function F(r,s,i,y,E,d){const n=o;return t(),e("div",null,[a(n,{words:["文字粒子效果组件","FlipWords"]}),s[0]||(s[0]=l(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>在进行前端动画效果调研时，发现一个基于<code>React</code>实现的文字粒子动画效果。该效果通过<code>framer-motion</code>动画库实现文字切换时的粒子飘散效果，具有以下技术特点：</p><ol><li>分层动画体系：字符级入场动画 + 容器级离场动画</li><li>时间轴控制：通过延迟(delay)实现逐字动画序列</li><li>物理动画引擎：采用<code>spring</code>物理模型实现自然运动效果</li></ol><p>为将其接入<code>Vue</code>技术栈项目，现进行技术方案改造和组件化封装。</p><h2 id="原理解析" tabindex="-1">原理解析 <a class="header-anchor" href="#原理解析" aria-label="Permalink to &quot;原理解析&quot;">​</a></h2><h3 id="react实现方案" tabindex="-1">React实现方案 <a class="header-anchor" href="#react实现方案" aria-label="Permalink to &quot;React实现方案&quot;">​</a></h3><div class="custom-code-block"><div class="terminal-header"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg></div><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki monokai vp-code" tabindex="0"><code><span class="line"><span style="color:#E6DB74;">&quot;use client&quot;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> React, { useCallback, useEffect, useRef, useState } </span><span style="color:#F92672;">from</span><span style="color:#E6DB74;"> &quot;react&quot;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { AnimatePresence, motion, LayoutGroup } </span><span style="color:#F92672;">from</span><span style="color:#E6DB74;"> &quot;framer-motion&quot;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { cn } </span><span style="color:#F92672;">from</span><span style="color:#E6DB74;"> &quot;@/lib/utils&quot;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">export</span><span style="color:#66D9EF;font-style:italic;"> const</span><span style="color:#A6E22E;"> FlipWords</span><span style="color:#F92672;"> =</span><span style="color:#F8F8F2;"> ({</span></span>
<span class="line"><span style="color:#F8F8F2;">  words,</span></span>
<span class="line"><span style="color:#F8F8F2;">  duration </span><span style="color:#F92672;">=</span><span style="color:#AE81FF;"> 3000</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span><span style="color:#F92672;">:</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  words</span><span style="color:#F92672;">:</span><span style="color:#66D9EF;font-style:italic;"> string</span><span style="color:#F8F8F2;">[];</span></span>
<span class="line"><span style="color:#F8F8F2;">  duration</span><span style="color:#F92672;">?:</span><span style="color:#66D9EF;font-style:italic;"> number</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F8F8F2;">}) </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#88846F;">  // 状态管理</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">  const</span><span style="color:#F8F8F2;"> [currentWord, setCurrentWord] </span><span style="color:#F92672;">=</span><span style="color:#A6E22E;"> useState</span><span style="color:#F8F8F2;">(words[</span><span style="color:#AE81FF;">0</span><span style="color:#F8F8F2;">]);</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">  const</span><span style="color:#F8F8F2;"> [isAnimating, setIsAnimating] </span><span style="color:#F92672;">=</span><span style="color:#A6E22E;"> useState</span><span style="color:#F8F8F2;">(</span><span style="color:#AE81FF;">false</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">  // 动画切换逻辑</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">  const</span><span style="color:#F8F8F2;"> startAnimation </span><span style="color:#F92672;">=</span><span style="color:#A6E22E;"> useCallback</span><span style="color:#F8F8F2;">(() </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">    const</span><span style="color:#F8F8F2;"> nextIndex </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> (words.</span><span style="color:#A6E22E;">indexOf</span><span style="color:#F8F8F2;">(currentWord) </span><span style="color:#F92672;">+</span><span style="color:#AE81FF;"> 1</span><span style="color:#F8F8F2;">) </span><span style="color:#F92672;">%</span><span style="color:#F8F8F2;"> words.length;</span></span>
<span class="line"><span style="color:#A6E22E;">    setCurrentWord</span><span style="color:#F8F8F2;">(words[nextIndex]);</span></span>
<span class="line"><span style="color:#A6E22E;">    setIsAnimating</span><span style="color:#F8F8F2;">(</span><span style="color:#AE81FF;">true</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">  }, [currentWord, words]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">  // 定时器控制</span></span>
<span class="line"><span style="color:#A6E22E;">  useEffect</span><span style="color:#F8F8F2;">(() </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F92672;">    if</span><span style="color:#F8F8F2;"> (</span><span style="color:#F92672;">!</span><span style="color:#F8F8F2;">isAnimating) {</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">      const</span><span style="color:#F8F8F2;"> timer </span><span style="color:#F92672;">=</span><span style="color:#A6E22E;"> setTimeout</span><span style="color:#F8F8F2;">(startAnimation, duration);</span></span>
<span class="line"><span style="color:#F92672;">      return</span><span style="color:#F8F8F2;"> () </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#A6E22E;"> clearTimeout</span><span style="color:#F8F8F2;">(timer);</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">  }, [isAnimating, duration, startAnimation]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">  return</span><span style="color:#F8F8F2;"> (</span></span>
<span class="line"><span style="color:#F8F8F2;">    &lt;</span><span style="color:#66D9EF;font-style:italic;">AnimatePresence</span><span style="color:#A6E22E;"> onExitComplete</span><span style="color:#F92672;">={</span><span style="color:#F8F8F2;">() </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#A6E22E;"> setIsAnimating</span><span style="color:#F8F8F2;">(</span><span style="color:#AE81FF;">false</span><span style="color:#F8F8F2;">)</span><span style="color:#F92672;">}</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F92672;">      {</span><span style="color:#88846F;">/* 容器动画 */</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#F8F8F2;">      &lt;</span><span style="color:#66D9EF;font-style:italic;">motion.div</span><span style="color:#F8F8F2;"> </span></span>
<span class="line"><span style="color:#A6E22E;">        key</span><span style="color:#F92672;">={</span><span style="color:#F8F8F2;">currentWord</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#A6E22E;">        initial</span><span style="color:#F92672;">={</span><span style="color:#F8F8F2;">{ opacity: </span><span style="color:#AE81FF;">0</span><span style="color:#F8F8F2;">, y: </span><span style="color:#AE81FF;">10</span><span style="color:#F8F8F2;"> }</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#A6E22E;">        animate</span><span style="color:#F92672;">={</span><span style="color:#F8F8F2;">{ opacity: </span><span style="color:#AE81FF;">1</span><span style="color:#F8F8F2;">, y: </span><span style="color:#AE81FF;">0</span><span style="color:#F8F8F2;"> }</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#A6E22E;">        exit</span><span style="color:#F92672;">={</span><span style="color:#F8F8F2;">{ opacity: </span><span style="color:#AE81FF;">0</span><span style="color:#F8F8F2;">, y: </span><span style="color:#F92672;">-</span><span style="color:#AE81FF;">40</span><span style="color:#F8F8F2;">, x:</span><span style="color:#AE81FF;">40</span><span style="color:#F8F8F2;">, filter: </span><span style="color:#E6DB74;">&quot;blur(8px)&quot;</span><span style="color:#F8F8F2;">, scale:</span><span style="color:#AE81FF;">2</span><span style="color:#F8F8F2;"> }</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#A6E22E;">        transition</span><span style="color:#F92672;">={</span><span style="color:#F8F8F2;">{ type: </span><span style="color:#E6DB74;">&quot;spring&quot;</span><span style="color:#F8F8F2;">, stiffness: </span><span style="color:#AE81FF;">100</span><span style="color:#F8F8F2;">, damping: </span><span style="color:#AE81FF;">10</span><span style="color:#F8F8F2;"> }</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#F8F8F2;">      &gt;</span></span>
<span class="line"><span style="color:#F92672;">        {</span><span style="color:#88846F;">/* 逐词动画 */</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#F92672;">        {</span><span style="color:#F8F8F2;">currentWord.</span><span style="color:#A6E22E;">split</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&quot; &quot;</span><span style="color:#F8F8F2;">).</span><span style="color:#A6E22E;">map</span><span style="color:#F8F8F2;">((</span><span style="color:#FD971F;font-style:italic;">word</span><span style="color:#F8F8F2;">, </span><span style="color:#FD971F;font-style:italic;">wordIndex</span><span style="color:#F8F8F2;">) </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> (</span></span>
<span class="line"><span style="color:#F8F8F2;">          &lt;</span><span style="color:#66D9EF;font-style:italic;">motion.span</span></span>
<span class="line"><span style="color:#A6E22E;">            key</span><span style="color:#F92672;">={</span><span style="color:#F8F8F2;">word</span><span style="color:#F92672;">+</span><span style="color:#F8F8F2;">wordIndex</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#A6E22E;">            transition</span><span style="color:#F92672;">={</span><span style="color:#F8F8F2;">{ delay: wordIndex </span><span style="color:#F92672;">*</span><span style="color:#AE81FF;"> 0.3</span><span style="color:#F8F8F2;"> }</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#F8F8F2;">          &gt;</span></span>
<span class="line"><span style="color:#F92672;">            {</span><span style="color:#88846F;">/* 逐字动画 */</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#F92672;">            {</span><span style="color:#F8F8F2;">[</span><span style="color:#F92672;">...</span><span style="color:#F8F8F2;">word].</span><span style="color:#A6E22E;">map</span><span style="color:#F8F8F2;">((</span><span style="color:#FD971F;font-style:italic;">char</span><span style="color:#F8F8F2;">, </span><span style="color:#FD971F;font-style:italic;">charIndex</span><span style="color:#F8F8F2;">) </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> (</span></span>
<span class="line"><span style="color:#F8F8F2;">              &lt;</span><span style="color:#66D9EF;font-style:italic;">motion.span</span></span>
<span class="line"><span style="color:#A6E22E;">                key</span><span style="color:#F92672;">={</span><span style="color:#F8F8F2;">char</span><span style="color:#F92672;">+</span><span style="color:#F8F8F2;">charIndex</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#A6E22E;">                transition</span><span style="color:#F92672;">={</span><span style="color:#F8F8F2;">{ delay: wordIndex</span><span style="color:#F92672;">*</span><span style="color:#AE81FF;">0.3</span><span style="color:#F92672;"> +</span><span style="color:#F8F8F2;"> charIndex</span><span style="color:#F92672;">*</span><span style="color:#AE81FF;">0.05</span><span style="color:#F8F8F2;"> }</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#F8F8F2;">              &gt;</span></span>
<span class="line"><span style="color:#F92672;">                {</span><span style="color:#F8F8F2;">char</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#F8F8F2;">              &lt;/</span><span style="color:#66D9EF;font-style:italic;">motion.span</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">            ))</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#F8F8F2;">          &lt;/</span><span style="color:#66D9EF;font-style:italic;">motion.span</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">        ))</span><span style="color:#F92672;">}</span></span>
<span class="line"><span style="color:#F8F8F2;">      &lt;/</span><span style="color:#66D9EF;font-style:italic;">motion.div</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">    &lt;/</span><span style="color:#66D9EF;font-style:italic;">AnimatePresence</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">  );</span></span>
<span class="line"><span style="color:#F8F8F2;">};</span></span></code></pre></div></div><p>实现亮点：</p><ol><li>双状态管理：<code>currentWord</code>控制当前显示词汇，<code>isAnimating</code>跟踪动画状态</li><li>时序控制：通过<code>setTimeout</code>实现非阻塞动画序列</li><li>复合动画：</li></ol><ul><li>容器级：Y轴位移 + 透明度 + 模糊滤镜</li><li>字符级：错峰延迟实现波浪效果</li></ul><h2 id="vue3实现方案" tabindex="-1">Vue3实现方案 <a class="header-anchor" href="#vue3实现方案" aria-label="Permalink to &quot;Vue3实现方案&quot;">​</a></h2><h3 id="技术选型" tabindex="-1">技术选型 <a class="header-anchor" href="#技术选型" aria-label="Permalink to &quot;技术选型&quot;">​</a></h3><p>采用<code>motion-v</code>动画库实现兼容<code>Vue3</code>的动画效果，主要优势:</p><ol><li>类<code>Framer Motion API</code>设计</li><li>支持<code>Composition API</code></li><li>内置动画队列管理</li></ol><h3 id="组件实现" tabindex="-1">组件实现 <a class="header-anchor" href="#组件实现" aria-label="Permalink to &quot;组件实现&quot;">​</a></h3><div class="custom-code-block"><div class="terminal-header"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg></div><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki monokai vp-code" tabindex="0"><code><span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#F92672;">template</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">  &lt;</span><span style="color:#F92672;">AnimatePresence</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">    &lt;</span><span style="color:#F92672;">motion.div</span></span>
<span class="line"><span style="color:#A6E22E;">      class</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;flip-words&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">      :key</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;currentWord&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">      :initial</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;{</span></span>
<span class="line"><span style="color:#E6DB74;">        opacity: 0,</span></span>
<span class="line"><span style="color:#E6DB74;">        y: 10,</span></span>
<span class="line"><span style="color:#E6DB74;">      }&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">      :animate</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;{</span></span>
<span class="line"><span style="color:#E6DB74;">        opacity: 1,</span></span>
<span class="line"><span style="color:#E6DB74;">        y: 0,</span></span>
<span class="line"><span style="color:#E6DB74;">      }&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">      :transition</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;{</span></span>
<span class="line"><span style="color:#E6DB74;">        type: &#39;spring&#39;,</span></span>
<span class="line"><span style="color:#E6DB74;">        stiffness: 100,</span></span>
<span class="line"><span style="color:#E6DB74;">        damping: 10,</span></span>
<span class="line"><span style="color:#E6DB74;">      }&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">      :exit</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;{</span></span>
<span class="line"><span style="color:#E6DB74;">        opacity: 0,</span></span>
<span class="line"><span style="color:#E6DB74;">        y: -40,</span></span>
<span class="line"><span style="color:#E6DB74;">        x: 40,</span></span>
<span class="line"><span style="color:#E6DB74;">        filter: &#39;blur(10px)&#39;,</span></span>
<span class="line"><span style="color:#E6DB74;">        scale: 2,</span></span>
<span class="line"><span style="color:#E6DB74;">        position: &#39;absolute&#39;,</span></span>
<span class="line"><span style="color:#E6DB74;">      }&quot;</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">      &lt;</span><span style="color:#F92672;">motion.span</span></span>
<span class="line"><span style="color:#A6E22E;">        class</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;word&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">        v-for</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;(word, wordIndex) in currentWord.split(&#39; &#39;)&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">        :key</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;word + wordIndex&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">        :initial</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;{</span></span>
<span class="line"><span style="color:#E6DB74;">          opacity: 0,</span></span>
<span class="line"><span style="color:#E6DB74;">          y: 10,</span></span>
<span class="line"><span style="color:#E6DB74;">          filter: &#39;blur(8px)&#39;,</span></span>
<span class="line"><span style="color:#E6DB74;">        }&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">        :animate</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;{</span></span>
<span class="line"><span style="color:#E6DB74;">          opacity: 1,</span></span>
<span class="line"><span style="color:#E6DB74;">          y: 0,</span></span>
<span class="line"><span style="color:#E6DB74;">          filter: &#39;blur(0px)&#39;,</span></span>
<span class="line"><span style="color:#E6DB74;">        }&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">        :transition</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;{</span></span>
<span class="line"><span style="color:#E6DB74;">          delay: wordIndex * 0.3,</span></span>
<span class="line"><span style="color:#E6DB74;">          duration: 0.3,</span></span>
<span class="line"><span style="color:#E6DB74;">        }&quot;</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">        &lt;</span><span style="color:#F92672;">motion.span</span></span>
<span class="line"><span style="color:#A6E22E;">          class</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;char&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">          v-for</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;(char, charIndex) in word.split(&#39;&#39;)&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">          :key</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;char + charIndex&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">          :initial</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;{</span></span>
<span class="line"><span style="color:#E6DB74;">            opacity: 0,</span></span>
<span class="line"><span style="color:#E6DB74;">            y: 10,</span></span>
<span class="line"><span style="color:#E6DB74;">            filter: &#39;blur(8px)&#39;,</span></span>
<span class="line"><span style="color:#E6DB74;">          }&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">          :animate</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;{</span></span>
<span class="line"><span style="color:#E6DB74;">            opacity: 1,</span></span>
<span class="line"><span style="color:#E6DB74;">            y: 0,</span></span>
<span class="line"><span style="color:#E6DB74;">            filter: &#39;blur(0px)&#39;,</span></span>
<span class="line"><span style="color:#E6DB74;">          }&quot;</span></span>
<span class="line"><span style="color:#A6E22E;">          :transition</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;{</span></span>
<span class="line"><span style="color:#E6DB74;">            delay: wordIndex * 0.3 + charIndex * 0.05,</span></span>
<span class="line"><span style="color:#E6DB74;">            duration: 0.2,</span></span>
<span class="line"><span style="color:#E6DB74;">          }&quot;</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">          {{ char }}</span></span>
<span class="line"><span style="color:#F8F8F2;">        &lt;/</span><span style="color:#F92672;">motion.span</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">        &lt;</span><span style="color:#F92672;">span</span><span style="color:#A6E22E;"> class</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;inline-block&quot;</span><span style="color:#F8F8F2;">&gt;</span><span style="color:#AE81FF;">&amp;nbsp;</span><span style="color:#F8F8F2;">&lt;/</span><span style="color:#F92672;">span</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">      &lt;/</span><span style="color:#F92672;">motion.span</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">    &lt;/</span><span style="color:#F92672;">motion.div</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">  &lt;/</span><span style="color:#F92672;">AnimatePresence</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">&lt;/</span><span style="color:#F92672;">template</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#F92672;">script</span><span style="color:#A6E22E;"> setup</span><span style="color:#A6E22E;"> lang</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;ts&quot;</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F92672;">  import</span><span style="color:#F8F8F2;"> { ref, onMounted, onUnmounted } </span><span style="color:#F92672;">from</span><span style="color:#E6DB74;"> &#39;vue&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">  import</span><span style="color:#F8F8F2;"> { AnimatePresence, motion } </span><span style="color:#F92672;">from</span><span style="color:#E6DB74;"> &#39;motion-v&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">  const</span><span style="color:#F8F8F2;"> props </span><span style="color:#F92672;">=</span><span style="color:#A6E22E;"> defineProps</span><span style="color:#F8F8F2;">&lt;{</span></span>
<span class="line"><span style="color:#F8F8F2;">    words</span><span style="color:#F92672;">:</span><span> </span><span style="color:#A6E22E;text-decoration:underline;">Array</span><span style="color:#F8F8F2;">&lt;</span><span style="color:#66D9EF;font-style:italic;">string</span><span style="color:#F8F8F2;">&gt;;</span></span>
<span class="line"><span style="color:#F8F8F2;">    duration</span><span style="color:#F92672;">?:</span><span style="color:#66D9EF;font-style:italic;"> number</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F8F8F2;">  }&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">  const</span><span style="color:#F8F8F2;"> currentWord </span><span style="color:#F92672;">=</span><span style="color:#A6E22E;"> ref</span><span style="color:#F8F8F2;">(props.words[</span><span style="color:#AE81FF;">0</span><span style="color:#F8F8F2;">] </span><span style="color:#F92672;">||</span><span style="color:#E6DB74;"> &#39;flip&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">  const</span><span style="color:#F8F8F2;"> duration </span><span style="color:#F92672;">=</span><span style="color:#A6E22E;"> ref</span><span style="color:#F8F8F2;">(props.duration </span><span style="color:#F92672;">||</span><span style="color:#AE81FF;"> 3000</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">  let</span><span style="color:#F8F8F2;"> intervalId</span><span style="color:#F92672;">:</span><span> </span><span style="color:#A6E22E;text-decoration:underline;">NodeJS</span><span style="color:#F8F8F2;">.</span><span style="color:#A6E22E;text-decoration:underline;">Timeout</span><span style="color:#F92672;"> |</span><span style="color:#66D9EF;font-style:italic;"> null</span><span style="color:#F92672;"> =</span><span style="color:#AE81FF;"> null</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">  const</span><span style="color:#A6E22E;"> startAnimation</span><span style="color:#F92672;"> =</span><span style="color:#F8F8F2;"> () </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">    const</span><span style="color:#F8F8F2;"> wordIndex </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> props.words.</span><span style="color:#A6E22E;">indexOf</span><span style="color:#F8F8F2;">(currentWord.value);</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">    const</span><span style="color:#F8F8F2;"> nextWord </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> props.words[(wordIndex </span><span style="color:#F92672;">+</span><span style="color:#AE81FF;"> 1</span><span style="color:#F8F8F2;">) </span><span style="color:#F92672;">%</span><span style="color:#F8F8F2;"> props.words.length];</span></span>
<span class="line"><span style="color:#F8F8F2;">    currentWord.value </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> nextWord;</span></span>
<span class="line"><span style="color:#F8F8F2;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6E22E;">  onMounted</span><span style="color:#F8F8F2;">(() </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">    intervalId </span><span style="color:#F92672;">=</span><span style="color:#A6E22E;"> setInterval</span><span style="color:#F8F8F2;">(startAnimation, duration.value);</span></span>
<span class="line"><span style="color:#F8F8F2;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6E22E;">  onUnmounted</span><span style="color:#F8F8F2;">(() </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F92672;">    if</span><span style="color:#F8F8F2;"> (intervalId) {</span></span>
<span class="line"><span style="color:#A6E22E;">      clearInterval</span><span style="color:#F8F8F2;">(intervalId);</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">  });</span></span>
<span class="line"><span style="color:#F8F8F2;">&lt;/</span><span style="color:#F92672;">script</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#F92672;">style</span><span style="color:#A6E22E;"> lang</span><span style="color:#F8F8F2;">=</span><span style="color:#E6DB74;">&quot;scss&quot;</span><span style="color:#A6E22E;"> scoped</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">  .flip-words {</span></span>
<span class="line"><span style="color:#F8F8F2;">    position: relative;</span></span>
<span class="line"><span style="color:#F8F8F2;">    display: inline-block;</span></span>
<span class="line"><span style="color:#F8F8F2;">    font-size: 32px;</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">  .word {</span></span>
<span class="line"><span style="color:#F8F8F2;">    display: inline-block;</span></span>
<span class="line"><span style="color:#F8F8F2;">    white-space: nowrap;</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">  .char {</span></span>
<span class="line"><span style="color:#F8F8F2;">    display: inline-block;</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">&lt;/</span><span style="color:#F92672;">style</span><span style="color:#F8F8F2;">&gt;</span></span></code></pre></div></div><h2 id="使用示例" tabindex="-1">使用示例 <a class="header-anchor" href="#使用示例" aria-label="Permalink to &quot;使用示例&quot;">​</a></h2>`,17)),a(n,{words:["动态效果","交互体验","粒子动画"],duration:2500}),s[1]||(s[1]=l(`<div class="custom-code-block"><div class="terminal-header"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg></div><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki monokai vp-code" tabindex="0"><code><span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#F92672;">FlipWords</span></span>
<span class="line"><span style="color:#F8F8F2;">  :</span><span style="color:#A6E22E;">words</span><span style="color:#F8F8F2;">=</span><span style="color:#F8F8F2;">&quot;</span><span style="color:#F8F8F2;">[</span><span style="color:#E6DB74;">&#39;动态效果&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E6DB74;">&#39;交互体验&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E6DB74;">&#39;粒子动画&#39;</span><span style="color:#F8F8F2;">]</span><span style="color:#F8F8F2;">&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">  :</span><span style="color:#A6E22E;">duration</span><span style="color:#F8F8F2;">=</span><span style="color:#F8F8F2;">&quot;</span><span style="color:#AE81FF;">2500</span><span style="color:#F8F8F2;">&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">/&gt;</span></span></code></pre></div></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>本文完整实现了从<code>React</code>到<code>Vue3</code>的动画组件迁移，关键技术点包括：</p><ol><li>动画系统转换：<code>framer-motion</code> → <code>motion-v</code></li><li>状态管理： <code>useState</code> → <code>ref</code> + <code>Composition API</code></li><li>生命周期： <code>useEffect</code> → <code>onMounted/onUnmounted</code></li></ol><hr><div class="info custom-block"><p class="custom-block-title">参考资料</p><p><a href="https://ui.aceternity.com/components/flip-words" target="_blank" rel="noreferrer">flip-words</a> -A component that flips through a list of words</p><p><a href="https://motion.dev/" target="_blank" rel="noreferrer">Motion</a> -A modern animation library for JavaScript and React</p><p><a href="https://motion.seacoly.me/" target="_blank" rel="noreferrer">Motion Vue</a> -Build beautiful motion-driven interfaces with Vue.js based on motion. Simple, powerful, and performant animations for modern web applications.</p></div>`,6))])}const A=p(c,[["render",F]]);export{m as __pageData,A as default};
