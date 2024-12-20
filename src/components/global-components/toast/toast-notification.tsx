import { Toaster } from "sonner";

function ToastNotification() {
  return (
    <div className="toaster-wrapper text-base">
      <Toaster
        position="top-center"
        richColors
        theme="light"
        closeButton
        duration={3000}
      />
    </div>
  );
}
export default ToastNotification;
