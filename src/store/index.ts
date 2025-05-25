import { create } from 'zustand';
import { Course, Instructor, Student, Announcement, User } from '../types';
import { mockCourses, mockInstructors, mockStudents, mockAnnouncements, mockUser } from '../data/mockData';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  
  // Data
  courses: Course[];
  instructors: Instructor[];
  students: Student[];
  announcements: Announcement[];
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  
  // Course actions
  getCourses: () => Promise<void>;
  getCourseById: (id: string) => Course | undefined;
  
  // Instructor actions
  getInstructors: () => Promise<void>;
  getInstructorById: (id: string) => Instructor | undefined;
  
  // Student actions
  getStudents: () => Promise<void>;
  getStudentById: (id: string) => Student | undefined;
  
  // Announcement actions
  getAnnouncements: () => Promise<void>;
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => Promise<void>;
}

// In a real app, these would be API calls
const mockLogin = async (email: string, password: string): Promise<User> => {
  // This is a simulation, in a real app you would validate credentials against a backend
  if (email && password) {
    return mockUser;
  }
  throw new Error('Invalid credentials');
};

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  courses: [],
  instructors: [],
  students: [],
  announcements: [],
  isLoading: false,
  error: null,
  
  // Auth actions
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await mockLogin(email, password);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  // Course actions
  getCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ courses: mockCourses, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  getCourseById: (id: string) => {
    return get().courses.find((course) => course.id === id);
  },
  
  // Instructor actions
  getInstructors: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ instructors: mockInstructors, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  getInstructorById: (id: string) => {
    return get().instructors.find((instructor) => instructor.id === id);
  },
  
  // Student actions
  getStudents: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ students: mockStudents, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  getStudentById: (id: string) => {
    return get().students.find((student) => student.id === id);
  },
  
  // Announcement actions
  getAnnouncements: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ announcements: mockAnnouncements, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  addAnnouncement: async (announcement) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newAnnouncement: Announcement = {
        ...announcement,
        id: Math.random().toString(36).substring(2, 11),
        date: new Date().toISOString().split('T')[0],
      };
      set((state) => ({
        announcements: [...state.announcements, newAnnouncement],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));