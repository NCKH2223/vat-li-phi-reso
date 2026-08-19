export interface RegistrationData {
  id: string;
  fullName: string;
  phone: string;
  currentGrade: string;
  address: string;
  selectedProgram: 'Vật lí 10' | 'Vật lí 11' | 'Vật lí 12';
  grade12Tracks?: ('Cơ bản' | 'Luyện thi THPT')[];
  grade?: string;
  schoolCity?: string;
  currentChallenge?: string;
  learningMode?: string;
  preferredTime?: string;
  notes?: string;
  createdAt: string;
}

export interface TeacherProfile {
  name: string;
  title: string;
  subTitle: string;
  quote: string;
  avatarUrl: string;
  badge: string;
  bulletPoints: string[];
}

export interface TrialPackage {
  id: string;
  name: string;
  target: string;
  schedule: string;
  format: string;
  spotsLeft: number;
  highlight: string;
}

// Fallback runtime export to prevent bundler errors
export const RegistrationData = {} as unknown;

