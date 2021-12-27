import React from 'react';
import { useRouter } from 'next/router';
import { Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function GoBackComponent() {
	const router = useRouter();

	return (
		<Fab
			variant='extended'
			onClick={() => router.back()}
			aria-label='navigate back'
			sx={{ position: 'fixed', bottom: 66, right: 116 }}>
			<ArrowBackIcon />
			Back
		</Fab>
	);
}
