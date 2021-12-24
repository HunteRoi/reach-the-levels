import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function GoBackComponent() {
	const router = useRouter();

	return (
		<Button onClick={() => router.back()} startIcon={<ArrowBackIcon />}>
			Back
		</Button>
	);
}
