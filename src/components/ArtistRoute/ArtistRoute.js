import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ArtistRoute = () => {
  let { id } = useParams();
  const accessToken = useSelector((state) => state.auth.token);
  return accessToken;
};

export default ArtistRoute;
