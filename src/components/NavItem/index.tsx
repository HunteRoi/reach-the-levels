import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, MenuItem, SxProps, Theme } from '@mui/material';

type Props = {
	href: string;
	icon: React.ReactNode;
	title: string;
	handleClick: () => void;
};

export const NavItem: React.FC<Props> = ({
	href,
	icon,
	title,
	handleClick,
	...others
}) => {
	const router = useRouter();
	const active = href ? router.pathname === href : false;
	const buttonSx = {
		borderRadius: 1,
		color: 'secondary.main',
		fontWeight: active && 'fontWeightBold',
		textTransform: 'uppercase',
		'& .MuiButton-startIcon': {
			color: 'secondary.main',
		},
	} as SxProps<Theme>;

	return (
		<MenuItem
			disableGutters
			sx={{
				display: 'flex',
				mb: 0.5,
				py: 0,
				px: 2,
				mx: 1,
				backgroundColor: active ? 'rgba(0, 0, 0, 0.08);' : '',
				borderRadius: 1,
			}}
			{...others}>
			<NextLink href={href} passHref>
				<Button
					component='a'
					startIcon={icon}
					disableRipple
					sx={buttonSx}
					onClick={handleClick}>
					<Box sx={{ flexGrow: 1 }}>{title}</Box>
				</Button>
			</NextLink>
		</MenuItem>
	);
};
