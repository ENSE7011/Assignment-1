export enum Method {
  CodeImprovement = 'Code Improvement',
  ProductImprovement = 'Product Improvement',
  TeamImprovement = 'Team Improvement',
}

export enum Support {
  StrongSupport = 2,
  WeakSupport = 1,
  None = 0,
  WeakAgainst = -1,
  StrongAgainst = -2,
}

export class Rating {
  rating: number;
  user: string;
}

export class Claim {
  method: string;
  support: number;
  volume: string;
  journal_number: string;
  pages: string;
  user_analyst: string;
  ratings: Rating[];
}

export enum SubmissionStatus {
  Submitted = 'Submitted',
  ModReview = 'ModReview',
  AnalystReview = 'AnalystReview',
  Success = 'Success',
  Reject = 'Reject',
}
