'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Article, DefaultEmptyArticle } from './Article';

const CreateArticleComponent = () => {
  const [article, setArticle] = useState < Article > (DefaultEmptyArticle);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/apis/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    })
      .then((res) => {
        setArticle(DefaultEmptyArticle);
      })
      .catch((err) => {
        console.error('Error while creating article: ', err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="w-full max-w-md mx-auto bg-gray-900 rounded-lg shadow-lg p-8">
        <Link href="/" className="block mb-4 text-center bg-blue-600 py-2 rounded-lg">
          Show Article List
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-center">Add Article</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Title of the Article"
              value={article.title}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="doi"
              placeholder="DOI"
              value={article.doi}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={article.author}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="description"
              placeholder="Describe this article"
              value={article.description}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="string"
              name="published_year"
              placeholder="Year of publication"
              value={article.published_year}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              name="journal"
              placeholder="Publishing Journal of this Article"
              value={article.journal}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticleComponent;
