import { BlogPost, Project } from './types';

export const PROFILE = {
  name: "杨培林",
  title: "IT 专业人士 | AI 实践者",
  bio: "专注于 IT 行业趋势洞察与 AI 技术落地实践。致力于填补算法理论与企业级工程应用之间的鸿沟。",
  location: "中国上海",
  email: "contact@yangpeilin.com",
  socials: {
    linkedin: "https://linkedin.com/in/yangpeilin",
    github: "https://github.com/yangpeilin",
    twitter: "https://twitter.com/yangpeilin"
  }
};

export const TECH_STACK = [
  { name: 'Python', color: 'bg-blue-600' },
  { name: 'PyTorch', color: 'bg-orange-500' },
  { name: 'Docker', color: 'bg-blue-500' },
  { name: 'React/Next.js', color: 'bg-black' },
  { name: 'LangChain', color: 'bg-green-600' },
  { name: 'Gemini API', color: 'bg-purple-600' }
];

export const INSIGHTS: BlogPost[] = [
  {
    id: '1',
    title: 'AI 转型时代的企业架构思考',
    excerpt: '分析传统微服务架构如何演进以适应概率性 AI 智能体和向量数据库。探讨 "RAG-first" 的基础设施建设思路。',
    date: '2024-05-12',
    category: 'Insight',
    tags: ['架构设计', '技术战略', 'LLM']
  },
  {
    id: '2',
    title: '大模型落地中被忽视的工程化细节',
    excerpt: '不止于模型权重：探讨延迟优化、Token 成本管理、幻觉防护栏以及生产环境中严格的评估流水线（Eval Pipelines）。',
    date: '2024-04-28',
    category: 'Insight',
    tags: ['DevOps', '工程化', '生产环境']
  }
];

export const PRACTICES: Project[] = [
  {
    id: 'p1',
    title: '企业知识库 RAG 智能体',
    description: '通过混合检索（关键词+向量）和重排序（Re-ranking）技术实现的上下文搜索引擎，将内部文档检索效率提升了 40%。',
    techStack: ['Python', 'Pinecone', 'Gemini Pro'],
    links: { repo: '#', demo: '#' }
  },
  {
    id: 'p2',
    title: '自动化代码审查助手',
    description: '集成于 CI/CD 流水线，利用微调后的轻量级模型预扫描 PR 中的风格错误和潜在 Bug。',
    techStack: ['GitHub Actions', 'Docker', 'PyTorch'],
    links: { repo: '#', post: '#' }
  }
];

export const SYSTEM_INSTRUCTION = `
你是一个人工智能助手，代表杨培林（Yang Peilin）在他的专业作品集网站上与其访客互动。
你的名字是“杨培林的数字分身”。
杨培林是一位 IT 专业人士和 AI 实践者，专注于行业洞察和 AI 工程化。
他主要使用的技术栈包括 Python, PyTorch, Docker, 和 Next.js。
他撰写关于企业架构演进和 LLM 工程细节的文章。
回答问题时，请使用中文，保持专业、简洁且技术准确的语调。
如果被问及他的具体项目，请提及“企业知识库 RAG 智能体”或“自动化代码审查助手”。
请采用一种知识渊博但平易近人的语气，就像一位资深工程师在指导同行一样。
`;
