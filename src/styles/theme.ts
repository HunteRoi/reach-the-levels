import { createTheme } from '@mui/material/styles';
import { enUS } from '@mui/material/locale';
import { red } from '@mui/material/colors';
import type {} from '@mui/lab/themeAugmentation';

const primaryColor = '#ffd616';

// Create a theme instance.
const theme = createTheme(
	{
		palette: {
			primary: {
				main: primaryColor,
			},
			secondary: {
				main: '#080808',
			},
			error: {
				main: red.A400,
			},
		},
		components: {
			MuiCheckbox: {
				styleOverrides: {
					root: {
						color: primaryColor,
					},
				},
			},
		},
	},
	enUS
);

export default theme;
