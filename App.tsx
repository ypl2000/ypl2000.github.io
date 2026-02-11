import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AIChat from './components/AIChat';
import { View, BlogPost, Project } from './types';
import { INSIGHTS, PRACTICES, PROFILE } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Filter content based on view
  const displayPosts = currentView === 'home' 
    ? [...INSIGHTS, ...PRACTICES.map(p => ({
        id: p.id,
        title: p.title,
        excerpt: p.description,
        date: '项目展示',
        category: 'Practice' as const,
        tags: p.techStack
      }))]
    : currentView === 'insights'
      ? INSIGHTS
      : [];

  const renderContent = () => {
    if (currentView === 'about') {
        return (
            <div className="max-w-3xl mx-auto animate-fade-in">
                <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6">关于我</h2>
                <div className="prose prose-slate text-slate-600 leading-loose">
                    <p className="mb-4">
                        我是一名 <strong>IT 专业人士</strong> 和 <strong>AI 实践者</strong>，热衷于填补理论 AI 能力与稳健企业工程之间的鸿沟。
                    </p>
                    <p className="mb-4">
                        我的职业生涯经历了从传统软件架构到 AI 原生系统的转变。我坚信 IT 的未来在于 <strong>Agentic Workflows（智能体工作流）</strong> 和 <strong>Cognitive Architectures（认知架构）</strong>。
                    </p>
                    <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">关注领域</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li><strong>RAG 优化：</strong> 超越朴素的检索，转向混合、语义和重排序流水线。</li>
                        <li><strong>企业 AI 战略：</strong> 帮助组织在不牺牲数据安全或预算的前提下采用 LLM。</li>
                        <li><strong>全栈 AI 工程：</strong> 从 PyTorch 训练循环到 Next.js 前端交互界面。</li>
                    </ul>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
                        <h4 className="font-bold text-slate-800 mb-2">当前实验</h4>
                        <p className="text-sm">正在探索使用 Gemini 1.5 Pro 和 LangGraph 进行自动化 DevOps 任务的多智能体编排。</p>
                    </div>
                </div>
            </div>
        );
    }

    if (currentView === 'practice') {
        return (
            <div className="max-w-3xl mx-auto animate-fade-in">
                 <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">AI 实践</h2>
                 <p className="text-slate-500 mb-10">工程记录、项目展示与实验复盘。</p>
                 <div className="grid gap-8">
                    {PRACTICES.map(project => (
                        <div key={project.id} className="group border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">{project.title}</h3>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">进行中</span>
                            </div>
                            <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.techStack.map(t => (
                                    <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-gray-200">{t}</span>
                                ))}
                            </div>
                            <div className="flex gap-4 text-sm font-medium">
                                {project.links.repo && <a href={project.links.repo} className="text-primary hover:underline">查看仓库</a>}
                                {project.links.demo && <a href={project.links.demo} className="text-primary hover:underline">在线演示</a>}
                                {project.links.post && <a href={project.links.post} className="text-primary hover:underline">阅读案例</a>}
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        )
    }

    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
        {currentView === 'home' && (
             <div className="mb-12 border-b border-gray-200 pb-8">
                <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">最新动态</h2>
                <p className="text-slate-500">观察行业变迁与工程笔记。</p>
             </div>
        )}
        {currentView === 'insights' && (
             <div className="mb-12 border-b border-gray-200 pb-8">
                <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">行业观点</h2>
                <p className="text-slate-500">商业逻辑与技术演进的结合。</p>
             </div>
        )}

        <div className="space-y-12">
          {displayPosts.map((post) => (
            <article key={post.id} className="flex flex-col group cursor-pointer">
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-2 uppercase tracking-wide font-medium">
                 <span className={post.category === 'Practice' ? 'text-green-600' : 'text-blue-600'}>{post.category === 'Practice' ? '实践' : '观点'}</span>
                 <span>&bull;</span>
                 <span>{post.date}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-xs text-slate-500 italic">#{tag}</span>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-primary group-hover:underline">阅读更多 &rarr;</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-gray-200 z-20 px-4 py-3 flex justify-between items-center">
        <span className="font-serif font-bold text-lg text-primary">{PROFILE.name}</span>
        <button onClick={() => setIsMobileOpen(true)} className="text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      <main className="flex-1 min-w-0 h-full overflow-y-auto relative">
        <div className="p-6 pt-20 md:p-12 lg:p-20 max-w-5xl mx-auto min-h-[calc(100vh-100px)]">
          {renderContent()}
        </div>
        
        {/* Footer Area */}
        <div className="p-6 md:p-12 text-center text-slate-400 text-sm border-t border-gray-100 max-w-5xl mx-auto">
            &copy; {new Date().getFullYear()} {PROFILE.name}. 基于 React, Tailwind & Gemini 构建。
        </div>
      </main>

      <AIChat />
      
      {/* Style for animation */}
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
         @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
