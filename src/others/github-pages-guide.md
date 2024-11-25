# Github-pages构建指南

## 前言
之前`github-pages`使用的是用hexo搭建的，准备用`VitePress`进行替换。

## 什么是VitePress
[VitePress](https://vitepress.dev/zh/) 是一个静态站点生成器 (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。

## VitePress配置

1.初始化项目

```shell
pnpm init
```

2.安装VitePress

```shell
pnpm add -D vitepress
```

3.初始化VitePress

```shell
 pnpm vitepress init
```

4.修改`config.mts`配置文件

```ts
import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Somnusochi's Home",
  description: "Plan-C",
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  srcDir: './src',
  outDir: './dist',
  markdown: {
    theme: 'monokai',
    lineNumbers: true,
  },
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
  vite: {
    plugins: [
      AutoImport({
        imports: ['vue'],
        dts: 'auto-imports.d.ts', // 生成类型声明文件
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


## github-pages部署
在根目录新建`.github/workflows`文件夹，添加`deploy.yml`文件
```yml
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
#
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [site]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: write
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
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

  # 部署工作
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

## 文件目录结构

```md
.
├─ package.json
├─ .github 
│  └─ workflows
│     └─ deploy.yml // git-action 配置文件
├─ .vitepress // vitepress 相关文件
│  ├─ theme
│  │   ├─ index.ts
│  │   └─ style.css
│  └─ config.mts // 配置文件
└─ src
   ├─ assets // 内部静态资源
   ├─ components // 组件文件夹
   ├─ css // css主题
   ├─ html // html主题
   ├─ javascript // js主题
   ├─ others // 其他主题
   ├─ public // 静态资源
   └─ index.md
```