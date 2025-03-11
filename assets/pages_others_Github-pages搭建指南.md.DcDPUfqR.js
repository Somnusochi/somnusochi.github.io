import{_ as a}from"./chunks/FlipWords.BNQNPGEl.js";import{_ as l,c as p,G as o,ae as e,o as t}from"./chunks/framework.B94Sjtek.js";const E=JSON.parse('{"title":"GithubPages+VitePress构建指南","description":"github pages vitepress github action","frontmatter":{"layout":"doc","outline":"deep","title":"GithubPages+VitePress构建指南","description":"github pages vitepress github action"},"headers":[],"relativePath":"pages/others/Github-pages搭建指南.md","filePath":"pages/others/Github-pages搭建指南.md"}'),c={name:"pages/others/Github-pages搭建指南.md"};function F(r,s,i,y,d,u){const n=a;return t(),p("div",null,[o(n,{words:["GithubPages+VitePress构建指南"]}),s[0]||(s[0]=e(`<h2 id="背景介绍" tabindex="-1">背景介绍 <a class="header-anchor" href="#背景介绍" aria-label="Permalink to &quot;背景介绍&quot;">​</a></h2><p>本文将介绍如何使用 VitePress 替换原有的 Hexo 搭建个人博客，并部署到 Github Pages。</p><h2 id="vitepress-简介" tabindex="-1">VitePress 简介 <a class="header-anchor" href="#vitepress-简介" aria-label="Permalink to &quot;VitePress 简介&quot;">​</a></h2><p><a href="https://vitepress.dev/zh/" target="_blank" rel="noreferrer">VitePress</a> 是一个基于 Vite 的静态站点生成器(SSG)，具有以下特点：</p><ul><li>极快的开发与构建速度</li><li>基于 Markdown 的内容编写</li><li>Vue3 组件支持</li><li>开箱即用的主题系统</li><li>完全类型化的 API</li></ul><h2 id="项目搭建步骤" tabindex="-1">项目搭建步骤 <a class="header-anchor" href="#项目搭建步骤" aria-label="Permalink to &quot;项目搭建步骤&quot;">​</a></h2><h3 id="_1-环境准备" tabindex="-1">1. 环境准备 <a class="header-anchor" href="#_1-环境准备" aria-label="Permalink to &quot;1. 环境准备&quot;">​</a></h3><p>确保已安装 Node.js (推荐 v18+) 和包管理器（本文使用 pnpm）。</p><h3 id="_2-项目初始化" tabindex="-1">2. 项目初始化 <a class="header-anchor" href="#_2-项目初始化" aria-label="Permalink to &quot;2. 项目初始化&quot;">​</a></h3><div class="custom-code-block"><div class="terminal-header"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg></div><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki monokai vp-code" tabindex="0"><code><span class="line"><span style="color:#88846F;"># 创建项目目录</span></span>
<span class="line"><span style="color:#A6E22E;">mkdir</span><span style="color:#E6DB74;"> my-blog</span><span style="color:#F8F8F2;"> &amp;&amp; </span><span style="color:#66D9EF;">cd</span><span style="color:#E6DB74;"> my-blog</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;"># 初始化项目</span></span>
<span class="line"><span style="color:#A6E22E;">pnpm</span><span style="color:#E6DB74;"> init</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;"># 安装 VitePress</span></span>
<span class="line"><span style="color:#A6E22E;">pnpm</span><span style="color:#E6DB74;"> add</span><span style="color:#AE81FF;"> -D</span><span style="color:#E6DB74;"> vitepress</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;"># 初始化 VitePress</span></span>
<span class="line"><span style="color:#A6E22E;">pnpm</span><span style="color:#E6DB74;"> vitepress</span><span style="color:#E6DB74;"> init</span></span></code></pre></div></div><h3 id="_3-配置说明" tabindex="-1">3. 配置说明 <a class="header-anchor" href="#_3-配置说明" aria-label="Permalink to &quot;3. 配置说明&quot;">​</a></h3><p>主要配置文件位于 <code>.vitepress/config.mts</code>，包含以下核心配置：</p><div class="custom-code-block"><div class="terminal-header"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg></div><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki monokai vp-code" tabindex="0"><code><span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { defineConfig } </span><span style="color:#F92672;">from</span><span style="color:#E6DB74;"> &#39;vitepress&#39;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> AutoImport </span><span style="color:#F92672;">from</span><span style="color:#E6DB74;"> &#39;unplugin-auto-import/vite&#39;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> Components </span><span style="color:#F92672;">from</span><span style="color:#E6DB74;"> &#39;unplugin-vue-components/vite&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">export</span><span style="color:#F92672;"> default</span><span style="color:#A6E22E;"> defineConfig</span><span style="color:#F8F8F2;">({</span></span>
<span class="line"><span style="color:#88846F;">  // 基础配置</span></span>
<span class="line"><span style="color:#F8F8F2;">  title: </span><span style="color:#E6DB74;">&quot;Somnusochi&#39;s Home&quot;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  description: </span><span style="color:#E6DB74;">&quot;Plan-C&quot;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  lang: </span><span style="color:#E6DB74;">&#39;zh-CN&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span></span>
<span class="line"><span style="color:#88846F;">  // 目录配置</span></span>
<span class="line"><span style="color:#F8F8F2;">  srcDir: </span><span style="color:#E6DB74;">&#39;./src&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  outDir: </span><span style="color:#E6DB74;">&#39;./dist&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span></span>
<span class="line"><span style="color:#88846F;">  // Markdown 配置</span></span>
<span class="line"><span style="color:#F8F8F2;">  markdown: {</span></span>
<span class="line"><span style="color:#F8F8F2;">    theme: </span><span style="color:#E6DB74;">&#39;monokai&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">    lineNumbers: </span><span style="color:#AE81FF;">true</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  },</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span></span>
<span class="line"><span style="color:#88846F;">  // 主题配置</span></span>
<span class="line"><span style="color:#F8F8F2;">  themeConfig: {</span></span>
<span class="line"><span style="color:#88846F;">    // https://vitepress.dev/reference/default-theme-config</span></span>
<span class="line"><span style="color:#F8F8F2;">    nav: [</span></span>
<span class="line"><span style="color:#F8F8F2;">      { text: </span><span style="color:#E6DB74;">&#39;Docs&#39;</span><span style="color:#F8F8F2;">, link: </span><span style="color:#E6DB74;">&#39;/&#39;</span><span style="color:#F8F8F2;"> },</span></span>
<span class="line"><span style="color:#F8F8F2;">      { text: </span><span style="color:#E6DB74;">&#39;Resume&#39;</span><span style="color:#F8F8F2;">, link: </span><span style="color:#E6DB74;">&#39;/resume&#39;</span><span style="color:#F8F8F2;"> }</span></span>
<span class="line"><span style="color:#F8F8F2;">    ],</span></span>
<span class="line"><span style="color:#F8F8F2;">    sidebar: [</span></span>
<span class="line"><span style="color:#F8F8F2;">      {</span></span>
<span class="line"><span style="color:#F8F8F2;">        text: </span><span style="color:#E6DB74;">&#39;Javascript&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">        items: [</span></span>
<span class="line"><span style="color:#F8F8F2;">          { text: </span><span style="color:#E6DB74;">&#39;Markdown Examples&#39;</span><span style="color:#F8F8F2;">, link: </span><span style="color:#E6DB74;">&#39;/javascript/markdown-examples&#39;</span><span style="color:#F8F8F2;"> },</span></span>
<span class="line"><span style="color:#F8F8F2;">          { text: </span><span style="color:#E6DB74;">&#39;Runtime API Examples&#39;</span><span style="color:#F8F8F2;">, link: </span><span style="color:#E6DB74;">&#39;/javascript/api-examples&#39;</span><span style="color:#F8F8F2;"> }</span></span>
<span class="line"><span style="color:#F8F8F2;">        ]</span></span>
<span class="line"><span style="color:#F8F8F2;">      },</span></span>
<span class="line"><span style="color:#F8F8F2;">      {</span></span>
<span class="line"><span style="color:#F8F8F2;">        text: </span><span style="color:#E6DB74;">&#39;CSS&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">        items: [</span></span>
<span class="line"><span style="color:#F8F8F2;">          { text: </span><span style="color:#E6DB74;">&#39;Markdown Examples&#39;</span><span style="color:#F8F8F2;">, link: </span><span style="color:#E6DB74;">&#39;/css/markdown-examples&#39;</span><span style="color:#F8F8F2;"> },</span></span>
<span class="line"><span style="color:#F8F8F2;">          { text: </span><span style="color:#E6DB74;">&#39;Runtime API Examples&#39;</span><span style="color:#F8F8F2;">, link: </span><span style="color:#E6DB74;">&#39;/css/api-examples&#39;</span><span style="color:#F8F8F2;"> }</span></span>
<span class="line"><span style="color:#F8F8F2;">        ]</span></span>
<span class="line"><span style="color:#F8F8F2;">      },</span></span>
<span class="line"><span style="color:#F8F8F2;">      {</span></span>
<span class="line"><span style="color:#F8F8F2;">        text: </span><span style="color:#E6DB74;">&#39;HTML&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">        items: [</span></span>
<span class="line"><span style="color:#F8F8F2;">          { text: </span><span style="color:#E6DB74;">&#39;Markdown Examples&#39;</span><span style="color:#F8F8F2;">, link: </span><span style="color:#E6DB74;">&#39;/html/markdown-examples&#39;</span><span style="color:#F8F8F2;"> },</span></span>
<span class="line"><span style="color:#F8F8F2;">          { text: </span><span style="color:#E6DB74;">&#39;Runtime API Examples&#39;</span><span style="color:#F8F8F2;">, link: </span><span style="color:#E6DB74;">&#39;/html/api-examples&#39;</span><span style="color:#F8F8F2;"> }</span></span>
<span class="line"><span style="color:#F8F8F2;">        ]</span></span>
<span class="line"><span style="color:#F8F8F2;">      },</span></span>
<span class="line"><span style="color:#F8F8F2;">      {</span></span>
<span class="line"><span style="color:#F8F8F2;">        text: </span><span style="color:#E6DB74;">&#39;Others&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">        items: [</span></span>
<span class="line"><span style="color:#F8F8F2;">          { text: </span><span style="color:#E6DB74;">&#39;Github-pages搭建指南&#39;</span><span style="color:#F8F8F2;">, link: </span><span style="color:#E6DB74;">&#39;/others/github-pages-guide&#39;</span><span style="color:#F8F8F2;"> },</span></span>
<span class="line"><span style="color:#F8F8F2;">        ]</span></span>
<span class="line"><span style="color:#F8F8F2;">      },</span></span>
<span class="line"><span style="color:#F8F8F2;">      {</span></span>
<span class="line"><span style="color:#F8F8F2;">        items: [</span></span>
<span class="line"><span style="color:#F8F8F2;">          { text: </span><span style="color:#E6DB74;">&#39;Resume&#39;</span><span style="color:#F8F8F2;">, link: </span><span style="color:#E6DB74;">&#39;/resume&#39;</span><span style="color:#F8F8F2;"> }</span></span>
<span class="line"><span style="color:#F8F8F2;">        ]</span></span>
<span class="line"><span style="color:#F8F8F2;">      }</span></span>
<span class="line"><span style="color:#F8F8F2;">    ],</span></span>
<span class="line"><span style="color:#F8F8F2;">    socialLinks: [</span></span>
<span class="line"><span style="color:#F8F8F2;">      { icon: </span><span style="color:#E6DB74;">&#39;github&#39;</span><span style="color:#F8F8F2;">, link: </span><span style="color:#E6DB74;">&#39;https://github.com/Somnusochi&#39;</span><span style="color:#F8F8F2;"> }</span></span>
<span class="line"><span style="color:#F8F8F2;">    ],</span></span>
<span class="line"><span style="color:#F8F8F2;">    docFooter: {</span></span>
<span class="line"><span style="color:#F8F8F2;">      prev: </span><span style="color:#E6DB74;">&#39;上一页&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">      next: </span><span style="color:#E6DB74;">&#39;下一页&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">    },</span></span>
<span class="line"><span style="color:#F8F8F2;">    outline: {</span></span>
<span class="line"><span style="color:#F8F8F2;">      label: </span><span style="color:#E6DB74;">&#39;本页目录&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">    },</span></span>
<span class="line"><span style="color:#F8F8F2;">    footer: {</span></span>
<span class="line"><span style="color:#F8F8F2;">      message: </span><span style="color:#E6DB74;">&#39;With simple hearts, do what you love.&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">      copyright: </span><span style="color:#E6DB74;">\`Copyright © 2016-</span><span style="color:#F92672;">\${</span><span style="color:#F92672;">new</span><span style="color:#A6E22E;"> Date</span><span style="color:#F8F8F2;">().</span><span style="color:#A6E22E;">getFullYear</span><span style="color:#F8F8F2;">()</span><span style="color:#F92672;">}</span><span style="color:#E6DB74;"> &lt;a href=&quot;https://github.com/Somnusochi&quot;&gt;Somnusochi&lt;/a&gt;\`</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">  },</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span></span>
<span class="line"><span style="color:#88846F;">  // Vite 插件配置</span></span>
<span class="line"><span style="color:#F8F8F2;">  vite: {</span></span>
<span class="line"><span style="color:#F8F8F2;">    plugins: [</span></span>
<span class="line"><span style="color:#A6E22E;">      AutoImport</span><span style="color:#F8F8F2;">({</span></span>
<span class="line"><span style="color:#F8F8F2;">        imports: [</span><span style="color:#E6DB74;">&#39;vue&#39;</span><span style="color:#F8F8F2;">],</span></span>
<span class="line"><span style="color:#F8F8F2;">        dts: </span><span style="color:#E6DB74;">&#39;auto-imports.d.ts&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">      }),</span></span>
<span class="line"><span style="color:#A6E22E;">      Components</span><span style="color:#F8F8F2;">({</span></span>
<span class="line"><span style="color:#F8F8F2;">        dirs: [</span></span>
<span class="line"><span style="color:#E6DB74;">          &#39;../src/components&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">        ],</span></span>
<span class="line"><span style="color:#88846F;">        // allow auto load markdown components under \`./src/components/\`</span></span>
<span class="line"><span style="color:#F8F8F2;">        extensions: [</span><span style="color:#E6DB74;">&#39;vue&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E6DB74;">&#39;md&#39;</span><span style="color:#F8F8F2;">],</span></span>
<span class="line"><span style="color:#88846F;">        // allow auto import and register components used in markdown</span></span>
<span class="line"><span style="color:#F8F8F2;">        include: [</span><span style="color:#E6DB74;">/</span><span style="color:#AE81FF;">\\.</span><span style="color:#E6DB74;">vue</span><span style="color:#F92672;">$</span><span style="color:#E6DB74;">/</span><span style="color:#F8F8F2;">,</span><span style="color:#E6DB74;"> /</span><span style="color:#AE81FF;">\\.</span><span style="color:#E6DB74;">vue</span><span style="color:#AE81FF;">\\?</span><span style="color:#E6DB74;">vue/</span><span style="color:#F8F8F2;">,</span><span style="color:#E6DB74;"> /</span><span style="color:#AE81FF;">\\.</span><span style="color:#E6DB74;">md</span><span style="color:#F92672;">$</span><span style="color:#E6DB74;">/</span><span style="color:#F8F8F2;">],</span></span>
<span class="line"><span style="color:#F8F8F2;">        dts: </span><span style="color:#AE81FF;">true</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">      }),</span></span>
<span class="line"><span style="color:#F8F8F2;">    ],</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">})</span></span></code></pre></div></div><h3 id="_4-自动部署配置" tabindex="-1">4. 自动部署配置 <a class="header-anchor" href="#_4-自动部署配置" aria-label="Permalink to &quot;4. 自动部署配置&quot;">​</a></h3><p>在 <code>.github/workflows/deploy.yml</code> 中配置 Github Actions：</p><div class="custom-code-block"><div class="terminal-header"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg></div><div class="language-yml"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki monokai vp-code" tabindex="0"><code><span class="line"><span style="color:#F92672;">name</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">Deploy VitePress site to Pages</span></span>
<span class="line"></span>
<span class="line"><span style="color:#AE81FF;">on</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"><span style="color:#F92672;">  push</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"><span style="color:#F92672;">    branches</span><span style="color:#F8F8F2;">: [</span><span style="color:#E6DB74;">site</span><span style="color:#F8F8F2;">]</span></span>
<span class="line"><span style="color:#F92672;">  workflow_dispatch</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">permissions</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"><span style="color:#F92672;">  contents</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">write</span></span>
<span class="line"><span style="color:#F92672;">  pages</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">write</span></span>
<span class="line"><span style="color:#F92672;">  id-token</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">write</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">jobs</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"><span style="color:#F92672;">  build</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"><span style="color:#F92672;">    runs-on</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">ubuntu-latest</span></span>
<span class="line"><span style="color:#F92672;">    steps</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"><span style="color:#F8F8F2;">      - </span><span style="color:#F92672;">name</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">Checkout</span></span>
<span class="line"><span style="color:#F92672;">        uses</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">actions/checkout@v4</span></span>
<span class="line"><span style="color:#F92672;">        with</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"><span style="color:#F92672;">          fetch-depth</span><span style="color:#F8F8F2;">: </span><span style="color:#AE81FF;">0</span><span style="color:#88846F;"> # 如果未启用 lastUpdated，则不需要</span></span>
<span class="line"><span style="color:#F8F8F2;">      - </span><span style="color:#F92672;">uses</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">pnpm/action-setup@v3</span><span style="color:#88846F;"> # 如果使用 pnpm，请取消此区域注释</span></span>
<span class="line"><span style="color:#F92672;">        with</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"><span style="color:#F92672;">          version</span><span style="color:#F8F8F2;">: </span><span style="color:#AE81FF;">9</span></span>
<span class="line"><span style="color:#88846F;">      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释</span></span>
<span class="line"><span style="color:#F8F8F2;">      - </span><span style="color:#F92672;">name</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">Setup Node</span></span>
<span class="line"><span style="color:#F92672;">        uses</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">actions/setup-node@v4</span></span>
<span class="line"><span style="color:#F92672;">        with</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"><span style="color:#F92672;">          node-version</span><span style="color:#F8F8F2;">: </span><span style="color:#AE81FF;">20</span></span>
<span class="line"><span style="color:#F92672;">          cache</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">pnpm</span><span style="color:#88846F;"> # 或 pnpm / yarn</span></span>
<span class="line"><span style="color:#F8F8F2;">      - </span><span style="color:#F92672;">name</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">Retrieve current Date Time in Shanghai TimeZone</span></span>
<span class="line"><span style="color:#F92672;">        run</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">echo &quot;START_TIME=$(TZ=&quot;:Asia/Shanghai&quot; date -R|sed &#39;s/.....$//&#39;)&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"><span style="color:#F8F8F2;">      - </span><span style="color:#F92672;">name</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">Setup Pages</span></span>
<span class="line"><span style="color:#F92672;">        uses</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">actions/configure-pages@v4</span></span>
<span class="line"><span style="color:#F8F8F2;">      - </span><span style="color:#F92672;">name</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">Install dependencies</span></span>
<span class="line"><span style="color:#F92672;">        run</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">pnpm install</span><span style="color:#88846F;"> # 或 pnpm install / yarn install / bun install</span></span>
<span class="line"><span style="color:#F8F8F2;">      - </span><span style="color:#F92672;">name</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">Build with VitePress</span></span>
<span class="line"><span style="color:#F92672;">        run</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">pnpm run build</span><span style="color:#88846F;"> # 或 pnpm docs:build / yarn docs:build / bun run docs:build</span></span>
<span class="line"><span style="color:#F8F8F2;">      - </span><span style="color:#F92672;">name</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">Upload artifact</span></span>
<span class="line"><span style="color:#F92672;">        uses</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">actions/upload-pages-artifact@v3</span></span>
<span class="line"><span style="color:#F92672;">        with</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"><span style="color:#F92672;">          path</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">dist</span></span>
<span class="line"><span style="color:#F8F8F2;">      - </span><span style="color:#F92672;">name</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">Deploy to master branch</span></span>
<span class="line"><span style="color:#F92672;">        uses</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">JamesIves/github-pages-deploy-action@v4</span></span>
<span class="line"><span style="color:#F92672;">        with</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"><span style="color:#F92672;">          branch</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">master</span><span style="color:#88846F;"> # 目标分支</span></span>
<span class="line"><span style="color:#F92672;">          folder</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">dist</span><span style="color:#88846F;"> # 构建产物目录</span></span>
<span class="line"><span style="color:#F92672;">          token</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">\${{ secrets.ACCESS_TOKEN }}</span><span style="color:#88846F;"> # 使用 GitHub Token</span></span>
<span class="line"><span style="color:#F92672;">          commit-message</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">&#39;Site updated: \${{ env.START_TIME }}🚀&#39;</span><span style="color:#88846F;"> # 提交信息</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">  deploy</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"><span style="color:#F92672;">    environment</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"><span style="color:#F92672;">      name</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">github-pages</span></span>
<span class="line"><span style="color:#F92672;">      url</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">\${{ steps.deployment.outputs.page_url }}</span></span>
<span class="line"><span style="color:#F92672;">    needs</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">build</span></span>
<span class="line"><span style="color:#F92672;">    runs-on</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">ubuntu-latest</span></span>
<span class="line"><span style="color:#F92672;">    name</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">Deploy</span></span>
<span class="line"><span style="color:#F92672;">    steps</span><span style="color:#F8F8F2;">:</span></span>
<span class="line"><span style="color:#F8F8F2;">      - </span><span style="color:#F92672;">name</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">Deploy to GitHub Pages</span></span>
<span class="line"><span style="color:#F92672;">        id</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">deployment</span></span>
<span class="line"><span style="color:#F92672;">        uses</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">actions/deploy-pages@v4</span></span></code></pre></div></div><h2 id="项目结构" tabindex="-1">项目结构 <a class="header-anchor" href="#项目结构" aria-label="Permalink to &quot;项目结构&quot;">​</a></h2><div class="custom-code-block"><div class="terminal-header"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg></div><div class="language-md"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki monokai vp-code" tabindex="0"><code><span class="line"><span style="color:#F8F8F2;">my-blog/</span></span>
<span class="line"><span style="color:#F8F8F2;">├─ package.json</span></span>
<span class="line"><span style="color:#F8F8F2;">├─ .github/</span></span>
<span class="line"><span style="color:#F8F8F2;">│  └─ workflows/</span></span>
<span class="line"><span style="color:#F8F8F2;">│     └─ deploy.yml     # Github Actions配置</span></span>
<span class="line"><span style="color:#F8F8F2;">├─ .vitepress/          # VitePress配置</span></span>
<span class="line"><span style="color:#F8F8F2;">│  ├─ theme/</span></span>
<span class="line"><span style="color:#F8F8F2;">│  │  ├─ index.ts      # 主题入口</span></span>
<span class="line"><span style="color:#F8F8F2;">│  │  └─ style.css     # 自定义样式</span></span>
<span class="line"><span style="color:#F8F8F2;">│  └─ config.mts       # 站点配置</span></span>
<span class="line"><span style="color:#F8F8F2;">└─ src/</span></span>
<span class="line"><span style="color:#F8F8F2;">   ├─ assets/          # 资源文件</span></span>
<span class="line"><span style="color:#F8F8F2;">   ├─ components/      # Vue组件</span></span>
<span class="line"><span style="color:#F8F8F2;">   ├─ public/          # 静态资源</span></span>
<span class="line"><span style="color:#F8F8F2;">   └─ index.md         # 首页内容</span></span></code></pre></div></div><h2 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h2><ol><li>确保 Github 仓库开启了 Pages 功能</li><li>配置正确的部署分支和目录</li><li>设置合适的 Github Token 权限</li></ol><hr><div class="info custom-block"><p class="custom-block-title">参考资料</p><p><a href="https://vitepress.dev/zh/" target="_blank" rel="noreferrer">VitePress 官方文档</a></p><p><a href="https://docs.github.com/en/pages" target="_blank" rel="noreferrer">Github Pages 文档</a></p></div>`,22))])}const D=l(c,[["render",F]]);export{E as __pageData,D as default};
