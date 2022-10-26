import type { ModelTypesToAliases } from "@glazed/types";
import type { AppProps } from "next/app";
import { dataModel } from "@/lib/ceramic/dataModel";
import type { ModelTypes } from "../interfaces";
import "tailwindcss/tailwind.css";
import { RecoilRoot } from "recoil";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { BaseLayout } from "@/components/layout/BaseLayout";
import { Web3Provider } from "@ethersproject/providers";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import Router from "next/router";
import { LoadingModal } from "@/components/common/LoadingModal";
import { DIDContextProvider } from "@/context/DIDContext";
import type { DehydratedState } from 'react-query';

const aliases: ModelTypesToAliases<ModelTypes> = dataModel;

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
                  <DIDContextProvider >
                    <BaseLayout>
                      <Component {...props} />
                    </BaseLayout>
                  </DIDContextProvider>
                  {isLoading && <LoadingModal />}
                </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
    </RecoilRoot>
  );
}
