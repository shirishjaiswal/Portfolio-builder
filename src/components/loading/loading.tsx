import { Spinner } from "@nextui-org/spinner";
import Backdrop from "./backdrop";

type LoadingProps = {
  spinColor:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  spinSize: "sm" | "md" | "lg";
  label: string;
  labelColor:
    | "foreground"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
};
const Loading: React.FC<LoadingProps> = ({
  spinColor,
  spinSize,
  label,
  labelColor,
}: LoadingProps) => {
  return (
    <Backdrop>
      <div className="flex gap-4">
        <Spinner
          color={spinColor ?? "default"}
          labelColor={labelColor ?? "primary"}
          label={label ?? "Loading"}
          size={spinSize ?? "lg"}
          className="mx-auto w-24 h-24"
        />
      </div>
    </Backdrop>
  );
};

export default Loading;
