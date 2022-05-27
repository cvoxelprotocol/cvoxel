import type { ModelTypesToAliases } from "@glazed/types";
import { Provider as SelfIDProvider } from "@self.id/framework";
import { Provider as JotaiProvider } from "jotai";
import type { AppProps } from "next/app";
import { CERAMIC_NETWORK, CERAMIC_URL } from "@/constants/common";
import { cVoxelModel } from "@/lib/ceramic/dataModel";
import type { ModelTypes } from "../interfaces/cVoxelType";
import "tailwindcss/tailwind.css";
import { RecoilRoot } from "recoil";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { BaseLayout } from "@/components/layout/BaseLayout";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import Router from "next/router";
import { LoadingModal } from "@/components/common/LoadingModal";

const model: ModelTypesToAliases<ModelTypes> = cVoxelModel;

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function App({ Component, pageProps }: AppProps) {
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

  const { state, ...props } = pageProps;
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
      <Web3ReactProvider getLibrary={getLibrary}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <SelfIDProvider
              client={{
                ceramic: CERAMIC_URL,
                connectNetwork: CERAMIC_NETWORK,
                model,
              }}
              state={state}
              ui={{ full: true, style: { display: "flex" } }}
            >
              <JotaiProvider>
                <ThemeProvider attribute="class" defaultTheme={"light"}>
                  <BaseLayout>
                    <Component {...props} />
                  </BaseLayout>
                  {isLoading && <LoadingModal />}
                </ThemeProvider>
              </JotaiProvider>
            </SelfIDProvider>
          </Hydrate>
        </QueryClientProvider>
      </Web3ReactProvider>
    </RecoilRoot>
  );
}
