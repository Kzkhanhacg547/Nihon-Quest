import rawJouyou from "./jouyou-kanji-data.json";

export interface JouyouKanjiItem {
  num: number;
  character: string;
  oldCharacter?: string;
  radical: string;
  strokeCount: number;
  grade: number | string;
  jlptLevel: string;
  hanViet: string;
  onyomi: string[];
  kunyomi: string[];
  meaningEn: string;
  meaningVi: string;
}

export const JOUYOU_KANJI_LIST: JouyouKanjiItem[] = rawJouyou as JouyouKanjiItem[];
