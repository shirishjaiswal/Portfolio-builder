
const GET_USER_BY_EMAIL = (email : string) => {
  return {
    method: "GET",
    endpoint: `/user/get/${email}`,
  };
};

export default GET_USER_BY_EMAIL;