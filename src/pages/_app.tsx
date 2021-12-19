import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/globals.css';
import Layout from '../components/Layout';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout =
		Component.getLayout ??
		((page) => (
			<Layout>
				<Head>
					<link rel='icon' href='/favicon.ico' />
				</Head>

				{page}
			</Layout>
		));

	return getLayout(<Component {...pageProps} />);
}

export default MyApp;
