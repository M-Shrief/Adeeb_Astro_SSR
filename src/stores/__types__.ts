import type {Combine} from '../utils/combineTypes.ts'

export interface Verse {
  first: string;
  sec: string;
}

export interface Poet {
  id: string;
  name: string;
  time_period: string;
  bio: string;
  reviewed: boolean;
  poems: Poem[];
  chosenVerses: ChosenVerse[];
  proses: Prose[];
  poetry: Poetry[];
}

export interface Poem {
  id: string;
  intro: string;
  poet: Poet;
  verses: Verse[];
  reviewed: boolean;
}

export interface ChosenVerse {
  id: string;
  poet: Poet;
  poem: Poem;
  tags: string;
  verses: Verse[];
  reviewed: boolean;
}

export interface Prose {
  id: string;
  poet: Poet;
  tags: string;
  qoute: string;
  reviewed: boolean;
}

// export interface Poetry extends  ChosenVerse, Prose{};
export type Poetry =  Combine<ChosenVerse, Prose>;

export interface Print {
  id: string;
  poem?: string;
  verses?: Verse[];
  qoute?: string;
}

export interface Product {
  print: Print;
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}
export interface ProductGroup {
  prints: Print[];
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}

export interface Partner {
  id: string;
  name: string;
  phone: string;
  // address: string;
  password: string;
}

export interface Order {
  id?: string;
  partnerId?: string;
  products: Product[] | ProductGroup[];
  name: string;
  phone: string;
  address: string;
  reviewed?: boolean;
  completed?: boolean;
  created_at?: string;
  updatedAt?: string;
}
