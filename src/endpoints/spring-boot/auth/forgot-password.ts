const FORGOT_PASSWORD = (email : string) => {
  return {
    method: "GET",
    endpoint: `/auth/forgot-password?email=${email}`,
  };
};

export default FORGOT_PASSWORD;
