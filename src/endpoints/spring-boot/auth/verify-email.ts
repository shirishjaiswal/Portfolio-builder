const VERIFY_EMAIL = (email: string, token: string) => {
  return {
    server: "external",
    method: "GET",
    endpoint: `/auth/${email}/verify?token=${token}`,
  };
};

export default VERIFY_EMAIL;