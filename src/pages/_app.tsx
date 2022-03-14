import type { ModelTypesToAliases } from '@glazed/types'
import { Provider as SelfIDProvider } from '@self.id/framework'
import { Provider as JotaiProvider } from 'jotai'
import type { AppProps } from 'next/app'
import { CERAMIC_NETWORK, CERAMIC_URL } from '@/constants/common'
// import publishedModel from '../model-cray.json'
import publishedLocalModel from '../model.json'
import type { ModelTypes } from '../interfaces/cVoxelType'
import 'tailwindcss/tailwind.css'
import { RecoilRoot } from 'recoil'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ThemeProvider } from 'next-themes';

const model: ModelTypesToAliases<ModelTypes> = publishedLocalModel

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },}))

  const { state, ...props } = pageProps

  return (
    <RecoilRoot>
      <Web3ReactProvider getLibrary={getLibrary}>
      <QueryClientProvider client={queryClient}>
       <Hydrate state={pageProps.dehydratedState}>
      <SelfIDProvider
        client={{ ceramic: CERAMIC_URL || "https://ceramic-clay.3boxlabs.com", connectNetwork: CERAMIC_NETWORK, model }}
        state={state}
        ui={{ full: true, style: { display: 'flex' } }}>
        <JotaiProvider>
          <ThemeProvider attribute="class">
            <AuthLayout>
              <BaseLayout>
                <Component {...props} />
              </BaseLayout>
            </AuthLayout>
          </ThemeProvider>
        </JotaiProvider>
      </SelfIDProvider>
      </Hydrate>
     </QueryClientProvider>
     </Web3ReactProvider>
    </RecoilRoot>
  )
}