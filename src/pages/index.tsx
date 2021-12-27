import React from 'react';
import type { NextPage } from 'next';
import useSWR, { Fetcher } from 'swr';
import axios from 'axios';
import { IconButton, Typography } from '@mui/material';
import {
	DataGrid,
	GridEnrichedColDef,
	GridValueFormatterParams,
} from '@mui/x-data-grid';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { renderProgress } from '@renderers';
import {
	ErrorComponent,
	Link,
	LoadingComponent,
	NoRowsOverlay,
} from '@components';
import { Project, ErrorResponse } from '@models';

const fetcher: Fetcher<Project[], string> = (url: string) =>
	axios.get(url).then((res) => res.data);

const columns: GridEnrichedColDef[] = [
	{
		field: 'name',
		headerName: 'Name',
		flex: 1,
		headerAlign: 'center',
		align: 'center',
		minWidth: 100,
	},
	{
		field: 'description',
		headerName: 'Description',
		flex: 1,
		headerAlign: 'center',
		align: 'center',
		valueFormatter: (params: GridValueFormatterParams) =>
			params.value ? params.value : 'N/A',
		minWidth: 200,
	},
	{
		field: 'progress',
		headerName: 'Progress',
		flex: 1,
		type: 'number',
		renderCell: renderProgress,
		minWidth: 80,
	},
	{
		field: 'progressWithoutOptionals',
		headerName: 'Progress (without optional steps)',
		flex: 1,
		type: 'number',
		renderCell: renderProgress,
		minWidth: 150,
	},
	{
		field: 'id',
		headerName: 'Actions',
		renderCell: (params) => {
			return (
				<IconButton
					color='primary'
					disableRipple
					LinkComponent={Link}
					href={`/projects/${params.value}`}>
					<OpenInNewIcon />
				</IconButton>
			);
		},
	},
];

const Home: NextPage = () => {
	const { data, error } = useSWR<Project[], ErrorResponse>(
		'/api/projects',
		fetcher
	);

	if (error) return <ErrorComponent text={error.message} />;
	if (!data) return <LoadingComponent />;

	return (
		<div style={{ height: 400, width: '100%' }}>
			<Typography variant='h4' align='center' sx={{ py: 2 }}>
				Projects
			</Typography>
			<DataGrid
				columns={columns}
				rows={data}
				components={{
					NoRowsOverlay: NoRowsOverlay,
				}}
			/>
		</div>
	);
};

export default Home;
