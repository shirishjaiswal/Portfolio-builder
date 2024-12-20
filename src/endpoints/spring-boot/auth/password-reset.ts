const PASSWORD_RESET = () => {
  return {
    method: "PUT",
    endpoint: "/auth/password-reset",
  };
};

export default PASSWORD_RESET;
