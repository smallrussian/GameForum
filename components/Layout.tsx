import Head from 'next/head'
import { useRouter } from 'next/router'

import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const router = useRouter()
  const meta = {
    title: 'Game Forum',
    description: 'By smallrussian AKA Julian Shniter.',
    cardImage: '/og.png',
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <link href="/logo.png" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://doinit.today${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.cardImage} />
      </Head>
      <main id="skip">{children}</main>
    </>
  )
}

export default Layout
