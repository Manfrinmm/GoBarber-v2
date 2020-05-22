import React, { ButtonHTMLAttributes } from "react";

import { Container, Loading } from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {loading ? (
        <Loading>
          <div /> Carregando
        </Loading>
      ) : (
        children
      )}
    </Container>
  );
};

export default Button;
