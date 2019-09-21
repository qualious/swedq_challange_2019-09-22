import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #151516;
  }

  body {
    font-family: "Avenir Next", "Avenir", sans-serif;
  }

  #app {
    background-color: #151516;
    color: white;
    min-height: 100%;
    min-width: 100%;
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__clear-indicator {
    position: relative;
    left: 16px;
  }

  .react-select {
    font-size: 16px;
  }

  .react-select__control {
    background-color:  transparent !important; // rgba(255,255,255,0.6) !important;
    box-shadow: none !important;
    border: 2px solid rgba(21, 21, 22, 0.9) !important;
  }

  .react-select__input {
    color: white !important;
  }

  .react-select__placeholder {
    color: white !important;
  }

  .react-select__single-value {
    color: white !important;
  }

  .react-select__indicator {
    color: white !important;
  }

  .react-select__menu {
    background-color: rgba(21, 21, 22, 0.9) !important;
    margin-top: 1px !important;
  }

`;

export default GlobalStyle;
