import type { NextPage } from 'next';
import { Box, Typography, Button } from '@mui/material';

import { Link } from '../components';

const Home: NextPage = () => {
	return (
		<>
			<Box
				sx={{
					my: 4,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Typography variant='h4' component='h1' gutterBottom>
					Main page
				</Typography>
				<Box maxWidth='sm'>
					<Button
						variant='contained'
						component={Link}
						noLinkStyle
						href='/'>
						Refresh
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default Home;
