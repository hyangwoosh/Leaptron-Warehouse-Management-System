import { Box, Link, Typography } from "@mui/material";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/form/ErrorAlert";
import FormContainer from "../../components/form/FormContainer";
import FormField from "../../components/form/FormField";
import SubmitButton from "../../components/form/SubmitButton";
import { MultiFactorCodeValidation } from "../../utils/FormValidation";
// import LoginUser from "../../api/user/LoginUser";
import { Resend2FAToken, Verify2FAToken } from "../../api/UserDB";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  authenticateUser,
  selectId,
  selectMobileNo,
  selectName,
  selectToken,
} from "../../app/reducers/CurrentUserSlice";
import { ChangeTab } from "../../app/reducers/SidebarSlice";
import { Toast } from "../../components/alerts/SweetAlert";

interface FormValues {
  code: number | string;
}

const MultiFactorAuthentication: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const usermobileno = useAppSelector(selectMobileNo);
  const usertoken = useAppSelector(selectToken);
  const userid = useAppSelector(selectId);
  const username = useAppSelector(selectName);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onSubmit" });

  const resendmutation = useMutation(Resend2FAToken);

  const verifymutation = useMutation((data: FormValues) =>
    Verify2FAToken(data, usermobileno)
  );

  const controls = useAnimation();

  const variants = {
    detecterror: () => ({
      // rotate: [-1, 1.3, 0],
      x: [10, -10, 0, 10, -10, 0],
      transition: {
        duration: 0.4,
      },
    }),
  };

  const onSubmit = (data: FormValues) => {
    verifymutation.mutate(data, {
      onSuccess: () => {
        localStorage.setItem("token", usertoken);
        localStorage.setItem("user_id", userid.toString());
        localStorage.setItem("username", username);
        dispatch(authenticateUser());
        dispatch(ChangeTab({ currenttab: "Dashboard" }));
        Toast.fire({
          icon: "success",
          title: "Logged in successfully",
          customClass: "swalpopup",
          timer: 1500,
          width: 330,
        });
        return navigate("/dashboard", { replace: true });
      },
      onError: () => {
        controls.start("detecterror");
      },
    });
  };

  const resend = () => {
    resendmutation.mutate({ mobileno: usermobileno });
  };

  return (
    <motion.div variants={variants} animate={controls}>
      <FormContainer
        header="Two-Step Authentication"
        multistep={false}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        <Typography className="formsubheading">
          To continue, please enter the 6-digit verification code send to your
          phone ending in {usermobileno.substring(usermobileno.length - 4)}
        </Typography>

        <Box className="formsubheading">
          Didnt receive a code?{" "}
          <Link // eslint-disable-line jsx-a11y/anchor-is-valid
            onClick={() => {
              resend();
            }}
            component="button"
            variant="body2"
            underline="hover"
            sx={{ ml: "10px" }}
          >
            Resend
          </Link>
        </Box>
        <FormField
          label="Enter 6-digit Code"
          name="code"
          type="number"
          register={register}
          error={errors.code}
          rules={MultiFactorCodeValidation}
        />
        {verifymutation.isError && axios.isAxiosError(verifymutation.error) ? (
          <ErrorAlert error={verifymutation.error} />
        ) : null}
        <Box className="flexcontainer" style={{ marginTop: 20 }}>
          <SubmitButton
            text="Continue"
            loading={verifymutation.isLoading}
            multipart={false}
          />
        </Box>
        {/* <FormField
          label="Email Address"
          name="email"
          type="email"
          register={register}
          error={errors.email}
          rules={EmailValidation}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
          rules={PasswordValidation}
        />

        {mutation.isError && axios.isAxiosError(mutation.error) ? (
          <ErrorAlert error={mutation.error} />
        ) : null}

        <Link
          onClick={() => {
            navigate("/forgetpassword");
          }}
          underline="hover"
          sx={{ ml: 10 }}
        >
          Forgot your password?
        </Link>

        <Box className="flexcontainer" style={{ marginTop: 20 }}>
          <SubmitButton
            text="Continue"
            loading={mutation.isLoading}
            multipart={false}
          />
        </Box> */}
      </FormContainer>
    </motion.div>
  );
};

export default MultiFactorAuthentication;
