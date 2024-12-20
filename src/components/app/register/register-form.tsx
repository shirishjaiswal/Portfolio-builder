import InputTextField from "@/components/global-components/input-field/input-text-field";
import Loading from "@/components/loading/loading";
import Link from "next/link";
import { FormDataValid } from "@/components/app/register/types";

type RegisterFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
  isDataFormatValid: FormDataValid;
  isLoading: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const RegisterForm: React.FC<RegisterFormProps> = (
  props: RegisterFormProps
) => {
  return (
    <div className="flex justify-center w-full bg-gray-50 h-92p">
      <div className="flex flex-col items-center justify-center py-10 px-4 w-50p ">
        <form
          className="flex flex-col gap-4 bg-white shadow-md rounded-lg p-8 w-full max-w-sm min-w-35p"
          onSubmit={(e) => props.handleSubmit(e)}
        >
          <h1 className="text-2xl font-bold text-skyBlue-800 text-center">
            <b>Register</b>
          </h1>
          <InputTextField
            type="text"
            label="Email"
            placeholder="Enter your Email"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
            isInvalid={props.isDataFormatValid.email}
            errorMessage={
              props.email.length > 0
                ? props.isDataFormatValid.emailWarning
                : "Field cannot be empty"
            }
          />
          <InputTextField
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
            isInvalid={props.isDataFormatValid.password}
            errorMessage={
              props.password.length > 0
                ? props.isDataFormatValid.passwordWarning
                : "Field cannot be empty"
            }
          />
          <InputTextField
            type="password"
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={props.confirmPassword}
            onChange={(e) => props.setConfirmPassword(e.target.value)}
            isInvalid={props.isDataFormatValid.password}
            errorMessage={
              props.password.length > 0
                ? props.isDataFormatValid.confirmPasswordWarning
                : "Field cannot be empty"
            }
          />
          <button
            type="submit"
            className="bg-skyBlue-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            autoFocus
          >
            Login
          </button>
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link className="text-skyBlue-800 font-semibold" href="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          <span className="block animate-fadeIn">
            Your story, your style, your way—
          </span>
          <span className="border-r-4 border-gray-800 animate-typing whitespace-nowrap hidden sm:block">
            start building your portfolio today
          </span>
        </h1>
      </div>
      {props.isLoading && (
        <Loading
          spinColor="primary"
          spinSize="lg"
          label="Signing Up..."
          labelColor="primary"
        />
      )}
    </div>
  );
};

export default RegisterForm;
