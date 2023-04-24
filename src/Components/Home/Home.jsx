import axios from "axios";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import MediaItem from "../MediaItem/MediaItem";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [actors, setActors] = useState([]);
  const [mainLoader, setMainLoader] = useState(true);

  async function getTrending(media, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${media}/week?api_key=9e8f374c695421864a545db3a15ed6eb`
    );
    callback(data.results);
    setMainLoader(false)
  }
  useEffect(() => {
    setMainLoader(true)
    getTrending("movie", setMovies);
    getTrending("tv", setShows);
    getTrending("person", setActors);
  }, []);

  return (
    <>
      {mainLoader && (
        <div id="loading">
          <span className="loader"></span>
        </div>
      )}
      <div className="container">
        <div className="row g-3 py-3">
          <div className="col-md-4 d-flex align-items-center">
            <div>
              <div className="brdr w-25 mb-3"></div>
              <h2 className="h4">
                Trending <br /> Movies <br />
                Right Now
              </h2>
              <p className="text-muted">Most Watched Movies By week</p>
              <div className="brdr w-100 mt-3"></div>
            </div>
          </div>
          {movies.slice(0, 10).map((item) => (
            <MediaItem key={item.id} item={item} />
          ))}
        </div>
        <div className="row g-3 py-3">
          <div className="col-md-4 d-flex align-items-center">
            <div>
              <div className="brdr w-25 mb-3"></div>
              <h2 className="h4">
                Trending <br /> Shows <br />
                Right Now
              </h2>
              <p className="text-muted">Most Watched Shows By week</p>
              <div className="brdr w-100 mt-3"></div>
            </div>
          </div>
          {shows.slice(0, 10).map((item) => (
            <MediaItem key={item.id} item={item} />
          ))}
        </div>
        <div className="row g-3 py-3">
          <div className="col-md-4 d-flex align-items-center">
            <div>
              <div className="brdr w-25 mb-3"></div>
              <h2 className="h4">
                Trending <br /> Actors <br />
                Right Now
              </h2>
              <p className="text-muted">Most Wanted Actors By week</p>
              <div className="brdr w-100 mt-3"></div>
            </div>
          </div>
          {actors.slice(0, 10).map((item) => (
            <MediaItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
