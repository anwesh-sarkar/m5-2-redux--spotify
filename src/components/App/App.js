import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./GlobalStyles";
import styled from "styled-components";

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Router>TODO</Router>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div``;
