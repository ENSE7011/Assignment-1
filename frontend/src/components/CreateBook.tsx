'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Book, DefaultEmptyBook } from './Book';

const CreateBookComponent = () => {
  const [book, setBook] = useState<Book>(DefaultEmptyBook);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        setBook(DefaultEmptyBook);
      })
      .catch((err) => {
        console.error('Error while creating book: ', err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="w-full max-w-md mx-auto bg-gray-900 rounded-lg shadow-lg p-8">
        <Link href="/" className="block mb-4 text-center bg-blue-600 py-2 rounded-lg">
          Show Book List
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-center">Add Book</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Title of the Book"
              value={book.title}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="isbn"
              placeholder="ISBN"
              value={book.isbn}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={book.author}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="description"
              placeholder="Describe this book"
              value={book.description}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              name="published_date"
              value={book.published_date?.toString()}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              name="publisher"
              placeholder="Publisher of this Book"
              value={book.publisher}
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

export default CreateBookComponent;
