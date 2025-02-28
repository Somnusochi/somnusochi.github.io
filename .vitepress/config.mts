import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'

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
    config: (md) => {
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = (...args) => {
        const [tokens, idx] = args
        const token = tokens[idx]
        const rawCode = fence(...args)
        return `<div class="custom-code-block">${rawCode}</div>`
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/about' },
      { text: 'Resume', link: '/resume' }
    ],
    sidebar: [
      {
        items: [
          { text: 'About', link: '/about' }
        ]
      },
      {
        text: 'Javascript',
        items: [
          { text: 'QR Code 处理实践', link: '/javascript/qrcode-processing' },
          { text: '水印功能优化', link: '/javascript/watermark' },
        ]
      },
      {
        text: 'CSS',
        items: [
          { text: '文字粒子效果', link: '/css/flip-words' },
          { text: '文字流光效果', link: '/css/marquee-words' },
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
    resolve: {
      alias: {
        '@': resolve(__dirname, '../src'),
      },
    },
  }
})
