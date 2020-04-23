import React from "react";
import { useTransition } from "react-spring";

import { ToastMessage } from "../../hooks/toast";
import { Container } from "./styles";
import Toast from "./Toast";

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: {
        right: "-130%",
        opacity: 0,
        transform: "rotateY(0deg)",
      },
      enter: {
        right: "0%",
        opacity: 1,
        transform: "rotateY(360deg)",
      },
      leave: {
        right: "-130%",
        opacity: 0,
        transform: "rotateY(180deg)",
      },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
