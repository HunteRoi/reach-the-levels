import React from 'react';
import { Container } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import styles from './Layout.module.css';
import { Header } from '../Header';
import { Footer } from '../Footer';

type Props = {
	children?: React.ReactNode;
};

export function Layout({ children }: Props) {
	return (
		<SnackbarProvider maxSnack={3}>
			<div className={styles.container}>
				<Header />

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
