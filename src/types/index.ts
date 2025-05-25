export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student';
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  duration: string;
  startDate: string;
  endDate: string;
  enrollmentCount: number;
  maxEnrollment: number;
  image: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  bio: string;
  expertise: string[];
  avatar: string;
  rating: number;
  courseCount: number;
  studentCount: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentDate: string;
  courses: string[];
  progress: Record<string, number>;
  avatar?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  authorId: string;
  authorName: string;
  courseId?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  dueDate: string;
  points: number;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  assignmentId: string;
  score: number;
  feedback: string;
  submittedOn: string;
  gradedOn: string;
}

export interface Navigation {
  name: string;
  href: string;
  icon: string;
  current: boolean;
}

export interface NavigationSection {
  id: string;
  name: string;
  items: Navigation[];
}