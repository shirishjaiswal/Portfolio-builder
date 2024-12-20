"use client";

import { useState } from "react";
import login from "@/utils/api-connections/auth/login";
import { Response } from "@/endpoints/spring-boot/index";
import LoginForm from "@/components/app/login/login-form";
import UserDetailsValidation from "@/utils/validation/user-details-validation";
import { useLoadingContextProvider } from "@/context/loading-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LoginFormValidate,
  MailVerificationFormValidate,
} from "@/components/app/login/type";
import mailVerificationRequest from "@/utils/api-connections/auth/mail-verification-request";
import { useUserRoleContextProvider } from "@/context/user-role-context";

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
  const [loginFormValid, setLoginFormValid] = useState(loginFormValidate);
  const [verificationMail, setVerificationMail] = useState("");
  const [mailVerificationFormValid, setMailVerificationFormValid] = useState(
    mailVerificationFormValidate
  );
  const { isLoading, updateIsLoading } = useLoadingContextProvider();
  const { updateUserRole } = useUserRoleContextProvider();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    try {
      updateIsLoading(true);
      e.preventDefault();

      const isEmailValid = UserDetailsValidation.email(email);
      const isPasswordValid = password.length > 0;

      if (!isEmailValid || !isPasswordValid) {
        setLoginFormValid({
          email: !isEmailValid,
          emailWarning:
            email.length <= 0 ? "Field is required" : "Enter a valid email",
          password: !isPasswordValid,
          passwordWarning: "Field is required",
        });
        return;
      } else {
        setLoginFormValid(loginFormValidate);
      }

      const response = await login(email, password);

      if (!response || response.error)
        throw new Error(response?.error || "An error occurred during login");
      
      updateUserRole(response.data.authorities[0].authority);

      // Handle successful login
      toast.success("Login successful!");

      // Redirect to home page
      router.replace("/user/home");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      updateIsLoading(false);
    }
  };

  const handleVerificationMail = async () => {
    try {
      updateIsLoading(true);

      const isVerificationMailValid =
        UserDetailsValidation.email(verificationMail);
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
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      updateIsLoading(false);
    }
  };

  const setDefaultVerificationMailValid = () => {
    setMailVerificationFormValid(mailVerificationFormValidate);
  };

  return (
    <LoginForm
      email={email}
      password={password}
      loginFormValidate={loginFormValid}
      mailVerificationFormValidate={mailVerificationFormValid}
      verificationMail={verificationMail}
      isLoading={isLoading}
      setEmail={setEmail}
      setPassword={setPassword}
      handleLoginSubmit={handleLoginSubmit}
      setVerificationMail={setVerificationMail}
      setDefaultVerificationMailValid={setDefaultVerificationMailValid}
      handleVerificationMail={handleVerificationMail}
    />
  );
};

export default LoginFormComponent;
