import React, { useState, createContext, useContext, useCallback } from "react";

import { uuid } from "uuidv4";

import ToastContainer from "../components/ToastContainer";

export interface ToastMessage {
  id: string;
  type?: "info" | "success" | "error";
  title: string;
  description?: string;
  autoClose?: number;
}

interface ToastContextData {
  addToast(options: Omit<ToastMessage, "id">): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string): void => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  const addToast = useCallback(
    (message: Omit<ToastMessage, "id">): void => {
      const id = uuid();

      const toast = { id, ...message, removeToast };

      setMessages(oldMessages => [...oldMessages, toast]);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer messages={messages} />

      {children}
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext<ToastContextData>(ToastContext);

  return context;
}

export { ToastProvider, useToast };
