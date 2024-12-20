import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import Button from "./button";
type ModalPopupProps = {
  warningTitle: React.ReactNode;
  warning: React.ReactNode;
  buttonOnAction?: {
    label: string;
    onClick: () => void;
    isActive: boolean;
    isDisabled: boolean;
  }[];
  onConfirm: () => void;
  isActive: boolean;
  label?: string;
  className?: string;
  children?: React.ReactNode;
};
const ModalPopup: React.FC<ModalPopupProps> = ({
  className,
  warningTitle,
  warning,
  buttonOnAction,
  onConfirm,
  isActive,
  label,
  children,
}: ModalPopupProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick = (onClose: () => void) => {
    onConfirm();
    onClose();
  };

  const handleCustomButtons = (
    onClose: () => void,
    buttonData: {
      label: string;
      onClick: () => void;
      isActive: boolean;
      isDisabled: boolean;
    }
  ) => {
    buttonData.onClick();
    onClose();
  };
  return (
    <>
      {!children && (
        <Button
          className={className}
          type="button"
          onClick={onOpen}
          isActive={isActive}
          isDisabled={false}
        >
          {label}
        </Button>
      )}
      {children && (
        <Button
          className={className}
          type="button"
          onClick={onOpen}
          isActive={isActive}
          isDisabled={false}
        >
          {children}
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {warningTitle}
              </ModalHeader>
              <ModalBody>
                <div>{warning}</div>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  onClick={onClose}
                  label="Close"
                  isActive={false}
                  isDisabled={false}
                />
                <Button
                  type="button"
                  onClick={handleClick.bind(this, onClose)}
                  label="Confirm"
                  isActive={false}
                  isDisabled={false}
                />
                {buttonOnAction &&
                  buttonOnAction.length > 0 &&
                  buttonOnAction.map((buttonData, index) => (
                    <Button
                      key={buttonData.label + index}
                      type="button"
                      label={buttonData.label}
                      onClick={handleCustomButtons.bind(
                        this,
                        onClose,
                        buttonData
                      )}
                      isActive={false}
                      isDisabled={false}
                    />
                  ))}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPopup;
