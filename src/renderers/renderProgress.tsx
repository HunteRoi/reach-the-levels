// source:https://github.com/mui-org/material-ui-x/blob/e45cf31723303ccc20cf21cccb6ef1e975364bed/packages/grid/x-data-grid-generator/src/renderer/renderProgress.tsx

import React from 'react';
import clsx from 'clsx';
import { GridCellParams } from '@mui/x-data-grid-pro';
import { createTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

const defaultTheme = createTheme();
const useStyles = makeStyles(
	(theme) =>
		createStyles({
			root: {
				border: `1px solid ${theme.palette.divider}`,
				position: 'relative',
				overflow: 'hidden',
				width: '100%',
				height: 26,
				borderRadius: 2,
			},
			value: {
				position: 'absolute',
				lineHeight: '24px',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
			},
			bar: {
				height: '100%',
				'&.low': {
					backgroundColor: '#f44336',
				},
				'&.medium': {
					backgroundColor: '#efbb5aa3',
				},
				'&.high': {
					backgroundColor: '#088208a3',
				},
			},
		}),
	{ defaultTheme }
);

interface ProgressBarProps {
	value: number;
}

const ProgressBar = React.memo(function ProgressBar(props: ProgressBarProps) {
	const { value } = props;
	const valueInPercent = value * 100;
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div
				className={
					classes.value
				}>{`${valueInPercent.toLocaleString()} %`}</div>
			<div
				className={clsx(classes.bar, {
					low: valueInPercent < 30,
					medium: valueInPercent >= 30 && valueInPercent <= 70,
					high: valueInPercent > 70,
				})}
				style={{ maxWidth: `${valueInPercent}%` }}
			/>
		</div>
	);
});

export function renderProgress(params: GridCellParams) {
	return <ProgressBar value={Number(params.value)!} />;
}
