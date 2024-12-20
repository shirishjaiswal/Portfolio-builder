"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoadingContextProvider } from "@/context/loading-context";
import UserDetailsValidation from "@/utils/validation/user-details-validation";
import register from "@/utils/api-connections/auth/register";
import RegisterForm from "@/components/app/register/register-form";
import { Response } from "@/endpoints/spring-boot";
import { toast } from "sonner";
import { FormDataValid } from "@/components/app/register/types";

const formDataValid : FormDataValid= {
  email: false,
  emailWarning: "",
  password: false,
  passwordWarning: "",
  confirmPassword: false,
  confirmPasswordWarning: "",
};

const RegisterFormComponent = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDataFormatValid, setDataFormatValid] = useState(formDataValid);
  const { isLoading, updateIsLoading } = useLoadingContextProvider();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      updateIsLoading(true);
      e.preventDefault();

      const isEmailValid = UserDetailsValidation.email(email);

      const isPasswordValid = UserDetailsValidation.password(password);

      const isConfirmPasswordValid =
        isPasswordValid && password === confirmPassword;

      if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
        setDataFormatValid({
          email: !isEmailValid,
          emailWarning:
            email.length <= 0 ? "Field is required" : "Enter a valid email",
          password: !isPasswordValid,
          passwordWarning:
            password.length <= 0
              ? "Field is required"
              : "Enter a valid password [8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 symbol]",
          confirmPassword: password !== confirmPassword,
          confirmPasswordWarning:
            confirmPassword.length <= 0
              ? "Field is required"
              : "Passwords do not match",
        });
        return;
      } else {
        setDataFormatValid(formDataValid);
      }

      const response: Response | undefined = await register(
        email,
        password,
        confirmPassword
      );

      if (response === undefined) throw new Error("Something went wrong");

      if (response?.error) throw new Error(response.error);

      toast.success("Verification Link has been sent to your email");

      router.push("/login");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      updateIsLoading(false);
    }
  };

  return (
    <RegisterForm
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      isDataFormatValid={isDataFormatValid}
      isLoading={isLoading}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      handleSubmit={handleSubmit}
    />
  );
};

export default RegisterFormComponent;
