import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import {
  receiveArtistProfile,
  requestArtistProfile,
  receiveArtistProfileError,
} from "../../actions";

const ArtistRoute = () => {
  let { artistId } = useParams();
  const accessToken = useSelector((state) => state.auth.token);
  const artist = useSelector((state) => state.artists.currentArtist);
  console.log(artist);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(requestArtistProfile());
    if (!accessToken) {
      return;
    }
    fetchArtistProfile(accessToken, artistId)
      .then((data) => {
        console.log(data);
        return dispatch(receiveArtistProfile(data));
      })
      .catch((err) => dispatch(receiveArtistProfileError(err)));
  }, [accessToken, artistId]);

  if (!artist) {
    return <div>Loading..</div>;
  }
  return (
    <div>
      <header>
        <img src={artist.profile.images[1].url} />
        <h1>{artist.profile.name}</h1>
      </header>
    </div>
  );
};

export default ArtistRoute;
