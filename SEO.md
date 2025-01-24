# SEO 策略和实现方案

## 整体架构

采用 Next.js 14 的最佳实践，通过 `layout.tsx` 和 `metadata` API 来管理 SEO 配置。

### 文件结构

```
src/
├── app/
│   ├── layout.tsx            # 根布局，包含全站默认 SEO 配置
│   ├── posts/
│   │   └── [...slug]/
│   │       └── layout.tsx    # 文章页面的 SEO 配置
│   └── page.tsx             # 首页内容（不包含 SEO 配置）
└── lib/
    └── constants.ts         # SEO 相关常量配置
```

## SEO 配置策略

### 1. 元数据管理

- 使用 `layout.tsx` 集中管理 metadata，避免在 `page.tsx` 中配置
- 根布局提供默认配置和模板
- 子页面通过各自的 layout 覆盖特定配置

### 2. 图片策略

- 所有文章必须包含封面图（cover）
- 封面图尺寸：1200x630 像素
- 使用完整的绝对 URL 路径
- 首页使用默认的 OG 图片：`/images/og.png`

### 3. URL 管理

- 使用 `WEBSITE_HOST_URL` 环境变量管理基础 URL
- 所有链接使用绝对路径
- 确保 canonical URL 正确配置

### 4. 结构化数据

- 使用 Schema.org 标记
- 文章页面使用 `BlogPosting` 类型
- 包含作者、发布日期、修改日期等信息

## 具体实现

### 根布局配置 (app/layout.tsx)

```typescript
export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_HOST_URL),
  title: {
    default: WEBSITE_NAME,
    template: `%s - ${WEBSITE_NAME}`,
  },
  description: WEBSITE_DESCRIPTION,
  openGraph: {
    // ... OG 配置
  },
  twitter: {
    // ... Twitter Card 配置
  },
  // ... 其他配置
}
```

### 文章页面配置 (app/posts/[...slug]/layout.tsx)

```typescript
export async function generateMetadata({ params }: PostLayoutProps): Promise<Metadata> {
    // 获取文章数据
    const post = allPosts.find(...)
    if (!post) return {}

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            // ... 文章特定的 OG 配置
        },
        // ... 其他配置
    }
}
```

## 最佳实践

1. **关注点分离**

   - SEO 配置集中在 layout 文件中
   - 页面组件只关注内容渲染
   - 使用常量文件管理配置值

2. **图片处理**

   - 确保所有图片有正确的尺寸
   - 使用 alt 文本提供图片描述
   - 使用绝对 URL 路径

3. **URL 管理**

   - 所有链接使用绝对路径
   - 正确配置 canonical URL
   - 处理多语言支持（如果需要）

4. **性能优化**
   - 图片优化（使用适当的格式和尺寸）
   - 合理的缓存策略
   - 页面加载性能优化

## 维护建议

1. 定期检查：

   - 使用 Google Search Console 监控性能
   - 检查 404 错误和死链
   - 验证结构化数据

2. 发布新文章时：

   - 确保包含高质量的封面图
   - 填写完整的 meta 信息
   - 测试社交媒体分享效果

3. 工具验证：
   - Facebook Sharing Debugger
   - Twitter Card Validator
   - Google Rich Results Test

## 相关工具

- Google Search Console
- Google Rich Results Test
- Facebook Sharing Debugger
- Twitter Card Validator
- Schema.org Validator
