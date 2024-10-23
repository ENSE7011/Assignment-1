import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { FindClaimDto } from './find-claim.dto';
import { CreateReviewDto } from './create-review.dto';
import { error } from 'console';
import * as mongo from 'mongodb';

@Controller('apis/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/test')
  test() {
    return this.articleService.test();
  }

  @Get('/')
  async findAll() {
    try {
      return this.articleService.findAll();
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No Articles found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      return this.articleService.findOne(id);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No Article found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  @Post('/')
  async addArticle(@Body() createArticleDto: CreateArticleDto) {
    try {
      createArticleDto._id = new mongo.ObjectId().toString();
      await this.articleService.create(createArticleDto);
      return { message: 'Article added successfully' };
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to add this article',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  @Put('/:id')
  async updateArticle(
    @Param('id') id: string,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    try {
      await this.articleService.update(id, createArticleDto);
      return { message: 'Article updated successfully' };
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to update this article',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  @Delete('/:id')
  async deleteArticle(@Param('id') id: string) {
    try {
      return await this.articleService.delete(id);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No such a article',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  @Get('/:id/claims')
  async getClaims(@Param('id') id: string) {
    try {
      const article = await this.articleService.findOne(id);
      return article.claim_evidence;
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Cannot get article claims for article ${id}`,
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  @Get('/:id/claim')
  async findClaim(@Param('id') id: string, @Body() findClaimDto: FindClaimDto) {
    try {
      const article = await this.articleService.findOne(id);
      return article.claim_evidence.find((cv) => {
        cv.method === findClaimDto.method &&
          cv.support === findClaimDto.support &&
          cv.volume === findClaimDto.volume &&
          cv.journal_number === findClaimDto.journal_number &&
          cv.pages === findClaimDto.pages &&
          cv.user_analyst === findClaimDto.user_analyst;
      });
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Cannot find article claim for article ${id} and claim evidence ${findClaimDto}`,
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
}
