import { Spinner } from "@nextui-org/spinner";
import Backdrop from "./backdrop";

type LoadingProps = {
  spinColor?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  spinSize: "sm" | "md" | "lg";
  label?: string;
  labelColor?:
    | "foreground"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  className?: string;
  isBackdrop?: boolean;
};
const Loading: React.FC<LoadingProps> = ({
  spinColor,
  spinSize,
  label,
  labelColor,
  isBackdrop = true,
  className,
}: LoadingProps) => {
  return (
    <>
      {isBackdrop && (
        <Backdrop>
          <Spinner
            color={spinColor ?? "default"}
            labelColor={labelColor ?? "primary"}
            label={label ?? ""}
            size={spinSize ?? "xl"}
            className={`mx-auto ${className ?? ""}`}
          />
        </Backdrop>
      )}
      {!isBackdrop && (
        <Spinner
          color={spinColor ?? "default"}
          labelColor={labelColor ?? "primary"}
          label={label ?? ""}
          size={spinSize ?? "xl"}
          className={`mx-auto ${className ?? ""}`}
        />
      )}
    </>
  );
};

export default Loading;
