import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import chroma from "chroma-js";

const Vehicle = ({ data }) => {
  let colorFunc;

  switch (data.payload.status) {
    case "Not Responding":
      colorFunc = color =>
        chroma(color)
          .brighten()
          .hex();
      break;
    case "En Route":
      colorFunc = color =>
        chroma(color)
          .darken()
          .hex();
      break;
    default:
      colorFunc = color => color;
  }
  const [hover, setHover] = useState(false);
  return (
    <>
      <HoverBefore hover={hover} color={colorFunc(data.company.color)} />
      <Pin
        onMouseOver={() => setHover(true)}
        onFocus={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onBlur={() => setHover(false)}
        colorFunc={colorFunc}
        color={data.company.color}
      />
      <HoverAfter hover={hover} color={colorFunc(data.company.color)} />
      <Info hover={hover} color={data.company.color}>
        <span>{data.id}</span>
        <span>{data.registrationNumber}</span>
        <span>{data.payload.status}</span>
      </Info>
    </>
  );
};

Vehicle.propTypes = {
  data: PropTypes.object,
};

const Info = styled.span`
  opacity: ${p => (p.hover ? "1" : "0")};
  transition: ${p => (p.hover ? "1s ease-in opacity" : "none")};
  display: grid;
  color: white;
  font-size: 13px;
  position: absolute;
  width: 130px;
  left: -65px;
  top: 25px;
  height: 80px;
  background: transparent;
  overflow: hidden;
`;

const Hover = styled.div`
  top: 5px;
  position: absolute;
  border-radius: 15px;
  width: ${props => (props.hover ? 75 : 0)}px;
  height: 100px;
  background: ${p => p.color};
  transition: 0.4s linear width;
`;

const HoverBefore = styled(Hover)`
  right: 50%;
  border-bottom-right-radius: 0px !important;
  border-top-right-radius: 0px !important;
`;

const HoverAfter = styled(Hover)`
  left: 50%;
  border-bottom-left-radius: 0px !important;
  border-top-left-radius: 0px !important;
`;

const Pin = styled.div`
  z-index: 5;
  transform: perspective(40px) rotateX(20deg) rotateZ(-45deg);
  transform-origin: 50% 50%;
  border-radius: 50% 50% 50% 0;
  padding: 0 3px 3px 0;
  width: 30px;
  height: 30px;
  background: ${p => p.colorFunc(p.color)};
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -2.2em 0 0 -1.3em;
  -webkit-box-shadow: -1px 1px 4px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: -1px 1px 4px rgba(0, 0, 0, 0.5);
  box-shadow: -1px 1px 4px rgba(0, 0, 0, 0.5);

  &:after {
    content: "";
    width: 1em;
    height: 1em;
    margin: 1em 0 0 0.7em;
    background: #ffffff;
    position: absolute;
    border-radius: 50%;
    -moz-box-shadow: inset -2px 2px 4px hsla(0, 0, 0, 0.5);
    -webkit-box-shadow: inset -2px 2px 4px hsla(0, 0, 0, 0.5);
    box-shadow: inset -2px 2px 4px hsla(0, 0, 0, 0.5);
  }
`;

export default Vehicle;
