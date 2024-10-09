import { Tooltip } from "@nextui-org/tooltip";
import React from "react";
import Button from "./button";

type ToolTipProps = {
  closeDelay: number;
  content: React.ReactNode;
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  label?: string;
};

const ToolTipComponent: React.FC<ToolTipProps> = ({
  closeDelay,
  content,
  isActive,
  isDisabled,
  onClick,
  children,
  label,
}: ToolTipProps) => {
  return (
    <Tooltip color="warning" closeDelay={closeDelay} content={content}>
      {children ? (
        <Button
          type="button"
          onClick={onClick}
          isActive={isActive}
          isDisabled={isDisabled}
        >
          {children}
        </Button>
      ) : (
        <Button
          type="button"
          label={label}
          onClick={onClick}
          isActive={isActive}
          isDisabled={isDisabled}
        />
      )}
    </Tooltip>
  );
};

export default ToolTipComponent;
