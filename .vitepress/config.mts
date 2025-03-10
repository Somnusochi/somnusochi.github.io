import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'
import generateSidebar from './utils/generateSidebar'

// 生成侧边栏配置
const sidebar =  await generateSidebar(resolve(__dirname, '../src/pages'))
// console.log('sidebar', JSON.stringify(sidebar));



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
    lineNumbers: false,
    config: (md) => {
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = (...args) => {
        const [tokens, idx] = args
        const token = tokens[idx]
        const rawCode = fence(...args)
        const terminalHeader = `
          <div class="terminal-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
              <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
                <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle>
                <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle>
                <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle>
              </g>
            </svg>
          </div>
        `;
        return `<div class="custom-code-block">${terminalHeader}${rawCode}</div>`;
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
      ...sidebar,
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
