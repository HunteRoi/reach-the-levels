import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: '#ffd616',
		},
		secondary: {
			main: '#080808',
		},
		error: {
			main: red.A400,
		},
	},
});

export default theme;
