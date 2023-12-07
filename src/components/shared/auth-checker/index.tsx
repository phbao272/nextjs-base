import { useSession } from "next-auth/react";
import React from "react";
import { FullScreenLoading } from "../loader";
type Props = {
  children: React.ReactNode;
};

const AuthChecker: React.FC<Props> = ({ children }) => {
  const { status } = useSession();

  if (status === "loading") {
    return <FullScreenLoading />;
  }

  return <>{children}</>;
};

export default AuthChecker;
