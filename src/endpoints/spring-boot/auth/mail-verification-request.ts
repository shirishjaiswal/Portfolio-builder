const MAIL_VERIFICATION_REQUEST = (email: string) => {
  return {
    server: "external",
    method: "PUT",
    endpoint: `auth/verify-email?email=${email}`,
  };
};

export default MAIL_VERIFICATION_REQUEST;