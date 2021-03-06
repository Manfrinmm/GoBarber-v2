import React, { useRef, useCallback } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import logoImg from "../../assets/logo.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import getValidationErros from "../../utils/getValidationErros";
import { Container, Content, Background } from "./styles";

interface SignFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email("Digite um e-mail válido.")
            .required("O e-mail é obrigatório."),
          password: Yup.string().required("A senha é obrigatório."),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn(data);

        addToast({
          title: "Deu tudo certo!",
          type: "success",
          description: "Vida que segue né não?!",
        });

        history.push("/dashboard");
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
          title: "Erro na autenticação",
          type: "error",
          description: "Ocorreu um erro ao fazer login, cheque as credenciais.",
          autoClose: 4000,
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Faça seu logon</h1>

          <Input icon={FiMail} name="email" placeholder="Digite seu e-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Digite sua senha"
          />

          <Button type="submit">Entrar</Button>

          <Link to="/forgot-password">Esqueci minha senha</Link>
        </Form>
        <Link to="/register">
          <FiLogIn />
          Criar conta
        </Link>
      </Content>
      <Background />
    </Container>
  );
};
export default SignIn;
