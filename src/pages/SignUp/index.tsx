import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiUser, FiMail, FiLock } from "react-icons/fi";
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

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: object) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("O nome é obrigatório."),
          email: Yup.string()
            .email("Digite um e-mail válido.")
            .required("O e-mail é obrigatório."),
          password: Yup.string().min(
            6,
            "A senha deve conter no mínimo 6 dígitos.",
          ),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post("/users", data);

        addToast({
          title: "Cadastro realizado",
          type: "success",
          description: `Seu cadastro foi feito, agora vai lá e faça o login.
           Curta o momento (～￣▽￣)～`,
          autoClose: 7000,
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
          title: "Erro no cadastro",
          type: "error",
          description: "Ocorreu um erro ao fazer o cadastro, cheque os dados.",
          autoClose: 4000,
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Faça seu cadastro</h1>

          <Input icon={FiUser} name="name" placeholder="Digite seu nome" />
          <Input icon={FiMail} name="email" placeholder="Digite seu e-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Digite sua senha"
          />

          <Button type="submit">Entrar</Button>
        </Form>
        <Link to="/">
          <FiArrowLeft />
          Voltar para o logon
        </Link>
      </Content>
    </Container>
  );
};
export default SignUp;
