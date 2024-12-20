const FORGOT_PASSWORD = () => {
  return {
    method: "POST",
    endpoint: "/auth/forgot-password",
  };
};

export default FORGOT_PASSWORD;
