import React from "react";
import axios, { AxiosResponse } from "axios";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/form/FormContainer";
import SubmitButton from "../../components/form/SubmitButton";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormField from "../../components/form/FormField";
import {
  EmailValidation,
  PasswordValidation,
} from "../../utils/FormValidation";
//import LoginUser from "../../api/user/LoginUser";
import {LoginUser}  from "../../api/UserDB";
import { login } from '../../app/reducers/CurrentUserSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'


interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({mode: "all"});

  const mutation = useMutation(LoginUser, { 
    onSuccess: (data) => {
      const { token, id, name, usergroup } = data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", id);
      localStorage.setItem("username", name);
      dispatch(login({
        id: id, role: usergroup, name: name
      }))
      return navigate("/dashboard", { replace: true })
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <FormContainer header="Login to your account" multistep={false} handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <FormField
          label="Email Address"
          name="email"
          type="email"
          register={register}
          errormsg={errors.email?.message}
          rules={EmailValidation}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          register={register}
          errormsg={errors.password?.message}
          rules={PasswordValidation}
        />

        {mutation.isError && axios.isAxiosError(mutation.error) ? (
          <ErrorAlert error={mutation.error} />
        ) : null}
        <div className="flexcontainer" style={{ marginTop: 20 }}>
          <SubmitButton
            text="Continue"
            loading={mutation.isLoading}
            multipart={false}
          />
        </div>
    </FormContainer>
  );
};

export default Login;