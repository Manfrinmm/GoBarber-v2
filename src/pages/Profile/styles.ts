import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;

  align-items: stretch;

  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -176px auto 0;

  place-content: center;
  overflow-x: hidden;

  width: 100%;
  max-width: 700px;
  min-width: 300px;

  padding: 24px;

  form {
    display: flex;
    flex-direction: column;

    margin: 8rem 0;
    width: 100%;
    max-width: 340px;

    h1 {
      font-size: 2rem;
      text-align: left;
      margin-bottom: 24px;
    }

    div + div {
      margin-top: 8px;
    }

    > div:nth-child(5) {
      margin-top: 24px;
    }
  }
`;

export const AvatarInput = styled.div`
  margin: 0 auto;
  margin-bottom: 32px;

  position: relative;
  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    right: 0;
    bottom: 0;

    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;

    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, "#ff9000")};
    }
  }
`;
