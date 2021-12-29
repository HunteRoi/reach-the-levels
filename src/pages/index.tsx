import React from 'react';
import type { NextPage } from 'next';
import { Stack, Button, Typography } from '@mui/material';

import { Link, pages } from '@components';

const Home: NextPage = () => {
	return (
		<div style={{ minHeight: 100, width: '100%' }}>
			<Typography variant='h2' align='center' sx={{ py: 1 }}>
				Reach The Levels
			</Typography>

			<Typography variant='h4' align='center' sx={{ py: 1.2 }}>
				A system that motivates anyone to keep working on a project
				until the end!
			</Typography>

			<Typography
				paragraph
				variant='h6'
				align='center'
				sx={{
					width: '60%',
					margin: 'auto',
					fontWeight: 'normal',
					textAlign: 'justify',
					py: 2,
				}}>
				Initialy built to motivate trainees working on topics that might
				not be really interesting (and also because I know what it is to
				work on something boring), I decided to make this project
				open-source and let anyone use it at free will to motivate their
				employees, students or even themselves to start a project and
				finish it.
			</Typography>

			<Typography
				paragraph
				variant='h4'
				align='center'
				sx={{
					width: '60%',
					margin: 'auto',
					py: 0.5,
				}}>
				Let&apos;s get started!
			</Typography>

			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={{ xs: 1, sm: 2, md: 4 }}
				justifyContent='center'
				alignItems='center'
				sx={{ py: 0.5 }}>
				{pages.map((page, index) => (
					<Button
						key={index}
						component={Link}
						href={page.href}
						variant={index === 0 ? 'contained' : 'outlined'}
						startIcon={page.icon}>
						{page.title}
					</Button>
				))}
			</Stack>
		</div>
	);
};

export default Home;
