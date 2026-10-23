# AI 与大模型笔记

个人文章站点：<https://ypl2000.github.io>

纯静态站点，无框架依赖。文章源文件在 `src/`，运行 `python build.py` 重新生成全部页面（依赖 pandoc）。

## 新增文章

1. 文章 md 放入 `src/`，图片放入 `src/img/`；
2. 在 `build.py` 的 `ARTICLES` 列表中登记文件名、标题、日期、简介；
3. `python build.py` 重新生成，提交推送到 GitHub 后 Pages 自动更新。

## 目录结构

```
├── build.py           # 生成器（pandoc + Python）
├── src/               # 内容源文件（markdown 与原始图片）
├── assets/            # 样式表与图片（构建产物）
├── index.html         # 首页（构建产物）
└── *.html             # 文章页（构建产物）
```
