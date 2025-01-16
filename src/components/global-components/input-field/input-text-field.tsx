import { debounce, get } from "lodash";
import { EyeOff, Eye, CircleCheck, BadgeCheck, BadgeMinus } from "lucide-react";
import { useState, useEffect } from "react";

export type InputTextFieldProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    readOnly?: boolean;
    requireVerify?: boolean;
    verified?: boolean;
    description?: string;
    containerClassName?: string;
    inputClassName?: string;
    labelClassName?: string;
    errorMessage?: string;
  };

const InputTextField: React.FC<InputTextFieldProps> = ({
  type = "text" as "text" | "email" | "password" | "textarea" | "url",
  label,
  readOnly,
  requireVerify,
  verified,
  required = false,
  placeholder = "",
  description,
  value,
  onChange,
  onBlur,
  containerClassName = "",
  inputClassName = "",
  labelClassName = "",
  disabled = false,
  errorMessage,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const debouncedOnChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      onChange?.({
        ...e,
        target: {
          ...e.target,
          value: inputValue,
          minLength: inputValue.length,
          validationMessage: getError(inputValue) ?? "",
          validity: {
            ...e.target.validity,
            valueMissing: !inputValue,
            customError: getError(inputValue) !== undefined,
          },
        },
      });
    },
    300
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    e.bubbles = false && setInputValue(e.target.value);
    debouncedOnChange(e);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.persist();
    e.bubbles = false && setInputValue(e.target.value);
    onBlur?.(e);
  };

  const getError = (value: string) => {
    if (required && value.trim() === "") {
      return "(Field cannot be empty)";
    } else if (rest.min && value.length < +rest.min) {
      return `(min ${rest.min} characters)`;
    } else if (rest.max && value.length > +rest.max) {
      return `(max ${rest.max} characters)`;
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      <div>
        {label && (
          <label
            className={`text-sm font-medium 
               text-zinc-900
             ${labelClassName}`}
          >
            {label} {required && <span className="text-red-500">* </span>}
            {
              <span className="text-sm text-red-700">
                {errorMessage || getError(inputValue?.toString())
                  ? `(${
                      errorMessage ?? getError(inputValue?.toString()) ?? ""
                    })`
                  : ""}
              </span>
            }
          </label>
        )}

        <p
          id="input-description"
          className="font-light text-xs h-2 text-gray-400"
        >
          {description}
        </p>
      </div>

      <div className="relative">
        <input
          className={`w-full px-4 pr-6 py-2 border rounded-md text-sm transition-all duration-300 focus:outline-none focus:ring-2 
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"} 
          hover:shadow-sm ${inputClassName}`}
          type={type === "password" && isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          defaultValue={inputValue}
          onChange={handleChange}
          disabled={disabled}
          onBlur={handleOnBlur}
          readOnly={readOnly}
          {...rest}
        />

        {type === "password" && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            type="button"
            onClick={() => setPasswordVisible(!isPasswordVisible)}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </button>
        )}
        {requireVerify &&
          (verified ? (
            <BadgeCheck
              size={18}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500"
            />
          ) : (
            <BadgeMinus
              size={18}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500"
            />
          ))}
      </div>
    </div>
  );
};

export default InputTextField;
