"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Article, DefaultEmptyArticle, Claim } from "./Article"
import ShowClaimList from "./ShowClaimList"
import Link from "next/link"


const ShowArticleDetails = () => {
  const [article, setArticle] = useState < Article > (DefaultEmptyArticle);

  //  < { id: string } >
  const id = useParams < { id: string } > ().id;
  const navigate = useRouter();

  useEffect(() => {
    async () => {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${id}`, { method: "GET", headers: { "Access-Control-Allow-Origin": "*" } })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setArticle(data);
        })
        .catch((err) => {
          console.log("Error from ShowArticleDetails: " + err)
        })
    }
  }, [id])

  const onDeleteClick = async (id: string) => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${id}`, { method: "DELETE", headers: { "Access-Control-Allow-Origin": "*" } })
      .then((res) => {
        navigate.push("/")
      })
      .catch((err) => {
        console.log("Error form ShowArticleDetails_deleteClick: " + err)
      })
  }

  const onClick = async () => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/apis/articles/${id}`, { method: "GET", headers: { "Access-Control-Allow-Origin": "*" } })
      .then((res) => {
        navigate.push(`/show-article/${id}`);
      })
      .catch((err) => {
        console.log("Error form ShowArticleDetails_onClick: " + err);
      })
  };

  return (
    <div className="ShowArticleDetails">
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <br /> <br />
            <Link href="/" className="btn btn-outline-warning float-left">
              Show Article List
            </Link>
          </div>
          <br />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Article&quot;s Record</h1>
            <p className="lead text-center">View Article&quot;s Info</p>
            <hr /> <br />
          </div>
          <div className="col-md-10 m-auto">
            <div>
              <table className="table table-hover table-dark table-striped table-bordered">
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Title</td>
                    <td>{article.title}</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Author</td>
                    <td>{article.author}</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>DOI</td>
                    <td>{article.doi}</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>Journal</td>
                    <td>{article.journal}</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>Published Year</td>
                    <td>{article.published_year}</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>Description</td>
                    <td>{article.description}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <div>{ShowClaimList()}</div>
          <br />
          <div className="col-md-6 m-auto">
            <button
              type="button"
              className="btn btn-outline-danger btn-lg btn-block"
              onClick={() => {
                onDeleteClick(article._id || "")
              }}
            >
              Delete Article
            </button>
          </div>
          <div className="col-md-6 m-auto">
            <button
              type="button"
              className="btn btn-outline-info btn-lg btn-block"
              onClick={onClick} >
              Edit Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowArticleDetails;
