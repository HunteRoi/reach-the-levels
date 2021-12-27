import { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@styles/globals.css';
import { Layout } from '@components';
import createEmotionCache from '@utils/createEmotionCache';
import theme from '@styles/theme';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
	emotionCache?: EmotionCache;
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({
	Component,
	pageProps,
	emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
	const getLayout =
		Component.getLayout ??
		((page) => (
			<CacheProvider value={emotionCache}>
				<Head>
					<meta
						name='viewport'
						content='initial-scale=1, width=device-width'
					/>
					<link rel='icon' href='/favicon.ico' />

					<title>Reach The Levels</title>
					<meta
						name='description'
						content='Track all projects progress done by interns and motivate them to keep going!'
					/>
				</Head>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />

					<Layout>{page}</Layout>
				</ThemeProvider>
			</CacheProvider>
		));

	return getLayout(<Component {...pageProps} />);
}

export default MyApp;
