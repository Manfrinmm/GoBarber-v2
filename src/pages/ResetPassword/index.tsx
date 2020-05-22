import React, { useRef, useState, useCallback } from "react";
import { FiLock } from "react-icons/fi";
import { useHistory, useLocation } from "react-router-dom";

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

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required("A senha é obrigatório."),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref("password")],
            "As senhas devem ser iguais",
          ),
        });

        await schema.validate(data, { abortEarly: false });

        const { password, password_confirmation } = data;
        await api.post("/password/reset", {
          password,
          password_confirmation,
          token,
        });

        addToast({
          title: "Senha alterada com sucesso!",
          type: "success",
          description: "Basta fazer login agora na sua conta",
        });

        history.push("/");
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
          title: "Erro ao resetar a senha",
          type: "error",
          description:
            "Ocorreu um erro ao tentar resetar a senha, tente novamente.",
          autoClose: 4000,
        });
      } finally {
        setLoading(false);
      }
    },
    [history, addToast, token],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Resetar senha</h1>

          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Digite sua nova senha"
          />
          <Input
            icon={FiLock}
            name="password_confirmation"
            type="password"
            placeholder="Confirme sua senha"
          />

          <Button loading={loading} type="submit">
            Alterar senha
          </Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
