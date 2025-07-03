'use client'

import { Layout } from '@/components/Layout'
import { Color } from '@cowprotocol/ui'

export default function LayoutPage({ children }: { children: React.ReactNode }) {
  return <Layout bgColor={Color.neutral100}>{children}</Layout>
}
