export type Article = {
  _id: string
  title?: string
  doi?: string
  author?: string
  description?: string
  published_year?: string
  journal?: string
  updated_date?: number
  status?: string
  claim_evidence?: Claim[]
  user_submitter?: string
  user_moderator?: string
}

export enum Method {
  CodeImprovement = "Code Improvement",
  ProductImprovement = "Product Improvement",
  TeamImprovement = "Team Improvement",
}

export enum Support {
  StrongSupport = 2,
  WeakSupport = 1,
  None = 0,
  WeakAgainst = -1,
  StrongAgainst = -2,
}

export type Rating = {
  rating: number
  user: string
}

export type Claim = {
  method: string
  support: number
  volume: string
  journal_number: string
  pages: string
  user_analyst: string
  ratings: Rating[]
}

export enum SubmissionStatus {
  Submitted = "Submitted",
  ModReview = "ModReview",
  AnalystReview = "AnalystReview",
  Success = "Success",
  Reject = "Reject",
}

export const DefaultEmptyArticle: Article = {
  _id: "",
  title: "",
  doi: "",
  author: "",
  description: "",
  published_year: undefined,
  journal: "",
  updated_date: Date.now(),
  status: SubmissionStatus.Submitted,
  claim_evidence: [],
  user_submitter: "",
  user_moderator: "",
}

export const DefaultEmptyClaim: Claim = {
  method: Method.CodeImprovement,
  support: Support.None,
  volume: "",
  journal_number: "",
  pages: "",
  user_analyst: "",
  ratings: [],
}

export const DefaultEmptyRating: Rating = {
  rating: 0,
  user: "",
}
