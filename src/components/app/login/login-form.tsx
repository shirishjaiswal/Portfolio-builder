import DialogBox from "@/components/global-components/dialogue-box/dialogue-box";
import InputTextField from "@/components/global-components/input-field/input-text-field";
import Loading from "@/components/loading/loading";
import Link from "next/link";
import { useState } from "react";
import { LoginFormValidate } from "@/components/app/login/type";
import handleError from "@/utils/error/handleError";

type LoginFormProps = {
  email: string;
  password: string;
  forgotPasswordMail: string;
  loginFormValidate: LoginFormValidate;
  verificationMail: string;
  isLoading: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setForgotPasswordMail: (email: string) => void;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setVerificationMail: (verificationMail: string) => void;
  setDefaultVerificationMailValid: () => void;
  handleVerificationMail: () => void;
  handleForgotPasswordRequest: () => void;
};

const createDialogBoxProps = (
  isOpen: boolean,
  onClose: () => void,
  title: string,
  subtitle: string,
  inputFields: {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }[],
  buttons: {
    label: string;
    type: "green" | "blue" | "red" | "gray";
    onClick: () => void;
  }[]
) => ({
  isOpen,
  onClose,
  title,
  subtitle,
  inputFields,
  buttons,
});

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  forgotPasswordMail,
  loginFormValidate,
  verificationMail,
  isLoading,
  setEmail,
  setPassword,
  setForgotPasswordMail,
  handleLoginSubmit,
  setVerificationMail,
  setDefaultVerificationMailValid,
  handleVerificationMail,
  handleForgotPasswordRequest,
}: LoginFormProps) => {
  const [isEmailVerificationDialogueOpen, setIsEmailVerificationDialogueOpen] =
    useState(false);
  const [isForgotPasswordDialogueOpen, setIsForgotPasswordDialogueOpen] =
    useState(false);

  const handleCancel = () => {
    setDefaultVerificationMailValid();
    setVerificationMail("");
    setIsEmailVerificationDialogueOpen(false);
  };

  const handleVerificationMailClick = async () => {
    try {
      await handleVerificationMail();
      setIsEmailVerificationDialogueOpen(false);
    } catch (error) {
      handleError(error);
    }
  };
  const handleForgotPasswordClick = async () => {
    try {
      await handleForgotPasswordRequest();
      setIsForgotPasswordDialogueOpen(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleForgotPasswordDialogueOpen = () => {
    setIsForgotPasswordDialogueOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLoginSubmit(e);
  };

  return (
    <div className="flex justify-center w-100p bg-gray-50 h-92p ">
      <div className="flex flex-col items-center justify-center py-10 px-4 w-50p min-w-35p">
        <form
          className="flex flex-col gap-4 bg-white shadow-md rounded-lg p-8 w-full max-w-sm"
          onSubmit={handleFormSubmit}
        >
          <h1 className="text-2xl font-bold text-skyBlue-800 text-center">
            <b>Login</b>
          </h1>
          <InputTextField
            type="text"
            label="Email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorMessage={loginFormValidate.emailWarning}
          />
          <InputTextField
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={loginFormValidate.passwordWarning}
          />
          <button
            type="button"
            className="underline text-skyBlue-800 rounded-lg hover:bg-skyBlue-200 transition duration-200 text-right text-sm"
            disabled={isLoading}
            onClick={handleForgotPasswordDialogueOpen}
            tabIndex={-1}
          >
            {isLoading ? (
              <Loading spinColor="default" spinSize="md" label="" />
            ) : (
              "Forgot Password?"
            )}
          </button>

          <button
            type="submit"
            className="bg-skyBlue-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            autoFocus
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="flex flex-col items-center mt-6">
          <p className="text-gray-500">
            Already have an account?{" "}
            <button
              className="text-skyBlue-800 underline"
              onClick={() => setIsEmailVerificationDialogueOpen(true)}
            >
              Verify Mail Id
            </button>
          </p>
          <h1 id="alternate-login" className="text-gray-500 ">
            <b className="text-gray-700">Login</b> with others
          </h1>
          <p className="text-gray-500">
            Dont have an account?{" "}
            <Link className="text-skyBlue-800 underline" href="/register">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <DialogBox
        {...createDialogBoxProps(
          isEmailVerificationDialogueOpen,
          handleCancel,
          "Email Verification",
          "Enter your email address below to receive a verifiaction link. If you don't see the email in your inbox, please check your spam folder.",
          [
            {
              id: "email",
              label: "Email",
              type: "email",
              placeholder: "Enter your email",
              value: verificationMail,
              onChange: (e) => setVerificationMail(e.target.value),
            },
          ],
          [
            {
              label: "Send Verification Mail",
              type: "green",
              onClick: handleVerificationMailClick,
            },
          ]
        )}
      />
      <DialogBox
        {...createDialogBoxProps(
          isForgotPasswordDialogueOpen,
          () => setIsForgotPasswordDialogueOpen(false),
          "Forgot Password",
          "Enter your email address below to receive a password reset link. If you don't see the email in your inbox, please check your spam folder.",
          [
            {
              id: "forgotPasswordMail",
              label: "Email",
              type: "email",
              placeholder: "Enter your email",
              value: forgotPasswordMail,
              onChange: (e) => setForgotPasswordMail(e.target.value),
            },
          ],
          [
            {
              label: "Send Reset Link",
              type: "blue",
              onClick: handleForgotPasswordClick,
            },
          ]
        )}
      />
      {isLoading && (
        <Loading
          spinColor="primary"
          spinSize="lg"
          label=""
          labelColor="primary"
        />
      )}
    </div>
  );
};

export default LoginForm;
