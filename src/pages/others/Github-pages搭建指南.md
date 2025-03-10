---
layout: doc
outline: deep
title: GithubPages+VitePress构建指南
---
<FlipWords :words="['GithubPages+VitePress构建指南']"/>

## 背景介绍
本文将介绍如何使用 VitePress 替换原有的 Hexo 搭建个人博客，并部署到 Github Pages。

## VitePress 简介
[VitePress](https://vitepress.dev/zh/) 是一个基于 Vite 的静态站点生成器(SSG)，具有以下特点：
- 极快的开发与构建速度
- 基于 Markdown 的内容编写
- Vue3 组件支持
- 开箱即用的主题系统
- 完全类型化的 API

## 项目搭建步骤

### 1. 环境准备
确保已安装 Node.js (推荐 v18+) 和包管理器（本文使用 pnpm）。

### 2. 项目初始化
```shell
# 创建项目目录
mkdir my-blog && cd my-blog

# 初始化项目
pnpm init

# 安装 VitePress
pnpm add -D vitepress

# 初始化 VitePress
pnpm vitepress init
```

### 3. 配置说明
主要配置文件位于 `.vitepress/config.mts`，包含以下核心配置：

```ts
import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  // 基础配置
  title: "Somnusochi's Home",
  description: "Plan-C",
  lang: 'zh-CN',
  
  // 目录配置
  srcDir: './src',
  outDir: './dist',
  
  // Markdown 配置
  markdown: {
    theme: 'monokai',
    lineNumbers: true,
  },
  
  // 主题配置
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/' },
      { text: 'Resume', link: '/resume' }
    ],
    sidebar: [
      {
        text: 'Javascript',
        items: [
          { text: 'Markdown Examples', link: '/javascript/markdown-examples' },
          { text: 'Runtime API Examples', link: '/javascript/api-examples' }
        ]
      },
      {
        text: 'CSS',
        items: [
          { text: 'Markdown Examples', link: '/css/markdown-examples' },
          { text: 'Runtime API Examples', link: '/css/api-examples' }
        ]
      },
      {
        text: 'HTML',
        items: [
          { text: 'Markdown Examples', link: '/html/markdown-examples' },
          { text: 'Runtime API Examples', link: '/html/api-examples' }
        ]
      },
      {
        text: 'Others',
        items: [
          { text: 'Github-pages搭建指南', link: '/others/github-pages-guide' },
        ]
      },
      {
        items: [
          { text: 'Resume', link: '/resume' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Somnusochi' }
    ],
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '本页目录',
    },
    footer: {
      message: 'With simple hearts, do what you love.',
      copyright: `Copyright © 2016-${new Date().getFullYear()} <a href="https://github.com/Somnusochi">Somnusochi</a>`
    }
  },
  
  // Vite 插件配置
  vite: {
    plugins: [
      AutoImport({
        imports: ['vue'],
        dts: 'auto-imports.d.ts',
      }),
      Components({
        dirs: [
          '../src/components',
        ],
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: true,
      }),
    ],
  }
})
```

### 4. 自动部署配置
在 `.github/workflows/deploy.yml` 中配置 Github Actions：

```yml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [site]
  workflow_dispatch:

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      - uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消此区域注释
        with:
          version: 9
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm # 或 pnpm / yarn
      - name: Retrieve current Date Time in Shanghai TimeZone
        run: echo "START_TIME=$(TZ=":Asia/Shanghai" date -R|sed 's/.....$//')" >> $GITHUB_ENV
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: pnpm install # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: pnpm run build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - name: Deploy to master branch
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: master # 目标分支
          folder: dist # 构建产物目录
          token: ${{ secrets.ACCESS_TOKEN }} # 使用 GitHub Token
          commit-message: 'Site updated: ${{ env.START_TIME }}🚀' # 提交信息

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 项目结构
```md
my-blog/
├─ package.json
├─ .github/
│  └─ workflows/
│     └─ deploy.yml     # Github Actions配置
├─ .vitepress/          # VitePress配置
│  ├─ theme/
│  │  ├─ index.ts      # 主题入口
│  │  └─ style.css     # 自定义样式
│  └─ config.mts       # 站点配置
└─ src/
   ├─ assets/          # 资源文件
   ├─ components/      # Vue组件
   ├─ public/          # 静态资源
   └─ index.md         # 首页内容
```

## 注意事项
1. 确保 Github 仓库开启了 Pages 功能
2. 配置正确的部署分支和目录
3. 设置合适的 Github Token 权限

## 参考资源
- [VitePress 官方文档](https://vitepress.dev/zh/)
- [Github Pages 文档](https://docs.github.com/en/pages)
