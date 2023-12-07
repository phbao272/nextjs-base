import "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: number;
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  }
}
