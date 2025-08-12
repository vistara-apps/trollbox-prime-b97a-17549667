'use client'

import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
import { base } from 'viem/chains'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: 'dark',
          theme: 'base',
          name: 'Trollbox Prime',
          logo: '/logo.png',
        },
      }}
    >
      {children}
    </MiniKitProvider>
  )
}
