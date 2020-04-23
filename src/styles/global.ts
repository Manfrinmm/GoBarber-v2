import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background: #312e38;
    color:#fff;
    -webkit-font-smoothing: antialiased;
  }


  body, button, input {
    font: 1.6rem "Roboto Slab",  serif;

  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
    border: 0;
  }
`;
