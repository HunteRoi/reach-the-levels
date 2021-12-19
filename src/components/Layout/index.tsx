import React from 'react';

import styles from './Layout.module.css';
import Header from '../Header';
import Footer from '../Footer';

type Props = {
	children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<div className={styles.container}>
			<Header />
			<main className={styles.main}>{children}</main>
			<Footer />
		</div>
	);
}
