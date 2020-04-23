import React, { useEffect } from "react";
import {
  FiInfo,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
} from "react-icons/fi";

import { ToastMessage, useToast } from "../../../hooks/toast";
import { Container } from "./styles";

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  const { id, title, description, type, autoClose } = message;

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, autoClose || 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, id, autoClose]);

  const icons = {
    info: <FiInfo size={20} />,
    success: <FiCheckCircle size={20} />,
    error: <FiAlertCircle size={20} />,
  };

  return (
    <Container
      type={type || "info"}
      hasDescription={!!description}
      style={style}
    >
      {icons[type || "info"]}

      <div>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
