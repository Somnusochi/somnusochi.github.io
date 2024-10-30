import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Somnusochi's Home",
  description: "Plan-C",
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  srcDir: './src',
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
  }
})
