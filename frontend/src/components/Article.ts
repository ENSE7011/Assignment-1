export type Article = {
  _id: string
  title?: string
  doi?: string
  author?: string
  description?: string
  published_year?: string
  journal?: string
  updated_date?: number
  rating: number
  rating_count: number
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
  rating: 0,
  rating_count: 0,
}
