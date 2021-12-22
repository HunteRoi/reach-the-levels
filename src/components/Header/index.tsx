import React from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { NavItem } from '../NavItem';

export type Page = {
	href: string;
	icon: React.ReactNode;
	title: string;
};

type Props = {
	pages: Page[];
};

const Header: React.FC<Props> = ({ pages }) => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position='fixed' color='primary'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
						REACH THE LEVELS
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
						}}>
						<IconButton
							size='large'
							aria-label='menu'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}>
							{pages.map((page) => (
								<NavItem
									{...page}
									key={page.href}
									handleClick={handleCloseNavMenu}
								/>
							))}
						</Menu>
					</Box>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
						}}>
						REACH THE LEVELS
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
						}}>
						{pages.map((page) => (
							<NavItem
								{...page}
								key={page.href}
								handleClick={handleCloseNavMenu}
							/>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;
