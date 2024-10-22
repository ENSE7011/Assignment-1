import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { Claim, SubmissionStatus } from './article-supplimentary';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  doi: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  published_year: string;

  @Prop({ required: true })
  journal: string;

  @Prop({ required: true, type: Date, default: Date.now() })
  updated_date: Date;

  @Prop({
    required: true,
    default: SubmissionStatus.Submitted,
  })
  status: string;

  @Prop({ required: true, type: Array<Claim>, default: Array<Claim>() })
  claim_evidence: Claim[];

  @Prop({ required: true })
  user_submitter: string;

  @Prop()
  user_moderator: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
