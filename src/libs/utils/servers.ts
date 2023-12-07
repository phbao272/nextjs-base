import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function serverSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function redirectIfAuthenticated() {
  const session = await serverSession();

  if (session) {
    redirect("/users");
  }
}

export async function getUser() {
  const session = await serverSession();
  return session?.user;
}
