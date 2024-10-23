'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article, DefaultEmptyArticle, Claim, Rating, Method, SubmissionStatus, Support, DefaultEmptyClaim, DefaultEmptyRating } from './Article';
import { error } from 'console';
import Link from 'next/link';
import { isArray } from 'mathjs';

interface ClaimReviewProp {
  id: string,
  rating: number,
  name: string,
};

interface ArticleProp {
  article?: Article,
}

export default function AddClaimReview() {
  const router = useRouter();
  const [article, setArticle] = useState < Article > (DefaultEmptyArticle);
  const [claim, setClaim] = useState < Claim > (DefaultEmptyClaim);
  const { articleId, id } = useParams < { articleId: string, id: string } > ();

  let articleRatings: Rating[];
  let uiRating: Rating = DefaultEmptyRating;


  useEffect(() => {
    (async () => {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${articleId}`)
        .then((res) => res.json())
        .then((data) => {
          setArticle(data);
        })
        .then((res) => {
          const ce = article?.claim_evidence;
          setClaim(ce?.at(parseInt(id)) ?? DefaultEmptyClaim);
        })
        .catch((err) => console.log('Error fetching article or claim:', err));
    })();
  }, [articleId, id]);

  const UpdateRating = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.name === "user") {
      uiRating.user = event.target.value;
    } else if (event.target.name === "rating") {
      uiRating.rating = parseInt(event.target.value);
    }
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!uiRating.user || !uiRating.rating || !claim) {
      throw error('Failed to provide a rating value', 400);
    }
    claim.ratings.push(uiRating);
    setArticle({ ...article, ['claim_evidence']: claim });

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${articleId}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article)
    })
      .then(() => router.push(`/show-article/${articleId}`))
      .catch((err) => console.log('Error updating article:', err));
  };

  return (
    <div className="AddClaimReview col-md-8 m-auto">
      <Link href="/" className="btn btn-outline-warning float-left">
        Show Article List
      </Link>
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
              value={uiRating.rating}
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
              value={uiRating.user}
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
  );
}