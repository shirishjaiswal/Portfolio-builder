import {
  UserInfoField_OP,
  UserInfoParent_OP,
} from "@/components/app/user/profile-configuration/type";
import {  GENERATIVE_AI_PAYLOAD, HistoryItem } from "@/endpoints/next/ai/generative-ai";
import { POST_USER_INFO_FIELD_TYPE } from "@/endpoints/spring-boot/admin/post-user-info-field";
import { POST_USER_INFO_PARENT_TYPE } from "@/endpoints/spring-boot/admin/post-user-info-parent";
import { LOGIN_PAYLOAD_TYPE } from "@/endpoints/spring-boot/auth/login";
import { REGISTER_USER_PAYLOAD_TYPE } from "@/endpoints/spring-boot/auth/register-user";

class Payload {
  static login(email: string, password: string): LOGIN_PAYLOAD_TYPE {
    return {
      username: email,
      password: password,
    };
  }

  static register(
    email: string,
    password: string,
    confirmPassword: string
  ): REGISTER_USER_PAYLOAD_TYPE {
    return {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
  }

  static postUserInfoParent(
    userInfoParent: UserInfoParent_OP,
    userInfoGroupId: number
  ): POST_USER_INFO_PARENT_TYPE {
    return {
      userInfoGroup: {
        id: userInfoGroupId,
      },
      ...userInfoParent,
    };
  }

  static postUserInfoField(
    userInfoField: UserInfoField_OP,
    userInfoParentId: number
  ): POST_USER_INFO_FIELD_TYPE {
    return {
      userInfoParent: {
        id: userInfoParentId,
      },
      ...userInfoField,
    };
  }

  static parsePDF(file: File): FormData {
    const formData = new FormData();
    formData.append("filepond", file);
    return formData;
  }

  static generativeAi(input: string, history : HistoryItem[], responseType : "text/plain" | "application/json") :GENERATIVE_AI_PAYLOAD {
    return {
      inputText: input,
      history: history,
      responseType: responseType
    }
  }
}

export default Payload;
