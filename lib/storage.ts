// Browser storage utilities for demo

export interface User {
  email: string;
  loginTime: string;
}

export interface Scene {
  sceneNumber: number;
  script: string;
  audioUrl?: string;
  videoUrl?: string;
  attempts: number;
}

export interface Project {
  id: string;
  title: string;
  grade: 'K-5' | '6-8' | '9-12';
  category: string;
  createdAt: string;
  scenes: Scene[];
  finalVideoUrl?: string;
  gradeScore?: number;
  completed: boolean;
}

export interface StorageData {
  user: User | null;
  projects: Project[];
  currentProject?: string;
}

const STORAGE_KEY = 'interactive-learning-data';

// Get all data from localStorage
export function getStorageData(): StorageData {
  if (typeof window === 'undefined') {
    return { user: null, projects: [] };
  }
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return { user: null, projects: [] };
    }
    return JSON.parse(data);
  } catch {
    return { user: null, projects: [] };
  }
}

// Save data to localStorage
export function saveStorageData(data: StorageData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

// User authentication
export function saveUser(email: string): void {
  const data = getStorageData();
  data.user = {
    email,
    loginTime: new Date().toISOString(),
  };
  saveStorageData(data);
}

export function getUser(): User | null {
  return getStorageData().user;
}

export function logout(): void {
  const data = getStorageData();
  data.user = null;
  data.currentProject = undefined;
  saveStorageData(data);
}

// Project management
export function saveProject(project: Project): void {
  const data = getStorageData();
  const existingIndex = data.projects.findIndex(p => p.id === project.id);
  
  if (existingIndex >= 0) {
    data.projects[existingIndex] = project;
  } else {
    data.projects.push(project);
  }
  
  saveStorageData(data);
}

export function getProject(id: string): Project | undefined {
  const data = getStorageData();
  return data.projects.find(p => p.id === id);
}

export function getAllProjects(): Project[] {
  return getStorageData().projects;
}

export function setCurrentProject(id: string): void {
  const data = getStorageData();
  data.currentProject = id;
  saveStorageData(data);
}

export function getCurrentProject(): Project | undefined {
  const data = getStorageData();
  if (!data.currentProject) return undefined;
  return getProject(data.currentProject);
}

export function deleteProject(id: string): void {
  const data = getStorageData();
  data.projects = data.projects.filter(p => p.id !== id);
  if (data.currentProject === id) {
    data.currentProject = undefined;
  }
  saveStorageData(data);
}

