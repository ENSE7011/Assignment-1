'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article, DefaultEmptyArticle, Claim, Rating, Method, SubmissionStatus, Support, DefaultEmptyClaim, DefaultEmptyRating } from './Article';
import Link from 'next/link';
import { ClaimsCard } from './ClaimsCard'

const UpdateArticleInfo = () => {
  const [article, setArticle] = useState < Article > (DefaultEmptyArticle);
  const id = useParams < { id: string } > ().id;
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${id}`)
        .then((res) => res.json())
        .then((data) => setArticle(data))
        .catch((err) => console.log('Error fetching article:', err));
    })();
  }, [id]);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article)
    })
      .then(() => router.push(`/show-article/${id}`))
      .catch((err) => console.log('Error updating article:', err));
  };

  return (
    <div className="UpdateArticleInfo">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link href="/" className="btn btn-outline-warning float-left">
              Show Article List
            </Link>
            <br />
            <h1 className="display-4 text-center">Edit Article</h1>
            <p className="lead text-center">Update Article&quot;s Info</p>
            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Article"
                  name="title"
                  className="form-control"
                  value={article.title}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="DOI"
                  name="doi"
                  className="form-control"
                  value={article.doi}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  className="form-control"
                  value={article.author}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <textarea
                  placeholder="Description of the Article"
                  name="description"
                  className="form-control"
                  value={article.description}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="string"
                  placeholder="Published Year"
                  name="published_year"
                  className="form-control"
                  value={article.published_year}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Publishing Journal of the Article"
                  name="journal"
                  className="form-control"
                  value={article.journal}
                  onChange={onChange}
                />
              </div>
              <br />
              <button type="submit" className="btn btn-outline-info btn-lg btn-block">
                Update Article
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateArticleInfo;
