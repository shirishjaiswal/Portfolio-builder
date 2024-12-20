import DialogBox from "@/components/global-components/dialogue-box/dialogue-box";
import InputTextField from "@/components/global-components/input-field/input-text-field";
import Loading from "@/components/loading/loading";
import Link from "next/link";
import { useState } from "react";
import {
  LoginFormValidate,
  MailVerificationFormValidate,
} from "@/components/app/login/type";

type LoginFormProps = {
  email: string;
  password: string;
  loginFormValidate: LoginFormValidate;
  mailVerificationFormValidate: MailVerificationFormValidate;
  verificationMail: string;
  isLoading: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setVerificationMail: (verificationMail: string) => void;
  setDefaultVerificationMailValid: () => void;
  handleVerificationMail: () => void;
};

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    props.setDefaultVerificationMailValid();
    props.setVerificationMail("");
    setIsOpen(false);
  };

  const handleVerificationMailClick = async () => {
    await props.handleVerificationMail();
    setIsOpen(false);
  }

  return (
    <div className="flex justify-center w-100p bg-gray-50 h-92p ">
      <div className="flex flex-col items-center justify-center py-10 px-4 w-50p min-w-35p">
        <form
          className="flex flex-col gap-4 bg-white shadow-md rounded-lg p-8 w-full max-w-sm"
          onSubmit={(e) => props.handleLoginSubmit(e)}
        >
          <h1 className="text-2xl font-bold text-skyBlue-800 text-center">
            <b>Login</b>
          </h1>
          <InputTextField
            type="text"
            label="Email"
            placeholder="Enter your Email"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
            isInvalid={props.loginFormValidate.email}
            errorMessage={props.loginFormValidate.emailWarning}
          />
          <InputTextField
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
            isInvalid={props.loginFormValidate.password}
            errorMessage={props.loginFormValidate.passwordWarning}
          />
          <button
            type="submit"
            className="bg-skyBlue-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            autoFocus
          >
            Login
          </button>
        </form>
        <div className="flex flex-col items-center mt-6">
          <p className="text-gray-500">
            Already have an account?{" "}
            <button
              className="text-skyBlue-800 font-semibold underline"
              onClick={() => setIsOpen(true)}
            >
              Verify Mail Id
            </button>
          </p>
          <h1 id="alternate-login" className="text-gray-500 ">
            <b className="text-gray-700">Login</b> with others
          </h1>
          <p className="text-gray-500">
            Dont have an account?{" "}
            <Link
              className="text-skyBlue-800 font-semibold underline"
              href="/register"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <DialogBox
        isOpen={isOpen}
        onClose={handleCancel}
        title="Email Verification"
        inputFields={[
          {
            id: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your email",
            value: props.verificationMail,
            onChange: (e) => props.setVerificationMail(e.target.value),
            warning: props.mailVerificationFormValidate.verificationMailWarning,
            isInvalid: !props.mailVerificationFormValidate.verificationMail,
          },
        ]}
        buttons={[
          {
            label: "Send Verification Mail",
            type: "green",
            onClick: handleVerificationMailClick,
          },
        ]}
      />
      {props.isLoading && (
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
