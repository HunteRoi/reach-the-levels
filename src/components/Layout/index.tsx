import React from 'react';
import { Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

import styles from './Layout.module.css';
import Header from '../Header';
import Footer from '../Footer';

type Props = {
	children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<div className={styles.container}>
			<Header
				pages={[
					{ href: '/', icon: <HomeIcon />, title: 'Home' },
					{
						href: '/stats',
						icon: <QueryStatsIcon />,
						title: 'Statistics',
					},
				]}
			/>

			<Container maxWidth='lg' component='main' className={styles.main}>
				{children}
			</Container>

			<Footer />
		</div>
	);
}
