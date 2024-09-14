export type GetInterviewTypes = {
  _id: string;
  jobRole: string;
  technologies: string;
  difficultyLevel: string;
  createdAt: string;
  status: string;
  questions: Question[];
}


interface Question {
  questionNumber: number;
  question: string;
  expectedAnswer: string;
}

export interface InterviewData {
  _id: string;
  jobRole: string;
  technologies: string;
  difficultyLevel: string;
  
  createdAt: string;
}