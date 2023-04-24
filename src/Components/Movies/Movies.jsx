import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [mainLoader, setMainLoader] = useState(true);
  let pageNumbers = new Array(10).fill(1).map((ele, index) => index + 1);
  const mediaType = "movie";

  async function getMovies(page) {
    setMainLoader(true)
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=9e8f374c695421864a545db3a15ed6eb&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`
    );
    setMovies(data.results);
    setMainLoader(false)
  }

  useEffect(() => {
    getMovies(1);
  }, []);

  return (
    <>
      {mainLoader && (
        <div id="loading">
          <span className="loader"></span>
        </div>
      )}

      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-3">
            <Link
              className="text-decoration-none"
              to={`/media-details/${movie.id}/${mediaType}`}
            >
              <div className="position-relative">
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  className="w-100"
                  alt=""
                />
                <h3 className="h6">{movie.title}</h3>
                <p className="vote position-absolute top-0 end-0 p-1">
                  {movie.vote_average.toFixed(1)}
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
                onClick={() => getMovies(page)}
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
