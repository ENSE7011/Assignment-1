export type Book = {
  _id?: string
  title?: string
  doi?: string
  author?: string
  description?: string
  published_year?: string
  journal?: string
  updated_date?: Date
  volume?: string
  number?: number
  pages?: string
  claim_evidence?: string[]
}

export const DefaultEmptyBook: Book = {
  _id: undefined,
  title: "",
  doi: "",
  author: "",
  description: "",
  published_year: undefined,
  journal: "",
  updated_date: undefined,
  volume: "",
  number: undefined,
  pages: "",
  claim_evidence: undefined,
}
