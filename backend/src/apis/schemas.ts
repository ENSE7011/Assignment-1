export interface Accounts {
  _id: string;
  name: string | null;
  email: string | null;
  notifications: boolean[];
  submitted_articles: Articles[] | null;
  saved_queries: string[];
  ratings:
    | [
        {
          article_id: string;
          value: number;
        },
      ]
    | null;
}
export interface Moderator extends Accounts {
  moderated_articles: [
    {
      article_id: string;
      date_modded: Date;
    },
  ];
}
export interface Analyst extends Accounts {
  analysied_articles: [
    {
      article_id: string;
      date_analysed: Date;
    },
  ];
}

export interface Claims {
  method: string | null;
  status: string | null;
  reviewer: Analyst | null;
}
export interface Articles {
  _id: string;
  title: string;
  doi: string;
  author: string;
  description?: string;
  published_year: string;
  journal: string;
  updated_date: Date;
  volume?: string;
  number?: number;
  pages?: string;
  claim_evidence?: Claims[];
  rating?: number;
}

// {'code improvement':'strong support'},
// {'product improvement': 'weak against'},
// {'team improvement': 'none'},
