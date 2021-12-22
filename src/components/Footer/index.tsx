import React from 'react';
import { Typography } from '@mui/material';
import MuiLink from '@mui/material/Link';

export default function Footer() {
	return (
		<footer>
			<Typography
				variant='body2'
				color='GrayText'
				align='center'
				paragraph={true}>
				Made with ♥ by{' '}
				<MuiLink
					color='inherit'
					href='https://github.com/hunteroi'
					target='_blank'
					rel='noopener'>
					Tinaël DEVRESSE
				</MuiLink>{' '}
				| {new Date().getFullYear()}
			</Typography>
		</footer>
	);
}
