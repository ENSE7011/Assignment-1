import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

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

  @Prop()
  rating?: number;

  @Prop({ required: true })
  rating_count: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
