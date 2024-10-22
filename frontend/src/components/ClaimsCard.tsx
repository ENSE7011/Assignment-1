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
  method: string;
  support: number;
  id: number;
}


const ClaimsCard = ({ claims, articleId }: ClaimProp) => {
  const router = useRouter();

  const [article, setArticle] = useState < Article > (DefaultEmptyArticle);

  if (claims?.length === 0) {
    return null;
  };

  const method_set = new Set(claims?.map((claimItem) => { return claimItem.method }));
  console.log("methods: ", method_set);

  let uiClaim: UIClaimItemProp = {
    method: claims?.at(0)?.method ?? "",
    support: claims?.at(0)?.support ?? -5,
    id: 0,
  }

  const onClick = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${articleId}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => setArticle(data))
      .catch((err) => console.log('Error fetching article:', err));
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${articleId}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article)
    })
      .then(() => router.push(`/add-rating/${articleId}/claims/${uiClaim.id}`))
      .catch((err) => console.log('Error updating article ratings:', err));
  };

  function updateUIClaim(c: Claim): void {
    if (c) {
      uiClaim = {
        method: c.method,
        support: c.support,
        id: claims?.findIndex((cm) => (cm.journal_number === c.journal_number) && (cm.method === c.method) && (cm.support === c.support) && (cm.user_analyst === c.user_analyst) && (cm.volume === c.volume)) ?? -1,
      };
    }
  }

  return (
    <div className='claim-list-container'>
      <h1 className="display-4 text-center">SPEED Analysis</h1>
      <h3 className="display-4 text-center">Click on claim to add a rating or view the rating summary</h3>
      <React.JSX.Element {...method_set.forEach((methodName) => {
        const claimSub = claims.filter((claimItem) => claimItem.method === methodName);
        <div className='claim-method-container'>
          <h1 className="display-4 text-center">{methodName}</h1>
          <React.JSX.Element {...{
            ...claimSub.map((item, index, k) => {
              let rating_average = CalculateRatingAverages(item.ratings).mean_rating;
              <div className='claim-item-flex' key={k} onMouseEnter={updateUIClaim(item)} onClick={onClick}>
                <p>{item.support}</p>
                <p>Analyst {item.user_analyst}</p>
                <p>Evidence {item.journal_number} {item.volume} {item.pages}</p>
                <p>Rating {rating_average}</p>
              </div>;
            })
          }} />
        </div>
      })} />
    </div>
  );
}

ClaimsCard.displayName = 'ClaimsCard';
export default ClaimsCard;