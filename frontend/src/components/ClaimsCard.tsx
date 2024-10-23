'use client'

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Claim, Rating, Method, SubmissionStatus, Support, DefaultEmptyClaim, DefaultEmptyRating, GetSupportString } from './Article';
import { CalculateRatingAverages } from './RatingCalculations';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import StarRating from './StarRating';


interface ClaimProp {
  claim: Claim;
  index: number;
}

const ClaimsCard = ({ claim, index }: ClaimProp) => {
  const router = useRouter();
  const articleId = useParams < { id: string } > ().id;

  if (!claim || !index) {
    return null;
  }

  const onClick = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${articleId}/claim`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "method": claim.method,
        "support": claim.support,
        "volume": claim.volume,
        "journal_number": claim.journal_number,
        "pages": claim.pages,
        "user_analyst": claim.user_analyst
      })
    })
      .then((res) => router.push(`/add-rating/${articleId}/claims/${index}`))
      .catch((err) => console.log('Error updating article ratings:', err));
  };

  let rating_average = CalculateRatingAverages(claim.ratings).mean_rating;
  const getAddReviewStr = (): string => {
    return `/add-rating/${articleId}/claims/${index}`;
  }

  let hasRatings = (): Rating[] | null => {
    if (!claim) { return null }
    articleRatings = claim?.ratings ?? [];
    return (articleRatings.length > 0) ? articleRatings : null;
  };

  const StarRatingLayout = !hasRatings() ? (
    <div className="col-md-8 m-auto">
      <h1 className="display-4 text-center">Claim Stats</h1>
      <div>This Claim has not been rated yet</div>
    </div>
  ) : (
    <div className="col-md-8 m-auto">
      <h1 className="display-4 text-center">Claim Stats</h1>
      <div className='meanBox'>
        <div>Mean</div>
        <StarRating rating={CalculateRatingAverages(hasRatings() ?? []).mean_rating} size={24} colour={['#3399FF']} />
      </div>
      <div className='medianBox'>
        <div>Median</div>
        <StarRating rating={CalculateRatingAverages(hasRatings() ?? []).median_rating} size={24} colour={['#3366FF']} />
      </div>s
      <div className='modeBox'>
        <div>Mode</div>
        <StarRating rating={CalculateRatingAverages(hasRatings() ?? []).mode_rating} size={24} colour={['#0033FF']} />
      </div>
      <br />
      <StarRating rating={5} size={24} colour={['#FF0000', '#FF6F00', '#FFA500', '#FFD700', '#00FF00']} />
      <div className='claimPerStar'>
        <div className='star1'>
          <div>1</div>
          <div>{CalculateRatingsByStar(hasRatings() ?? []).ratingsByStar[0].user_ratings}</div>
        </div>
        <div className='star2'>
          <div>2</div>
          <div>{CalculateRatingsByStar(hasRatings() ?? []).ratingsByStar[1].user_ratings}</div>
        </div>
        <div className='star3'>
          <div>3</div>
          <div>{CalculateRatingsByStar(hasRatings() ?? []).ratingsByStar[2].user_ratings}</div>
        </div>
        <div className='star4'>
          <div>4</div>
          <div>{CalculateRatingsByStar(hasRatings() ?? []).ratingsByStar[3].user_ratings}</div>
        </div>
        <div className='star5'>
          <div>5</div>
          <div>{CalculateRatingsByStar(hasRatings() ?? []).ratingsByStar[4].user_ratings}</div>
        </div>
      </div>
    </div>
  );

  // TODO: add review button if failure

  return (
    <Tab.Container className='ClaimsCard' defaultActiveKey="CO">
      <Card className='card-container'>
        <Card.Header>
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="CO">Overview</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="RO">Rating</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href={getAddReviewStr()}>Add Review</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>{GetSupportString(claim.support)} for {claim.method}</Card.Title>
          <Card.Text className="sub">  Analyst: {claim.user_analyst}</Card.Text>
          <Tab.Content>
            <Tab.Pane eventKey="CO">
              Journal Number: {claim.journal_number}<br />
              Volume: {claim.volume}<br />
              Pages: {claim.pages}<br />
              Average Rating: {rating_average}
            </Tab.Pane>
            <Tab.Pane eventKey="RO">
              {StarRatingLayout}
            </Tab.Pane>
          </Tab.Content>
        </Card.Body>
      </Card>
    </Tab.Container>
  );
}

export default ClaimsCard;