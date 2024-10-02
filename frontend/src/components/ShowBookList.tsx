'use client'

import Link from 'next/link';
import BookCard from './BookCard';
import { useState, useEffect } from 'react';
import { Book } from './Book';

export default function ShowBookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/books')
        .then((res) => res.json())
        .then((data) => {
          // Ensure that the fetched data is an array before setting it to state
          if (Array.isArray(data)) {
            setBooks(data);
          } else {
            console.error('Expected an array but received:', data);
            setBooks([]); // Set an empty array if data is not an array
          }
        })
        .catch((err) => {
          console.log('Error fetching books:', err);
        });
    })();
  }, []);

  const bookList = books.length === 0 ? (
    <p>There is no book record!</p>
  ) : (
    books.map((book, k) => <BookCard book={book} key={k} />)
  );

  return (
    <div className="ShowBookList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Books List</h2>
          </div>
          <div className="col-md-11">
            <Link href="/create-book" className="btn btn-outline-warning float-right">
              + Add New Book
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>
        <div className="list">{bookList}</div>
      </div>
    </div>
  );
}
