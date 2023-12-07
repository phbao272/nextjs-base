import { IUserToken } from "@/libs/types/user";
import { API_URL } from "@/libs/utils/contants";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await handleRefreshToken(session?.user.refreshToken as string);

    if (session) session.user.accessToken = res.accessToken;
    else signIn();
  };
  return refreshToken;
};

const handleRefreshToken = async (refreshToken: string) => {
  try {

    const res = await axios.get<IUserToken>(`${API_URL}/admin/auth/refresh`, {
      headers: {
        Authorization: "Bearer " + refreshToken,
      },
    });

    return res.data;
  } catch (error) {
    throw Error("refetching token failed.");
  }
};
