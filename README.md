# GinoNotes Blog

这是我的个人博客网站 [ginonotes.com](https://ginonotes.com)，基于现代 Web 技术栈构建，专注于提供清新、整洁的阅读体验。

> 本项目基于 [ChangoMan/nextjs-mdx-blog](https://github.com/ChangoMan/nextjs-mdx-blog) 开发，感谢该项目提供的优秀起点。在此基础上，我们进行了大量定制化开发，包括界面重设计、功能增强和性能优化等。

## 技术栈

- **框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **内容**: [Contentlayer](https://contentlayer.dev/) (MDX)
- **动画**: [Framer Motion](https://www.framer.com/motion/)
- **包管理**: [pnpm](https://pnpm.io/)

## 特性

- 🚀 基于 Next.js 14 App Router 和 React Server Components
- 📝 使用 MDX 编写文章，支持自定义组件
- 🎨 使用 Tailwind CSS 构建的响应式设计
- 🌙 支持深色模式
- 🔍 内置全文搜索功能
- 📊 文章目录自动生成
- 🖼️ 图片优化和渐进式加载
- 🎯 基于分类和标签的文章组织
- 📱 移动端优化

## 开发环境要求

- Node.js 18.17 或更高版本
- pnpm 8.0 或更高版本

## 快速开始

1. 克隆仓库：

```bash
git clone https://github.com/yourusername/ginonotes-blog.git
cd ginonotes-blog
```

2. 安装依赖：

```bash
pnpm install
```

3. 启动开发服务器：

```bash
pnpm dev
```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
.
├── app/                  # Next.js 应用路由
├── components/          # React 组件
├── content/            # MDX 文章和资源
├── lib/                # 工具函数和配置
├── public/             # 静态资源
├── styles/            # 全局样式
├── contentlayer.config.ts  # Contentlayer 配置
├── tailwind.config.ts     # Tailwind 配置
└── next.config.mjs        # Next.js 配置
```

## 写作指南

1. 在 `posts` 目录下创建新的 `.mdx` 文件
2. 添加必要的 frontmatter 信息：

   ```yaml
   ---
   title: 文章标题
   description: 文章描述
   date: 2024-01-01
   category: dev
   tags: tag1, tag2
   cover: /covers/example.jpg
   ---
   ```

3. 使用 MDX 语法编写文章内容

## 部署

项目使用 Vercel 进行部署。每次推送到 main 分支时会自动触发部署。

## 设计规范

查看 [design.md](./design.md) 了解项目的设计规范。

## 开发路线图

查看 [tasks.md](./tasks.md) 了解计划中的功能和改进。
