// source:https://github.com/mui-org/material-ui-x/blob/e45cf31723303ccc20cf21cccb6ef1e975364bed/packages/grid/x-data-grid-generator/src/renderer/renderProgress.tsx

import React from 'react';
import { GridCellParams } from '@mui/x-data-grid-pro';

interface ProgressBarProps {
	wonPoints: number;
	totalPoints: number;
}

const PointsTotal = React.memo(function PointsTotal(props: ProgressBarProps) {
	const { wonPoints, totalPoints } = props;

	return (
		<div>
			{wonPoints} / {totalPoints} ☆
		</div>
	);
});

export function renderPoints(params: GridCellParams) {
	return (
		<PointsTotal
			wonPoints={Number(params.value)!}
			totalPoints={params.row.totalPoints}
		/>
	);
}
