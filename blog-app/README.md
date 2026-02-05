# 📱 Blog PWA - 博客 App

一个 Progressive Web App，可以把博客打包成手机 App！

## ✨ 功能

- 📱 **像原生 App** - 可安装到主屏幕
- 🔄 **离线支持** - Service Worker 缓存
- 🔍 **搜索功能** - 内置搜索框
- 📂 **分类浏览** - 按分类查看文章
- 🌐 **网页内嵌** - 在 App 内直接浏览文章

## 🚀 部署方法

### 方法 1：GitHub Pages（最简单，推荐！）

```bash
# 1. 创建 GitHub 仓库
# 2. 上传所有文件
# 3. 开启 GitHub Pages (Settings → Pages → Deploy from main)
# 4. 访问 https://你的用户名.github.io/仓库名
```

### 方法 2：Vercel

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 部署
vercel

# 3. 绑定自定义域名（可选）
```

### 方法 3：Netlify

```bash
# 1. 拖拽文件夹到 Netlify
# 2. 自动部署完成
# 3. 绑定自定义域名
```

## 📱 安装到手机

1. **iOS (iPhone/iPad)**
   - 用 Safari 打开网站
   - 点击分享按钮 (📤)
   - 选择"添加到主屏幕"
   - 完成！✅

2. **Android**
   - 用 Chrome 打开网站
   - 点击菜单 (⋮)
   - 选择"添加到主屏幕"
   - 完成！✅

## 🔧 配置

编辑 `index.html` 中的配置：

```javascript
const BLOG_CONFIG = {
    name: '你的博客名字',
    url: 'https://你的博客地址',
    description: '博客描述'
};
```

## 📁 文件结构

```
blog-app/
├── index.html          # 主页面
├── manifest.json       # PWA 配置
├── sw.js             # Service Worker
├── icons/            # 图标
│   ├── icon-72.png
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## 🎨 自定义

### 颜色主题

编辑 `index.html` 中的 CSS：

```css
:root {
    --primary: #3b82f6;       # 主色调
    --primary-dark: #2563eb;   # 深色主色调
    --bg: #f8fafc;            # 背景色
    --card: #ffffff;           # 卡片背景
    --text: #1e293b;           # 文字颜色
}
```

### 添加分类

编辑 `index.html` 中的 `categories` div：

```html
<div class="categories">
    <div class="category active">全部</div>
    <div class="category" onclick="filterCategory('tech')">💻 技术</div>
    <div class="category" onclick="filterCategory('life')">🌸 生活</div>
    <!-- 添加更多... -->
</div>
```

### 添加文章

编辑 `index.html` 中的 `articles` 数组：

```javascript
const articles = [
    {
        title: '文章标题',
        excerpt: '文章摘要',
        category: 'tech',  // 分类
        date: '2024-01-15',
        views: '1.2k',
        url: 'https://...article-url'
    }
];
```

## 🔍 高级配置

### Real Favicon Generator

1. 打开 https://realfavicongenerator.net
2. 上传你的 Logo 图片
3. 下载生成的图标
4. 替换 `icons/` 文件夹中的文件
5. 更新 `manifest.json`

### Google Analytics

在 `<head>` 中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXXXX-Y');
</script>
```

## 📦 打包发布

### 发布到 App Store？

PWA 不能直接发布到 App Store，但可以：

1. **使用 PWABuilder** - 把 PWA 打包成 App Store 包
   - 访问 https://www.pwabuilder.com
   - 输入你的 PWA 地址
   - 下载 iOS/Android 包
   - 提交到 App Store / Play Store

2. **使用 Capacitor.js** - 真正的原生包装
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init
   npx cap add ios
   npx cap add android
   ```

## ❓ 问题排查

### 图标不显示？
- 检查 `manifest.json` 中的图标路径
- 确保图标文件存在

### 无法安装？
- 只能用 HTTPS 访问（GitHub Pages 默认是 HTTPS）
- 检查 Service Worker 是否注册

### 离线不工作？
- 确保 Service Worker 已激活
- 检查浏览器控制台错误

## 📄 许可证

MIT License - 随便用！

## 🤝 贡献

欢迎提 Issue 和 PR！

---

**Made with ❤️**
