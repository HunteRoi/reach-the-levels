import React from 'react';
import { AppBar, Toolbar, Container, Button, Typography } from '@mui/material';
import { Insights } from '@mui/icons-material';

import { Link } from '@components';
import type { Page } from '@models';

type Props = {
	pages: Page[];
};

export const Header: React.FC<Props> = ({ pages }) => {
	return (
		<AppBar position='fixed' color='primary'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Link
						variant='h5'
						color='secondary.main'
						href='/'
						sx={{ flexGrow: 1 }}
						underline='none'>
						<Insights />

						<Typography
							variant='h6'
							component='span'
							color='secondary.main'
							sx={{ paddingLeft: 2, flexGrow: 1 }}>
							REACH THE LEVELS
						</Typography>
					</Link>

					{pages.map((page: Page, index) => (
						<Button
							key={index}
							component={Link}
							href={page.href}
							color='secondary'
							startIcon={page.icon}>
							{page.title}
						</Button>
					))}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
