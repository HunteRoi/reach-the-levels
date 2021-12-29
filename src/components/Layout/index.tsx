import React from 'react';
import { Container } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import styles from './Layout.module.css';
import { Header } from '../Header';
import { Footer } from '../Footer';
import type { Page } from '@models';

type Props = {
	children?: React.ReactNode;
	pages: Page[];
};

export function Layout({ children, pages }: Props) {
	return (
		<SnackbarProvider maxSnack={3}>
			<div className={styles.container}>
				<Header pages={pages} />

				<Container
					maxWidth='lg'
					component='main'
					className={styles.main}>
					{children}
				</Container>

				<Footer />
			</div>
		</SnackbarProvider>
	);
}
