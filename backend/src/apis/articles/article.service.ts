import { Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  test(): string {
    return 'article test route';
  }

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    return await this.articleModel.findById(id).exec();
  }

  async create(createArticleDto: CreateArticleDto) {
    return await this.articleModel.create(createArticleDto);
  }

  async update(id: string, createArticleDto: CreateArticleDto) {
    return await this.articleModel
      .findByIdAndUpdate(id, createArticleDto)
      .exec();
  }

  async delete(id: string) {
    const deletedArticle = await this.articleModel.findByIdAndDelete(id).exec();
    return deletedArticle;
  }
}
