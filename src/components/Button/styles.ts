import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  justify-content: center;

  background: #ff9000;
  color: #312e38;
  font-weight: 500;

  height: 56px;
  width: 100%;

  padding: 0 16px;
  margin-top: 16px;
  border-radius: 10px;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, "#ff9000")};
  }
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;

  color: rgba(255, 255, 255, 0.8);

  div {
    margin-right: 8px;
    width: 20px;
    height: 20px;
    border: 4px solid rgba(255, 255, 255, 0.2);
    border-top-color: rgba(255, 255, 255, 0.8);

    border-radius: 50%;

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    animation: spin 1s linear infinite;
  }
`;
