"use client";

import { useState } from "react";
import login from "@/utils/api-connections/auth/login";
import { Response } from "@/endpoints/spring-boot/index";
import LoginForm from "@/components/app/login/login-form";
import UserDetails from "@/utils/validation/user-details-validation";
import { useLoadingContext } from "@/context/loading-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LoginFormValidate,
  MailVerificationFormValidate,
} from "@/components/app/login/type";
import mailVerificationRequest from "@/utils/api-connections/auth/mail-verification-request";
import { useUserRoleContextProvider } from "@/context/user-role-context";
import forgotPasswordRequest from "@/utils/api-connections/auth/forgot-password-request";
import handleError from "@/utils/error/handleError";

const loginFormValidate: LoginFormValidate = {
  email: false,
  emailWarning: "",
  password: false,
  passwordWarning: "",
};

const mailVerificationFormValidate: MailVerificationFormValidate = {
  verificationMail: true,
  verificationMailWarning: "",
};

const LoginFormComponent = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordMail, setForgotPasswordMail] = useState("");
  const [loginFormValid, setLoginFormValid] = useState(loginFormValidate);
  const [verificationMail, setVerificationMail] = useState("");
  const [mailVerificationFormValid, setMailVerificationFormValid] = useState(
    mailVerificationFormValidate
  );
  const { isLoading, updateIsLoading } = useLoadingContext();
  const { updateUserRole } = useUserRoleContextProvider();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    try {
      updateIsLoading(true);
      e.preventDefault();
  
      const emailValidation = UserDetails.validateEmail(email);
      const passwordValidation = UserDetails.validateRequiredField(password);
  
      if (!emailValidation.isValid || !passwordValidation.isValid) {
        setLoginFormValid({
          email: !emailValidation.isValid,
          emailWarning: emailValidation.warning,
          password: !passwordValidation.isValid,
          passwordWarning: passwordValidation.warning,
        });
        return;
      } else {
        setLoginFormValid(loginFormValidate); 
      }
  
      const response = await login(email, password);
  
      if (!response || response.error) {
        throw new Error(response?.error || "An error occurred during login");
      }
  
      if (!response.data || !response.data.authorities || response.data.authorities.length === 0) {
        throw new Error("Missing or invalid user role data");
      }
  
      updateUserRole(response.data.authorities[0].authority);
  
      toast.success("Login successful!");
      router.replace("/user/home");
  
    } catch (error) {
      handleError(error); 
    } finally {
      updateIsLoading(false);
    }
  };

  const handleVerificationMail = async () => {
    try {
      updateIsLoading(true);

      const isVerificationMailValid =
        UserDetails.validateEmail(verificationMail);
      const isVerificationMailEmpty = verificationMail.length <= 0;

      if (!isVerificationMailValid || isVerificationMailEmpty) {
        setMailVerificationFormValid({
          verificationMail: false,
          verificationMailWarning: isVerificationMailEmpty
            ? "Field is required"
            : "Enter a valid email",
        });
        return;
      } else {
        setMailVerificationFormValid(mailVerificationFormValidate);
      }

      const response: Response | undefined = await mailVerificationRequest(
        verificationMail
      );

      if (response === undefined) throw new Error("Something went wrong");
      if (response?.error) throw new Error(response.error);
      toast.success(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      updateIsLoading(false);
    }
  };

  const setDefaultVerificationMailValid = () => {
    setMailVerificationFormValid(mailVerificationFormValidate);
  };

  const handleForgotPasswordRequest = async () => {
    updateIsLoading(true);
    try {
      const response = await forgotPasswordRequest(forgotPasswordMail);
      if (response === undefined) throw new Error("Something went wrong");
      if (response?.error) throw new Error(response.error);
      toast.success(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      updateIsLoading(false);
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      forgotPasswordMail={forgotPasswordMail}
      loginFormValidate={loginFormValid}
      verificationMail={verificationMail}
      isLoading={isLoading}
      setEmail={setEmail}
      setPassword={setPassword}
      setForgotPasswordMail={setForgotPasswordMail}
      handleLoginSubmit={handleLoginSubmit}
      setVerificationMail={setVerificationMail}
      setDefaultVerificationMailValid={setDefaultVerificationMailValid}
      handleVerificationMail={handleVerificationMail}
      handleForgotPasswordRequest={handleForgotPasswordRequest}
    />
  );
};

export default LoginFormComponent;
