import { Claim } from './article-supplimentary';
export class CreateArticleDto {
  _id: string;
  title: string;
  doi: string;
  author: string;
  description?: string;
  published_year: string;
  journal: string;
  claim_evidence: Claim[];
  user_submitter?: string;
  user_moderator?: string;
}
