import React from 'react';
import { Container } from '@mui/material';

import styles from './Layout.module.css';
import { Header } from '../Header';
import { Footer } from '../Footer';
import type { Page } from '..';

type Props = {
	children?: React.ReactNode;
	pages: Page[];
};

export function Layout({ children, pages }: Props) {
	return (
		<div className={styles.container}>
			<Header pages={pages} />

			<Container maxWidth='lg' component='main' className={styles.main}>
				{children}
			</Container>

			<Footer />
		</div>
	);
}
