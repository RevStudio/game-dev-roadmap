export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'scale';
  options: Option[];
  category: 'goal' | 'skill' | 'preference' | 'environment';
}

export interface Option {
  id: string;
  text: string;
  value: string;
  score?: {
    unity?: number;
    unreal?: number;
  };
  nextQuestionId?: string;
}

export interface UserProfile {
  goal?: string;
  experience?: string;
  language?: string[];
  engine?: string[];
  priority?: string;
  graphics?: string;
  platform?: string;
  specs?: string;
  timeAvailable?: string;
  budget?: string;
  preferredField?: string;
}

export interface EngineRecommendation {
  engine: 'Unity' | 'Unreal';
  score: number;
  reasons: string[];
}

export interface Roadmap {
  title: string;
  duration: string;
  difficulty: number;
  phases: Phase[];
  tools: string[];
  resources: Resource[];
  projects: Project[];
}

export interface Phase {
  id: string;
  title: string;
  duration: string;
  tasks: string[];
  milestone: string;
}

export interface Resource {
  title: string;
  type: 'free' | 'paid';
  url?: string;
  description: string;
}

export interface Project {
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  description: string;
}