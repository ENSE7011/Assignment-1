import { Rating } from "./Article"
import { mean, median, mode } from "mathjs"

interface RatingAveragesProp {
  mean_rating: number
  median_rating: number
  mode_rating: number[]
}

interface RatingCountByStarProp {
  star_count: number
  user_ratings: number
  moderator_ratings: number
  analyst_ratings: number
}

interface StarBreakdownProp {
  ratingsByStar: RatingCountByStarProp[]
}

const DefaultStarBreakdownProp: StarBreakdownProp = {
  ratingsByStar: [
    {
      star_count: 1,
      user_ratings: 0,
      moderator_ratings: 0,
      analyst_ratings: 0,
    },
    {
      star_count: 2,
      user_ratings: 0,
      moderator_ratings: 0,
      analyst_ratings: 0,
    },
    {
      star_count: 3,
      user_ratings: 0,
      moderator_ratings: 0,
      analyst_ratings: 0,
    },
    {
      star_count: 4,
      user_ratings: 0,
      moderator_ratings: 0,
      analyst_ratings: 0,
    },
    {
      star_count: 5,
      user_ratings: 0,
      moderator_ratings: 0,
      analyst_ratings: 0,
    },
  ],
}

export function CalculateRatingAverages(ratings: Rating[]): RatingAveragesProp {
  const ratingValues: number[] = ratings.map((rate) => {
    return rate.rating
  })

  return {
    mean_rating: mean<number>(ratingValues),
    median_rating: median<number>(ratingValues),
    mode_rating: mode<number>(ratingValues),
  }
}

export function CalculateRatingsByStar(rating: Rating[]): StarBreakdownProp {
  let ratingByStar: RatingCountByStarProp[] = DefaultStarBreakdownProp.ratingsByStar

  rating.forEach((rate) => {
    const ratingByStarIndex: number = ratingByStar.findIndex((rbs) => {
      rbs.star_count === rate.rating
    })
    ratingByStar[ratingByStarIndex].user_ratings += 1
  })

  return { ratingsByStar: ratingByStar }
}
