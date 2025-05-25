export interface WordItem {
  _id?: string;
  en: string;
  ua: string;
  category: string;
  isIrregular: boolean;
  owner?: string;
  progress?: number;
}
