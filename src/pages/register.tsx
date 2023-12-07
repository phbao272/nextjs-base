import { Register } from "@/components/features/auth";
import { PublicLayout } from "@/components/shared/layouts";
import { CustomNextPage } from "@/libs/types/next-page";
import { SEO } from "@/libs/utils/contants";
import { DefaultSeo } from "next-seo";
import { ReactElement } from "react";

const Page: CustomNextPage = () => {
  return (
    <>
      <DefaultSeo {...SEO} title="Register" />
      <Register />
    </>
  );
};

export default Page;

Page.title = "Register";

Page.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
