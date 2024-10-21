'use client'

import Link from 'next/link';
import ArticleCard from './ArticleCard';
import { useState, useEffect } from 'react';
import { Article } from './Article';

export default function ShowArticleList() {
  const [Articles, setArticles] = useState < Article[] > ([]);

  useEffect(() => {
    (async () => {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/apis/articles')
        .then((res) => res.json())
        .then((data) => {
          // Ensure that the fetched data is an array before setting it to state
          if (Array.isArray(data)) {
            setArticles(data);
          } else {
            console.error('Expected an array but received:', data);
            setArticles([]); // Set an empty array if data is not an array
          }
        })
        .catch((err) => {
          console.log('Error fetching Articles:', err);
        });
    })();
  }, []);

  const ArticleList = Articles.length === 0 ? (
    <p>There is no Article record!</p>
  ) : (
    Articles.map((Article, k) => <ArticleCard article={Article} key={k} />)
  );

  return (
    <div className="ShowArticleList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Articles List</h2>
          </div>
          <div className="col-md-11">
            <Link href="/create-article" className="btn btn-outline-warning float-right">
              + Add New Article
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>
        <div className="list">{ArticleList}</div>
      </div>
    </div>
  );
}
