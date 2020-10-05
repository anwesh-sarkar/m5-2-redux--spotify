import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlobalStyle from "./GlobalStyles";
import styled from "styled-components";
import ArtistRoute from "../ArtistRoute/ArtistRoute";

import { useDispatch } from "react-redux";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions.js";

const DEFAULT_ARTIST_ID = "2eogQKWWoohI3BSnoG7E2U";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(requestAccessToken());

    fetch("/spotify_access_token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(receiveAccessToken(data.response.access_token));
      })
      .catch((err) => {
        console.log(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <Wrapper>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
          </Route>
          <Route path="/artists/:id">
            <ArtistRoute />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div``;
