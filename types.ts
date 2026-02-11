export type View = 'home' | 'insights' | 'practice' | 'about';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'Insight' | 'Practice';
  tags: string[];
  content?: string; // Simplified for this demo
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  links: {
    repo?: string;
    demo?: string;
    post?: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}