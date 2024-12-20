import { EyeOff } from "lucide-react";

type InputTextFieldProps = {
  type: "text" | "email" | "password";
  label: string;
  required?: boolean;
  placeholder: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  additionalInputStyles?: string;
  additionalLabelStyles?: string;
  additionalContainerStyles?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
};

const InputTextField: React.FC<InputTextFieldProps> = ({
  type,
  label,
  required,
  placeholder,
  value,
  onChange,
  additionalInputStyles,
  additionalLabelStyles,
  additionalContainerStyles,
  isDisabled,
  isInvalid,
  errorMessage,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${additionalContainerStyles}`}>
      <label
        className={`text-gray-700 text-sm font-medium transition-all ${
          isInvalid ? "text-red-500" : "text-gray-700"
        } ${additionalLabelStyles}`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          className={`w-full px-4 py-2 border rounded-md text-sm transition-all duration-300 focus:outline-none focus:ring-2 font-thin	
        ${
          isInvalid
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
        } 
        ${isDisabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
        hover:shadow-sm ${additionalInputStyles}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e)}
          disabled={isDisabled}
          defaultValue={value}
        />
        {type === "password" && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              const input = e.currentTarget
                .previousElementSibling as HTMLInputElement;
              input.type = input.type === "password" ? "text" : "password";
            }}
          >
            {type === "password" && (
              <EyeOff className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
      {isInvalid && <p className="text-sm text-red-500 mt-1">{errorMessage}</p>}
    </div>
  );
};

export default InputTextField;
