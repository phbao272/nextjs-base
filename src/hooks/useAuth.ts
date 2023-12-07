import { signIn, signOut } from "next-auth/react";

import { IUserLoginArgs } from "@/libs/types/user";
import { useRouter } from "next/router";

export const useAuth = () => {
  const router = useRouter();

  const login = async (args: IUserLoginArgs) => {
    await signIn("credentials", {
      email: args.email,
      password: args.password,
      redirect: false,
    });
  };

  const logout = async () => {
    await signOut({ redirect: false });
    // await request.post("auth/logout");

    router.push("/login");
  };

  return {
    login,
    logout,
  };
};
