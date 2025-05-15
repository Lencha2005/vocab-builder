export interface WordItem {
  _id?: string;
  en: string;
  ua: string;
  category: string;
  isIrregular: boolean;
  owner?: string;
  progress?: number;
}

export interface GetWordsResponse {
  results: WordItem[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface GetWordsParams {
  keyword?: string;
  category?: string;
  isIrregular?: boolean;
  page?: number;
  limit?: number;
}

export interface DictionaryState {
  items: WordItem[];
  categories: string[];
  totalPages: number;
  currentPage: number;
  perPage: number;
  isLoading: boolean;
  error: string | null;
}

export interface UserWordsState {
  userItems: WordItem[];
  word: WordItem | null;
  totalPages: number;
  currentPage: number;
  perPage: number;
  statistics: number;
  tasks: TaskWord[];
  answers: TrainingWord[];
  isLoading: boolean;
  error: string | null;
}

export interface DeleteWordResponse {
  message: string;
  id: string;
}

export interface StatisticsResponse {
  totalCount: number;
}

export interface TaskWord {
  _id: string;
  ua: string;
  task: string;
}

export interface GetTasksResponse {
  words: TaskWord[];
}

export interface TrainingWord {
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
  task: string;
}

export interface UserState {
  user: {
    name: string | null;
    email: string | null;
    token: string | null;
  };
  isLoading: boolean;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: unknown;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
