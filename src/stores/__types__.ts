export interface Verse {
  first: string;
  sec: string;
}

export interface Poet {
  details: {
    id: string;
    name: string;
    time_period: string;
    bio: string;
    reviewed: boolean;
  };
  poems: Poem[];
  chosenVerses: ChosenVerse[];
  proses: Prose[];
}

export interface Poem {
  id: string;
  intro: string;
  poet: Poet['details'];
  verses: Verse[];
  reviewed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChosenVerse {
  id: string;
  poet: Poet['details'];
  poem: string | Poem;
  tags: string;
  verses: Verse[];
  reviewed: boolean;
}

export interface Prose {
  id: string;
  poet: Poet['details'];
  tags: string;
  qoute: string;
  reviewed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Print {
  id: string;
  poem?: string;
  verses?: Verse[];
  qoute?: string;
}

export interface Product {
  id: string;
  print: Print;
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}
export interface ProductGroup {
  id: string;
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
  partner?: string;
  products: Product[] | ProductGroup[];
  name: string;
  phone: string;
  address: string;
  reviewed?: boolean;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
