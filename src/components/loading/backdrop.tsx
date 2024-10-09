import React from "react";

const Backdrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-25 z-50 flex items-center justify-center">
      {children}
    </div>
  );
};

export default Backdrop;
