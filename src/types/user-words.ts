import { WordItem } from './word';

export interface TaskWord {
  _id: string;
  ua: string;
  task: 'en';
}

export interface GetTasksResponse {
  tasks: TaskWord[];
}

export interface AnswerResponse {
  _id: string;
  ua: string;
  en: string;
  task: string;
  isDone: boolean;
}

export interface AnswerWordDto {
  _id: string;
  ua: string;
  en: string;
  task: 'en';
}

export interface StatisticsResponse {
  totalCount: number;
}

export interface DeleteWordResponse {
  message: string;
  id: string;
}

export interface UserWordsState {
  userItems: WordItem[];
  word: WordItem | null;
  totalPages: number;
  currentPage: number;
  perPage: number;
  statistics: number;
  tasks: TaskWord[];
  answers: AnswerResponse[];
  isLoading: boolean;
  error: string | null;
}
