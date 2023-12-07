import { Login } from "@/components/features/auth";
import { PublicLayout } from "@/components/shared/layouts";
import { CustomNextPage } from "@/libs/types/next-page";
import { getServerSession } from "next-auth/next";
import { ReactElement } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { DefaultSeo } from "next-seo";
import { SEO } from "@/libs/utils/contants";

const Page: CustomNextPage = () => {
  return (
    <>
      <DefaultSeo {...SEO} title="Login" />
      <Login />;
    </>
  )
    
};

export default Page;

Page.title = "Login";

Page.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/users",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
