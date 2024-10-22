'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article, DefaultEmptyArticle, Claim, Rating, Method, SubmissionStatus, Support, DefaultEmptyClaim, DefaultEmptyRating } from './Article';
import { CalculateRatingAverages, CalculateRatingsByStar } from './RatingCalculations';
import { error } from 'console';
import StarRating from './StarRating';
import Link from 'next/link';

interface ClaimReviewProp {
  id: string,
  rating: number,
  name: string,
};

interface ArticleProp {
  article?: Article,
}

const AddClaimReview = () => {
  const [article, setArticle] = useState < Article > (DefaultEmptyArticle);
  const { articleId, id } = useParams < { articleId: string, id: string } > ();
  let articleRatings: Rating[];
  let uiRating: Rating;

  const router = useRouter();


  useEffect(() => {
    (async () => {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${articleId}`)
        .then((res) => res.json())
        .then((data) => setArticle(data))
        .catch((err) => console.log('Error fetching article:', err));
    })();
  }, [articleId]);

  // TODO: get users
  const UpdateRating = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.name === "user") {
      uiRating.user = event.target.value;
    } else if (event.target.name === "rating") {
      uiRating.rating = event.target.value;
    }
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!uiRating.user || !uiRating.rating) {
      throw new error('Failed to provide a rating value', 400);
    }

    articleRatings = article.claim_evidence[id].rating;
    articleRatings.push(uiRating);
    setArticle({ ...article, ['claim_evidence']: id, ['ratings']: articleRatings });

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${articleId}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article)
    })
      .then(() => router.push(`/show-article/${articleId}`))
      .catch((err) => console.log('Error updating article:', err));
  };

  return (
    <div className="col-md-8 m-auto">
      <Link href="/" className="btn btn-outline-warning float-left">
        Show Article List
      </Link>
      <br />
      <div className="col-md-8 m-auto">
        <h1 className="display-4 text-center">Claim Stats</h1>
        <div className='meanBox'>
          <div>Mean</div>
          <StarRating rating={CalculateRatingAverages(article.claim_evidence[id].rating).mean_rating} size={24} color={['#3399FF']} />
        </div>
        <div className='medianBox'>
          <div>Median</div>
          <StarRating rating={CalculateRatingAverages(article.claim_evidence[id].rating).median_rating} size={24} color={['#3366FF']} />
        </div>
        <div className='modeBox'>
          <div>Mode</div>
          <StarRating rating={CalculateRatingAverages(article.claim_evidence[id].rating).mode_rating} size={24} color={['#0033FF']} />
        </div>
        <br />
        <StarRating rating={5} size={24} colour={['#FF0000', '#FF6F00', '#FFA500', '#FFD700', '#00FF00']} />
        <div className='claimPerStar'>
          <div className='star1'>
            <div>1</div>
            <div>{CalculateRatingsByStar(article.claim_evidence[id].rating).ratingsByStar[0].user_ratings}</div>
          </div>
          <div className='star2'>
            <div>2</div>
            <div>{CalculateRatingsByStar(article.claim_evidence[id].rating).ratingsByStar[1].user_ratings}</div>
          </div>
          <div className='star3'>
            <div>3</div>
            <div>{CalculateRatingsByStar(article.claim_evidence[id].rating).ratingsByStar[2].user_ratings}</div>
          </div>
          <div className='star4'>
            <div>4</div>
            <div>{CalculateRatingsByStar(article.claim_evidence[id].rating).ratingsByStar[3].user_ratings}</div>
          </div>
          <div className='star5'>
            <div>5</div>
            <div>{CalculateRatingsByStar(article.claim_evidence[id].rating).ratingsByStar[4].user_ratings}</div>
          </div>
        </div>
      </div>
      <br />
      <div className="col-md-8 m-auto">
        <h1 className="display-4 text-center">Rate Claim</h1>
        <form noValidate onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="number"
              placeholder="Article Rating"
              name="rating"
              className="form-control"
              value={article.rating}
              onChange={UpdateRating}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="string"
              placeholder="User Name"
              name="user"
              className="form-control"
              value={article.name}
              onChange={UpdateRating}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-outline-info btn-lg btn-block">
            Submit Article Rating
          </button>
        </form>
      </div>
    </div>
  )
}