import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { RecoilRoot } from "recoil";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BaseLayout } from "@/components/layout/BaseLayout";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import Router from "next/router";
import type { DehydratedState } from '@tanstack/react-query';
import dynamic from "next/dynamic";
import "@orbisclub/modules/dist/index.modern.css";
import "@/styles/orbis.css"

const OrbisChatWrapper = dynamic(
  () => import("@/components/orbis/OrbisChatWrapper"),
  {
    ssr: false,
  }
);

const LoadingModal = dynamic(
  () => import("@/components/common/LoadingModal"),
  {
    ssr: false,
  }
);

export default function App({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const { ...props } = pageProps;
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider attribute="class" defaultTheme={"light"}>
            <BaseLayout>
                <Component {...props} />
            </BaseLayout>
            <OrbisChatWrapper />
            {isLoading && <LoadingModal />}
          </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
    </RecoilRoot>
  );
}
