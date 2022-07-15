import React from 'react'
import Head from 'next/head'
import { QueryClientProvider, QueryClient } from 'react-query'
import { NhostNextProvider } from '@nhost/nextjs'

import 'styles/main.css'
import 'styles/variables.css'
import 'styles/main.css'
import 'styles/header.css'
import 'styles/credit.css'
import 'styles/parallax.css'
import 'styles/overlay.css'
import 'styles/section-intro.css'
import 'styles/section-slow-down.css'
import 'styles/section-focus.css'
import 'styles/section-adds-up.css'
import 'styles/section-the-office.css'
import 'styles/section-space-mountain.css'
import 'styles/section-walking.css'
import 'styles/section-get-more-rest.css'
import 'styles/section-backburner.css'
import 'styles/section-play.css'
import 'styles/section-big-swings.css'
import 'styles/section-cta.css'
import 'styles/custom-page.css'
import 'styles/error-page.css'
import 'styles/admin.css'
import { nhost } from 'utils/nhost'
import { Hydrate } from 'react-query'

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Netlify" />
        <title>Matterday: What could you do with an extra day a week? | Netlify</title>
        <meta
          name="description"
          content="Imagine all the ways you could spend an extra day per week on what matters to you! Netlify saves development teams one work day per week. How would you spend that time?"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta content="@netlify" name="twitter:site" />
        <meta content="@netlify" name="twitter:creator" />
        <meta content="Matterday" name="twitter:title" property="og:title" />
        <meta
          content="What could you do with an extra day a week? Join the Netlify community in celebrating what matters."
          name="twitter:description"
          property="og:description"
        />
      </Head>
      <NhostNextProvider nhost={nhost}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </NhostNextProvider>
    </>
  )
}

export default MyApp
