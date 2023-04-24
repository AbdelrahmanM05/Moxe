import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MediaDetails() {
  let { id, mediaType } = useParams();
  const [itemDetails, setItemDetails] = useState({});
  const [mainLoader, setMainLoader] = useState(true);

  async function displayDetails() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=9e8f374c695421864a545db3a15ed6eb&language=en-US`
    );
    setItemDetails(data);
setMainLoader(false)
  }

  useEffect(() => {
    setMainLoader(true)
    displayDetails();
  }, []);
  return (
    <>
      {mainLoader && (
        <div id="loading">
          <span className="loader"></span>
        </div>
      )}
      {itemDetails ? (
        <>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4">
                {itemDetails.poster_path ? (
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w500" +
                      itemDetails.poster_path
                    }
                    className="w-100 my-2"
                    alt=""
                  />
                ) : (
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w500" +
                      itemDetails.profile_path
                    }
                    className="w-100 my-2"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-8">
                <div className="details-content">
                  <h2 className="mb-3">
                    {itemDetails.title} {itemDetails.name}
                  </h2>
                  <p className="text-secondary mb-5">
                    {itemDetails.overview} {itemDetails.biography}
                  </p>
                  {itemDetails.vote_average ? (
                    <h4 className="mb-4">
                      Vote Average:{"  "}
                      <span className="vote p-1">
                        {itemDetails.vote_average}
                      </span>
                    </h4>
                  ) : (
                    <h4 className="mb-4">
                      Popularity:{"  "}
                      <span className="vote p-1">{itemDetails.popularity}</span>
                    </h4>
                  )}

                  {itemDetails.vote_count ? (
                    <h4 className="mb-4">
                      Vote Count:{"  "}
                      <span className="vote p-1">
                        {itemDetails.vote_count}{" "}
                      </span>
                    </h4>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div id="loader">
          <i className="fa fa-spin fa-spinner fa-8x"></i>
        </div>
      )}
    </>
  );
}
