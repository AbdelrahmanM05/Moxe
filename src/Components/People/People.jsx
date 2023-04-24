import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function People() {
  const [actors, setActors] = useState([]);
  const [mainLoader, setMainLoader] = useState(true);
  let pageNumbers = new Array(10).fill(1).map((ele, index) => index + 1);
  const mediaType = "person";

  async function getActors(page) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=9e8f374c695421864a545db3a15ed6eb&language=en-US&page=${page}`
    );
    setActors(data.results);
    setMainLoader(false);
  }

  useEffect(() => {
    setMainLoader(true)
    getActors(1);
  }, []);

  return (
    <>
      {mainLoader && (
        <div id="loading">
          <span className="loader"></span>
        </div>
      )}
      {actors && (
        <>
          {" "}
          <div className="row">
            {actors.map((actor) => (
              <div key={actor.id} className="col-md-3">
                <Link
                  className="text-decoration-none"
                  to={`/media-details/${actor.id}/${mediaType}`}
                >
                  <div className="position-relative">
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w500" + actor.profile_path
                      }
                      className="w-100"
                      alt=""
                    />
                    <h3 className="h6">{actor.name}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <nav className="py-5">
            <ul className="pagination pagination-sm d-flex justify-content-center">
              {pageNumbers.map((page, index) => (
                <li key={index} className="page-item p-1">
                  <Link
                    className="page-link bg-transparent text-white"
                    onClick={() => getActors(page)}
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </>
  );
}
