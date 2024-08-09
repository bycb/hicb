import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// 如果使用 GitHub/Gitee Pages 等公共平台部署
// 通常需要修改 base 路径，通常为“/仓库名/”
// const base = process.env.GITHUB_ACTIONS === 'true'
//   ? '/vitepress-blog-sugar-template/'
//   : '/'
const base = '/'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  base,
  lang: 'zh-cn',
  title: '小巷陌影',
  description: '小巷陌影博客，基于 vitepress 实现',
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    // ['link', { rel: 'icon', href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
    ['link', { rel: 'icon', href: '/myblog.ico' }]
  ],
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: '目录'
    },
    // 默认文案修改
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    lastUpdatedText: '上次更新于',

    // 设置logo
    logo: '/logo.png',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    nav: [
      { text: '首页', link: '/' },
      {
        text: "学习",
        items: [
          { text: "ES6", link: "/note/es6/README.md" },
          { text: "CSS", link: "/note/css/README.md" },
          { text: "TS", link: "/note/ts/README.md" },
        ],
      },
      {
        text: "更多",
        items: [
          {
            text: "明朝那些事儿",
            link: "/more/mingchao/README.md",

          },
          {
            text: "三国演义",
            link: "/more/sanguoyanyi/README.md",

          },
        ],
      },
      { text: '关于', link: '/about.md' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/xxmys'
      }
    ],
    // sidebar: {
    //   '/more/sanguoyanyi/': [
    //     {
    //       text: 'Guide',
    //       items: [
    //         { text: 'Index', link: '/guide/' },
    //         { text: 'One', link: '/guide/one' },
    //         { text: 'Two', link: '/guide/two' }
    //       ]
    //     }
    //   ],
    // }
  }
})
