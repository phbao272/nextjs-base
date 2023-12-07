import { CustomNextPage } from "@/libs/types/next-page";
import { SEO } from "@/libs/utils/contants";
import { Button, Stack } from "@mantine/core";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";

const Custom404: CustomNextPage = () => {
  const router = useRouter();

  return (
    <>
      <DefaultSeo {...SEO} title="404" />
      <Stack>
      <h1>404 - Page Not Found</h1>
      <Button onClick={() => router.replace("/users")} sx={{
        width: "fit-content",
      }}>Back to Home</Button>
    </Stack>
    </>
    
  );
};

export default Custom404;

Custom404.title = "404 - Page Not Found";
