import React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';

import { Link } from '@components';

export const Header: React.FC = () => {
	return (
		<AppBar position='fixed' color='primary'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Link
						variant='h6'
						color='secondary.main'
						href='/'
						align='center'
						sx={{ flexGrow: 1 }}
						underline='none'>
						<InsightsIcon /> REACH THE LEVELS
					</Link>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
