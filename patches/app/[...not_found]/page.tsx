import type { Metadata } from 'next'
import { getPageMetadata } from '@/util/getPageMetadata'
import { Layout } from '@/components/Layout'
import { NotFoundPageComponent } from '@/components/NotFoundPageComponent'

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    title: '404 - Page Not Found',
    description:
      'This page could not be found. Please go back to the homepage or use the navigation menu to find what you are looking for.',
  })
}

// Required for static export with catch-all routes
export async function generateStaticParams() {
  return []
}

export default async function Page() {
  return (
    <Layout bgColor="#F0DEDE">
      <NotFoundPageComponent />
    </Layout>
  )
}