import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Tvshow() {
  const [shows, setShows] = useState([]);
  const [mainLoader, setMainLoader] = useState(true);
  let pageNumbers = new Array(10).fill(1).map((ele, index) => index + 1);
  const mediaType = "tv";

  async function getShows(page) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=9e8f374c695421864a545db3a15ed6eb&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`
    );
    setShows(data.results);
    setMainLoader(false)
  }

  useEffect(() => {
    setMainLoader(true)
    getShows(1);
  }, []);

  return (
    <>
      {mainLoader && (
        <div id="loading">
          <span className="loader"></span>
        </div>
      )}
        <div className="row">
          {shows.map((show) => (
            <div key={show.id} className="col-md-3">
              <Link
                className="text-decoration-none"
                to={`/media-details/${show.id}/${mediaType}`}
              >
                <div className="position-relative">
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + show.poster_path}
                    className="w-100"
                    alt=""
                  />
                  <h3 className="h6">{show.name}</h3>
                  <p className="vote position-absolute top-0 end-0 p-1">
                    {show.vote_average.toFixed(1)}
                  </p>
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
                  onClick={() => getShows(page)}
                >
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </>

  );
}
