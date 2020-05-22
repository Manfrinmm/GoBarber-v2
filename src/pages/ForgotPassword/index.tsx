import React, { useRef, useState, useCallback } from "react";
import { FiLogIn, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import logoImg from "../../assets/logo.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useToast } from "../../hooks/toast";
import api from "../../services/api";
import getValidationErros from "../../utils/getValidationErros";
import { Container, Content, Background } from "./styles";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email("Digite um e-mail válido.")
            .required("O e-mail é obrigatório."),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post("/password/forgot", {
          email: data.email,
        });

        addToast({
          title: "E-mail de recuperação enviado!",
          type: "success",
          description:
            "Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);

          addToast({
            title: "Erro no formulário",
            type: "error",
            description: "Preencha os dados de forma correta.",
          });

          return;
        }

        addToast({
          title: "Erro na recuperação de senha",
          type: "error",
          description:
            "Ocorreu um erro ao tentar realizar a recuperação da senha, tente novamente.",
          autoClose: 4000,
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Recuperar senha</h1>

          <Input icon={FiMail} name="email" placeholder="Digite seu e-mail" />

          <Button loading={loading} type="submit">
            Recuperar
          </Button>
        </Form>
        <Link to="/">
          <FiLogIn />
          Voltar ao login
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
