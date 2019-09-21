import React from "react";
import styled from "styled-components";

const NotFound = () => (
  <Container>
    <Header>NOT FOUND</Header>
  </Container>
);

const Container = styled.div`
  width: 1066px;
  height: 600px;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
  text-align: center;

  border: 5px solid transparent;
  border-image: linear-gradient(
    to bottom right,
    #b827fc 0%,
    #2c90fc 25%,
    #b8fd33 50%,
    #fec837 75%,
    #fd1892 100%
  );
  border-image-slice: 1;
`;

const Header = styled.h1`
  line-height: 520px;
`;

export default NotFound;
