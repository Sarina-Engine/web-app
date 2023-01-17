import Head from "next/head"
import "@/styles/globals.css"
import { MantineProvider, createEmotionCache, Container } from "@mantine/core"
import rtlPlugin from "stylis-plugin-rtl"
import Header from "../Components/Header"
import { css } from "@emotion/css"
import { QueryClient, QueryClientProvider } from "react-query"
import axios from "axios"
import envs from "@/global/envs"

const rtlCache = createEmotionCache({
  key: "mantine-rtl",
  stylisPlugins: [rtlPlugin],
})

const theme = {
  colorScheme: "dark",
  dir: "rtl",
}

const queryClient = new QueryClient()

axios.defaults.baseURL = envs.SERVER_URL

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Sarina</title>
        <meta name="description" content="Sarina Recommender | Recommender for digikala" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme} emotionCache={rtlCache}>
        <div
          className={css`
            height: calc(100% - 56px - 24px);
          `}
        >
          <Component {...pageProps} />
        </div>
      </MantineProvider>
    </QueryClientProvider>
  )
}
