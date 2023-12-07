import "@/styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";

import AuthChecker from "@/components/shared/auth-checker";
import { AuthLayout } from "@/components/shared/layouts";
import { CustomNextPage } from "@/libs/types/next-page";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";

type CustomAppProps = AppProps & {
  Component: CustomNextPage;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 5,
            // refetchOnMount: false,
            // refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [hydated, seHydrated] = useState(false);

  useEffect(() => {
    seHydrated(true);
  }, []);

  const getLayout =
    Component.getLayout || ((page) => <AuthLayout>{page}</AuthLayout>);

  return (
    <>
      <Head>
        <title>Next JS</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS>
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={pageProps.dehydratedState}>
              <Notifications
                position="top-right"
                zIndex={2077}
                autoClose={4000}
              />
              <AuthChecker>
                {hydated && getLayout(<Component {...pageProps} />)}
              </AuthChecker>
            </HydrationBoundary>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SessionProvider>
      </MantineProvider>
    </>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case "TTFB":
      console.info(`Thời gian phản hồi: ${(metric.value / 1000).toFixed(2)}s`);
      break;
    case "FCP":
      console.info(
        `Thời gian hiển thị nội dung đầu tiên: ${(metric.value / 1000).toFixed(
          2
        )}s`
      );
      break;
  }
}
