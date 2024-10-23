'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Article, DefaultEmptyArticle, Claim, DefaultEmptyClaim } from './Article';
import ClaimsCard from './ClaimsCard';
import Link from 'next/link';


export default function ShowClaimList() {
  const [article, setArticle] = useState < Article > (DefaultEmptyArticle);
  const [claims, setClaims] = useState < Array < Claim > > ([]);
  const articleId = useParams < { id: string } > ().id;

  async function fetchArticleAndClaims() {
    const [articleResponse, claimsResponse] = await Promise.all([fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${articleId}`, { method: "GET" }), fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${articleId}/claims`, { method: "GET" })])
    const [articleJson, claimsJson] = await Promise.all([articleResponse.json(), claimsResponse.json()]);
    return [articleJson, claimsJson];
  }

  useEffect(() => {
    (async () => {
      fetchArticleAndClaims()
        .then(([articleRes, claimsRes]) => {
          setArticle(articleRes);
          setClaims(claimsRes);
        })
        .catch((err) => {
          console.log("Error fetching articles and claims: " + err);
        })
    });
  }, [articleId]);

  const ClaimList = claims.length === 0 ? (
    <p>There are no claims!</p>
  ) : (
    claims.map((c: Claim, k: ReactKey, index: number) => <ClaimsCard claim={c} key={k} index={index} />)
  );

  return (
    <div className='ShowClaimList'>
      <h1 className="display-4 text-center">SPEED Analysis</h1>
      <h3 className="display-4 text-center">Click on claim to add a rating or view the rating summary</h3>
      <br />
      <div className='list'>{ClaimList}</div>
      <br />
      <br />
      <Link href="/" className="btn btn-outline-warning float-left">
        Show Article List
      </Link>
    </div>
  );
}