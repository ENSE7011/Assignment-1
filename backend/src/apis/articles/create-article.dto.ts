export class CreateArticleDto {
  _id: string;
  title: string;
  doi: string;
  author: string;
  description?: string;
  published_year: string;
  journal: string;
  updated_date: number;
  rating?: number;
  rating_count: number;
}
