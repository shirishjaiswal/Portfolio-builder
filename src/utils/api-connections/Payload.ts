import { LOGIN_PAYLOAD_TYPE } from "@/endpoints/spring-boot/auth/login";
import { REFRESH_TOKEN_PAYLOAD_TYPE } from "@/endpoints/spring-boot/auth/refresh-token";
import { REGISTER_USER_PAYLOAD_TYPE } from "@/endpoints/spring-boot/auth/register-user";

class Payload {
  static login(email: string, password: string) : LOGIN_PAYLOAD_TYPE {
    return {
      username : email,
      password : password
    }
  }

  static register(email: string, password: string, confirmPassword: string) : REGISTER_USER_PAYLOAD_TYPE {
    return {
      email : email,
      password : password,
      confirmPassword : confirmPassword
    }
  }

  static refreshToken(refreshToken: string) : REFRESH_TOKEN_PAYLOAD_TYPE {
    return {
      "refreshToken" : refreshToken
    };
  }
}

export default Payload;