'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article, DefaultEmptyArticle, Claim, Rating, Method, SubmissionStatus, Support, DefaultEmptyClaim, DefaultEmptyRating } from './Article';
import { CalculateRatingAverages } from './RatingCalculations';


interface ClaimProp {
  claims?: Claim[];
  articleId?: String;
}

interface UIClaimItemProp {
  method: Method;
  support: Support;
  id: string;
}


const ClaimsCard = ({ claims, articleId }: ClaimProp) => {
  if (claims.length === 0) {
    return null;
  };

  const router = useRouter();
  const method_set = new Set(claims.map((claimItem) => { return claimItem.method }));
  console.log("methods: ", method_set);

  let uiClaim: UIClaimItemProp = {
    method: claims.at(0).method,
    support: claims.at(0).support,
    id: 0,
  }

  const onClick = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${articleId}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article)
    })
      .then(() => router.push(`/add-rating/${articleId}/claims/${uiClaim.id}`))
      .catch((err) => console.log('Error updating article ratings:', err));
  };

  function updateUIClaim(c: Claim): void {
    uiClaim = {
      method: c.method,
      support: c.support,
      id: claims.findIndex(c),
    };
  }

  return (
    <div className='claim-list-container'>  // column
      <h1 className="display-4 text-center">SPEED Analysis</h1>
      <h3 className="display-4 text-center">Click on claim to add a rating or view the rating summary</h3>
      {method_set.forEach((methodName) => {
        const claimSub = claims.filter((claimItem) => claimItem.method === methodName);
        <div className='claim-method-container'> // flex wrap
          <h1 className="display-4 text-center">{methodName}</h1>
          {claimSub.map((item, index, k) => {
            let rating_average = CalculateRatingAverages(item.ratings).mean_rating;

            <div className='claim-item-flex' key={k} onMouseEnter={updateUIClaim(item)} onClick={onClick}>
              <p>{item.support}</p>
              <p>Analyst {item.user_analyst}</p>
              <p>Evidence {item.journal_number} {item.volume} {item.pages}</p>
              <p>Rating {rating_average}</p>
            </div>;
          })}
        </div>
      })}
    </div>
  );
}

export default ClaimsCard;