"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoadingContext } from "@/context/loading-context";
import UserDetails from "@/utils/validation/user-details-validation";
import register from "@/utils/api-connections/auth/register";
import RegisterForm from "@/components/app/register/register-form";
import { Response } from "@/endpoints/spring-boot";
import { toast } from "sonner";
import { FormDataValid } from "@/components/app/register/types";
import handleError from "@/utils/error/handleError";
import initializeUserProfileDetails from "@/utils/api-connections/auth/initialize-user-profile-details";

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
  const { isLoading, updateIsLoading } = useLoadingContext();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      updateIsLoading(true);
      e.preventDefault();

      const isEmailValid = UserDetails.validateEmail(email);

      const isPasswordValid = UserDetails.validatePassword(password);

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

      const user = await initializeUserProfileDetails(response.data);

      if (!user?.data) throw new Error(user?.error);
      
      console.log(user);

      toast.success("Verification Link has been sent to your email");

      router.push("/login");

    } catch (error) {
      handleError(error);
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
