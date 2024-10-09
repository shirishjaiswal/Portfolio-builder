"use client";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  isDisabled: boolean;
  isActive: boolean;
  className?: string;
  onClick?: () => void;
  label?: string;
  style?: "primary" | "secondary";
  additionalButtonStyles?: string;
  additionalLabelStyles?: string;
  children?: React.ReactNode;
};

const styles = {
  button:
    "flex w-max p-4 text-sm rounded font-semibold text-center justify-center items-center font-myriad leading-none;",
  primary: {
    style: "text-white border-none bg-primary-600 leading-4",
    focus: "focus:ring-2 focus:ring-primary-300 focus:outline-none",
    active: "active:bg-primary-500",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
  },
  secondary: {
    style: "text-primary-600 border border-primary-600 bg-white leading-4",
    focus: "focus:ring-2 focus:ring-primary-300 focus:outline-none",
    active: "active:bg-primary-500",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
  },
};

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  label,
  style = "primary",
  isActive = false,
  isDisabled = false,
  additionalButtonStyles = "",
  additionalLabelStyles = "",
  className,
  children,
}) => {
  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  const buttonStyle = `${styles.button} ${styles[style]?.style} ${
    isDisabled ? styles[style]?.disabled : ""
  } ${additionalButtonStyles} ${isActive ? styles[style]?.active : ""}`;
  const labelStyle = `${styles[style]?.style} ${additionalLabelStyles}`;

  return !children ? (
    <button
      className={`${buttonStyle} ${className}`}
      onClick={handleClick}
      type={type}
      disabled={isDisabled}
    >
      {<span className={labelStyle}>{label}</span>}
    </button>
  ) : (
    <button className={`${className}`} onClick={handleClick}>{children}</button>
  );
};

export default Button;
