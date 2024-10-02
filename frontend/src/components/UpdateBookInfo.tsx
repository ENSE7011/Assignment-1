'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Book';
import Link from 'next/link';

const UpdateBookInfo = () => {
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  const id = useParams<{ id: string }>().id;
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/books/${id}`)
        .then((res) => res.json())
        .then((data) => setBook(data))
        .catch((err) => console.log('Error fetching book:', err));
    })();
  }, [id]);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/books/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    })
    .then(() => router.push(`/show-book/${id}`))
    .catch((err) => console.log('Error updating book:', err));
  };

  return (
    <div className="UpdateBookInfo">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link href="/" className="btn btn-outline-warning float-left">
              Show Book List
            </Link>
            <br />
            <h1 className="display-4 text-center">Edit Book</h1>
            <p className="lead text-center">Update Book's Info</p>
            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="title"
                  className="form-control"
                  value={book.title}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="ISBN"
                  name="isbn"
                  className="form-control"
                  value={book.isbn}
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
                  value={book.author}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <textarea
                  placeholder="Description of the Book"
                  name="description"
                  className="form-control"
                  value={book.description}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="date"
                  placeholder="Published Date"
                  name="published_date"
                  className="form-control"
                  value={book.published_date?.toString()}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Publisher of the Book"
                  name="publisher"
                  className="form-control"
                  value={book.publisher}
                  onChange={onChange}
                />
              </div>
              <br />
              <button type="submit" className="btn btn-outline-info btn-lg btn-block">
                Update Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBookInfo;
