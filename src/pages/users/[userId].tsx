import { UserDetail } from "@/components/features/users";
import { CustomNextPage } from "@/libs/types/next-page";
import { useRouter } from "next/router";

const UserDetailPage: CustomNextPage = () => {
  const router = useRouter();

  return (
    <>
      <UserDetail userId={Number(router.query.userId)} />
    </>
  );
};

export default UserDetailPage;

UserDetailPage.title = "User Detail";
