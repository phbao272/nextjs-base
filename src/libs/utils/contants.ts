import { DefaultSeoProps } from 'next-seo';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const USER_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  DELETED: "DELETED",
};


export const SEO: DefaultSeoProps = {
  title: 'Nextjs Core Project',
  description: 'Nextjs Core Project by baopq',
  titleTemplate: '%s | Nextjs Core Project',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: 'http://localhost:3000/',
    siteName: 'Nextjs Core Project',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};