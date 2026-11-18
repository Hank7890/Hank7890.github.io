# hank7890.github.io

侯思涵（Sihan Hou）的个人主页，纯静态站点，托管在 GitHub Pages。

- 在线访问：<https://hank7890.github.io/>（中文） / <https://hank7890.github.io/en.html>（英文）
- 视觉风格参考 [al-folio](https://github.com/alshedivat/al-folio)，用纯 HTML/CSS/JS 复刻，无需 Jekyll 或任何构建工具

## 文件结构

- `index.html` — 中文页
- `en.html` — 英文页
- `assets/css/al-folio.css` — 全部样式（含明暗两套主题变量）
- `assets/js/theme.js` — 明暗模式切换 + 邮箱点击复制
- `assets/img/` — 头像、favicon（足迹地图为内联 SVG，直接写在两个 HTML 里）
- `assets/cv/Sihan_Hou_CV.pdf` — 简历

## 本地预览

```powershell
python -m http.server 8765
```

然后访问 <http://localhost:8765/>。

## 说明

- 明暗模式：跟随系统偏好，手动切换后记入 `localStorage`；`<head>` 内联脚本在渲染前设置主题，避免闪烁。
- 足迹地图：基于省级行政区划边界数据投影简化生成的内联 SVG，配色走 CSS 变量，随主题自动切换，生活过的省份高亮显示。
