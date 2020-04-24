import { shade } from "polished";
import styled, { keyframes } from "styled-components";

import signUpBackground from "../../assets/sign-up-background.png";

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translate(50px);
  }

  to {
    opacity: 1;
    transform: translate(0);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;
  overflow-x: hidden;

  width: 100%;
  max-width: 700px;
  min-width: 300px;

  padding: 24px;

  animation: ${appearFromRight} 1s;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 8rem 0;
    width: 100%;
    max-width: 340px;

    h1 {
      margin-bottom: 24px;
    }

    div + div {
      margin-top: 8px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, "#f4ede8")};
      }
    }
  }

  > a {
    display: flex;
    align-items: center;
    text-decoration: none;

    color: #f4ede8;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, "#f4ede8")};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
`;
