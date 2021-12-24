import * as React from 'react';
import { CircularProgress, Box } from '@mui/material';

export function LoadingComponent() {
	return (
		<Box sx={{ display: 'flex' }}>
			<CircularProgress />
		</Box>
	);
}
