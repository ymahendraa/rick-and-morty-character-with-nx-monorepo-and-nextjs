'use client'

import React, { Suspense } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { RecoilEnv, RecoilRoot } from 'recoil'
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

function Provider({ children }: { children: React.ReactNode }) {
    RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <Suspense fallback={'loading...'}>{children}</Suspense>
            </RecoilRoot>
        </QueryClientProvider>
    )
}

export default Provider