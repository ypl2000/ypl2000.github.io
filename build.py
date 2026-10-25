# -*- coding: utf-8 -*-
"""
个人网站生成器：读取 src/ 下的 markdown，用 pandoc 转成 HTML 输出到仓库根目录。
用法：python build.py
"""
import re
import shutil
import subprocess
from pathlib import Path

# ── 站点配置 ──────────────────────────────────────────────────
SITE_TITLE = "AI 与大模型笔记"
SITE_DESCRIPTION = "记录 AI 与大模型相关的实践、思考与学习笔记。"
AUTHOR = "ypl2000"                           # 作者署名，显示在文章页与页脚
GITHUB_LINK = ""                             # 可选：GitHub 主页链接

# ── 文章列表（新增文章：md 放进 src/，图片放进 src/img/，在这里加一条）──
ARTICLES = [
    {
        "src": "src/ai4weather.md",
        "out": "ai4weather.html",
        "title": "关于 AI4Weather 的见解",
        "series": "AI + 气象",
        "date": "2025-12-03",
        "summary": "从天气预报业务的三种范式讲起，解读盘古气象大模型，对比业界 AI 气象模型，并给出商业气象的产业观察。",
    },
    {
        "src": "src/life-science-ai.md",
        "out": "life-science-ai.html",
        "title": "生命科学AI模型发展及典型模型解析",
        "series": "AI + 生命科学",
        "date": "2026-10-19",
        "summary": "从生物学研究的核心业务难题出发，梳理 AI 进入生命科学的发展脉络，解析 scVI、Enformer、HyenaDNA、EVO、ESM、AlphaFold 2/3、RFdiffusion 等典型模型的技术思路。",
    },
    {
        "out": "llm-serving/index.html",
        "title": "LLM Serving 系列架构总览",
        "series": "LLM Serving 笔记",
        "date": "2026-10-25",
        "summary": "个人学习笔记（原文转载）：四层架构知识地图梳理 LLM 推理框架全流程——调度、KV Cache、GPU 执行、多卡扩展、模型适配、PD 分离，每层附重难点与相关知识，点击模块跳转详解与原文。",
        "external": True,
        "more": "查看知识地图 →",
    },
]

ROOT = Path(__file__).parent
SRC = ROOT / "src"
ASSETS = ROOT / "assets"

ARTICLE_CSS_BODY = "article-body"  # 文章正文容器 class


def pandoc(md_text: str) -> str:
    p = subprocess.run(["pandoc", "-f", "gfm", "-t", "html5"],
                       input=md_text.encode("utf-8"), capture_output=True, check=True)
    return p.stdout.decode("utf-8")


def fix_fragment(frag: str) -> str:
    """统一引用块样式；本地图片统一指向 assets/。"""
    def classify(m):
        inner = m.group(1)
        cls = "todo" if "【待处理" in inner else "plain"
        return '<blockquote class="%s">%s</blockquote>' % (cls, inner)
    frag = re.sub(r"<blockquote>(.*?)</blockquote>", classify, frag, flags=re.S)

    def img(m):
        src = m.group(1)
        if src.startswith(("http://", "https://", "assets/")):
            return m.group(0)
        name = Path(src.replace("%20", " ")).name
        if not (SRC / "img" / name).exists():
            print(f"  [警告] 缺少图片: src/img/{name}")
        return m.group(0).replace(m.group(1), "assets/" + name)
    frag = re.sub(r'<img src="([^"]+)"', img, frag)
    return frag


def strip_first_h1(frag: str) -> str:
    return re.sub(r"^\s*<h1[^>]*>.*?</h1>\s*", "", frag, count=1, flags=re.S)


def render_page(title: str, description: str, body: str) -> str:
    github = f'<a href="{GITHUB_LINK}" target="_blank" rel="noopener">GitHub</a>' if GITHUB_LINK else ""
    year = 2026
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="{description}">
<meta name="author" content="{AUTHOR}">
<title>{title}</title>
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<header class="topbar">
  <div class="wrap">
    <a class="brand" href="index.html">{SITE_TITLE}</a>
    <nav>{github}</nav>
  </div>
</header>
{body}
<footer class="sitefoot">
  <div class="wrap">© {year} {AUTHOR} · 托管于 GitHub Pages</div>
</footer>
</body>
</html>
"""


def build_article(cfg: dict) -> None:
    md = (ROOT / cfg["src"]).read_text(encoding="utf-8")
    frag = fix_fragment(pandoc(md))
    frag = strip_first_h1(frag)
    body = f"""<main class="wrap">
  <nav class="crumb"><a href="index.html">← 返回首页</a></nav>
  <article class="{ARTICLE_CSS_BODY}">
    <header class="ahead">
      <span class="badge">{cfg['series']}</span>
      <h1>{cfg['title']}</h1>
      <div class="meta">{cfg['date']} · {AUTHOR}</div>
    </header>
    {frag.strip()}
  </article>
</main>"""
    page = render_page(f"{cfg['title']} · {SITE_TITLE}", cfg["summary"], body)
    (ROOT / cfg["out"]).write_text(page, encoding="utf-8")
    print(f"  生成 {cfg['out']}")


def build_index() -> None:
    cards = "\n".join(
        f"""    <a class="card" href="{a['out']}">
      <div class="card-top"><span class="badge">{a['series']}</span><span class="date">{a['date']}</span></div>
      <div class="card-title">{a['title']}</div>
      <div class="card-summary">{a['summary']}</div>
      <div class="card-more">{a.get('more', '阅读全文')} →</div>
    </a>"""
        for a in ARTICLES
    )
    body = f"""<main>
  <section class="hero">
    <div class="wrap">
      <h1>{SITE_TITLE}</h1>
      <p>{SITE_DESCRIPTION}</p>
    </div>
  </section>
  <div class="wrap">
    <h2 class="sec">文章</h2>
    <div class="cards">
{cards}
    </div>
  </div>
</main>"""
    page = render_page(SITE_TITLE, SITE_DESCRIPTION, body)
    (ROOT / "index.html").write_text(page, encoding="utf-8")
    print("  生成 index.html")


def build_assets() -> None:
    ASSETS.mkdir(exist_ok=True)
    for f in (SRC / "img").iterdir():
        shutil.copy(f, ASSETS / f.name)
    print(f"  同步图片 → assets/（{len(list(ASSETS.iterdir()))} 个文件）")


STYLE = """:root{--line:#e5e7eb;--text:#1f2328;--muted:#6b7280;--accent:#0f766e;--teal:#0891b2}
*{box-sizing:border-box}
body{margin:0;background:#f3f4f6;color:var(--text);
  font-family:-apple-system,"Segoe UI","Microsoft YaHei","PingFang SC",Roboto,sans-serif;
  font-size:16px;line-height:1.95}
.wrap{max-width:880px;margin:0 auto;padding:0 22px}
a{color:var(--teal)}
/* 顶栏 */
.topbar{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.9);backdrop-filter:blur(8px);
  border-bottom:1px solid var(--line)}
.topbar .wrap{display:flex;align-items:center;gap:14px;height:52px}
.brand{font-weight:700;color:var(--text);text-decoration:none;font-size:15.5px}
.topbar nav{margin-left:auto;display:flex;gap:14px;font-size:13.5px}
.topbar nav a{color:var(--muted);text-decoration:none}
.topbar nav a:hover{color:var(--accent)}
/* 首页 */
.hero{background:linear-gradient(135deg,#0f172a,#134e4a 90%);color:#e6edf6;padding:64px 0 58px}
.hero h1{margin:0 0 10px;font-size:30px;letter-spacing:.5px}
.hero p{margin:0;color:#b8c7d9;font-size:15px;max-width:640px}
.sec{font-size:20px;margin:40px 0 16px;color:#0f172a}
.cards{display:grid;gap:14px;padding-bottom:64px}
.card{display:block;background:#fff;border:1px solid var(--line);border-radius:14px;
  padding:20px 24px;text-decoration:none;color:var(--text);
  box-shadow:0 1px 3px rgba(15,23,42,.05);transition:transform .15s,box-shadow .15s}
.card:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(15,23,42,.09)}
.card-top{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.card .date{color:var(--muted);font-size:12.5px}
.card-title{font-size:17.5px;font-weight:700;margin-bottom:6px}
.card-summary{font-size:14px;color:var(--muted);line-height:1.8}
.card-more{margin-top:12px;font-size:13px;color:var(--accent);font-weight:600}
.badge{display:inline-block;font-size:12px;font-weight:600;color:var(--accent);
  background:#ecfdf5;border:1px solid #a7f3d0;border-radius:999px;padding:2px 10px}
/* 文章页 */
.crumb{margin:26px 0 4px;font-size:13.5px}
.crumb a{color:var(--muted);text-decoration:none}
.crumb a:hover{color:var(--accent)}
article{max-width:880px;margin:10px auto 70px;background:#fff;border:1px solid var(--line);
  border-radius:16px;padding:44px 52px 36px;box-shadow:0 1px 3px rgba(15,23,42,.06)}
.ahead{margin-bottom:8px}
.ahead h1{font-size:26px;margin:12px 0 6px;letter-spacing:.5px}
.ahead .meta{color:var(--muted);font-size:13.5px;padding-bottom:14px;border-bottom:1px solid var(--line)}
.ahead .badge{margin-top:2px}
article h2{font-size:22px;margin:44px 0 14px;padding-bottom:8px;border-bottom:1px solid var(--line)}
article h3{font-size:19px;margin:34px 0 10px}
article h4{font-size:16.5px;margin:26px 0 8px;color:var(--accent)}
article p{margin:13px 0;text-align:justify}
article a{word-break:break-all}
article img{max-width:100%;display:block;margin:20px auto;border:1px solid var(--line);
  border-radius:10px;background:#f8fafc;min-height:56px;padding:6px}
article em{display:block;text-align:center;color:var(--muted);font-size:13px;margin:-8px 0 18px}
article blockquote{margin:16px 0;border-radius:10px;line-height:1.8}
article blockquote p{margin:4px 0;text-align:left}
article blockquote.todo{background:#fffbeb;border:1px solid #fde68a;border-left:5px solid #f59e0b;
  padding:10px 16px;font-size:14px;color:#78350f}
article blockquote.plain{background:#f8fafc;border:1px solid var(--line);border-left:4px solid #cbd5e1;
  padding:10px 16px;font-size:15px;color:#475569}
/* 页脚 */
.sitefoot{border-top:1px solid var(--line);background:#fff;padding:22px 0;color:var(--muted);font-size:13px}
/* 响应式与打印 */
@media (max-width:720px){article{padding:26px 20px}.hero{padding:44px 0 40px}.hero h1{font-size:24px}}
@media print{body{background:#fff}.topbar,.crumb,.sitefoot{display:none}
  article{border:none;box-shadow:none;margin:0;max-width:100%;padding:0}}
"""


def main() -> None:
    print("构建站点：")
    build_assets()
    build_index()
    for cfg in ARTICLES:
        if cfg.get("external"):
            continue  # 外部页面（如 llm-serving/）由各自脚本生成
        build_article(cfg)
    style = ASSETS / "style.css"
    style.write_text(STYLE, encoding="utf-8")
    (ROOT / ".nojekyll").write_text("", encoding="utf-8")
    print("完成。输出在 site/ 目录，可直接推送 GitHub Pages。")


if __name__ == "__main__":
    main()
