import React, { useCallback, useRef, ChangeEvent } from "react";
import { FiUser, FiMail, FiLock, FiCamera, FiArrowLeft } from "react-icons/fi";
import { useHistory, Link } from "react-router-dom";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import api from "../../services/api";
import getValidationErros from "../../utils/getValidationErros";
import { Container, Content, AvatarInput } from "./styles";

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape<ProfileFormData>({
          name: Yup.string().required("O nome é obrigatório."),
          email: Yup.string()
            .email("Digite um e-mail válido.")
            .required("O e-mail é obrigatório."),
          old_password: Yup.string(),
          password: Yup.string().when("old_password", {
            is: value => !!value.length,
            then: Yup.string().min(
              6,
              "A senha deve conter no mínimo 6 dígitos.",
            ),
          }),
          password_confirmation: Yup.string()
            .when("old_password", {
              is: value => !!value.length,
              then: Yup.string().min(
                6,
                "A senha deve conter no mínimo 6 dígitos.",
              ),
            })
            .oneOf([Yup.ref("password")], "As senhas devem ser iguais"),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put("/profile", formData);

        updateUser(response.data);

        addToast({
          title: "Perfil atualizado!",
          type: "success",
          description: `Suas informações do perfil foram atualizadas com sucesso.
           Curta o momento (～￣▽￣)～`,
          autoClose: 7000,
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
          title: "Erro na atualização!",
          type: "error",
          description:
            "Ocorreu um erro ao tentar fazer a atualização, tente novamente.",
          autoClose: 4000,
        });
      }
    },
    [addToast, history],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      if (e.target.files) {
        const data = new FormData();

        data.append("file", e.target.files[0]);

        api.patch("/users/avatar", data).then(response => {
          updateUser(response.data);

          addToast({
            type: "success",
            title: "Avata atualizado",
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          onSubmit={handleSubmit}
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>
          <Input icon={FiUser} name="name" placeholder="Digite seu nome" />
          <Input icon={FiMail} name="email" placeholder="Digite seu e-mail" />

          <Input
            icon={FiLock}
            name="old_password"
            type="password"
            placeholder="Senha atual"
          />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Nova senha"
          />
          <Input
            icon={FiLock}
            name="password_confirmation"
            type="password"
            placeholder="Confirmação de nova"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};
export default Profile;
