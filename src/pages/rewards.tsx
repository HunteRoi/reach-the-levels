import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import useSWR, { Fetcher } from 'swr';
import axios from 'axios';
import { Grid, Typography, Pagination } from '@mui/material';
import { useSnackbar } from 'notistack';

import { ErrorComponent, LoadingComponent, RewardCard } from '@components';
import { PaginatedResponse, Reward, ErrorResponse } from '@models';

const pageSize = 3;

const fetcher: Fetcher<PaginatedResponse<Reward>, string> = (url: string) =>
	axios.get(url).then((res) => res.data);

const Rewards: NextPage = () => {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const { enqueueSnackbar } = useSnackbar();

	const { data, error, mutate } = useSWR<
		PaginatedResponse<Reward>,
		ErrorResponse
	>(`/api/rewards?pageSize=${pageSize}&page=${page - 1}`, fetcher);

	const addLike = async (rewardId: string) => {
		try {
			await axios.post(`/api/rewards/${rewardId}`);
			mutate();
		} catch (error) {
			let message: string = '';

			if (axios.isAxiosError(error)) {
				message = error.response?.data?.message ?? error.message;
			} else {
				message = 'An unknown error occured';
				console.error(error);
			}

			enqueueSnackbar(message, { variant: 'error' });
		}
	};

	useEffect(() => {
		if (data) {
			const nbPages = Math.ceil(data.count / pageSize);
			setTotalPages(nbPages < 1 ? 1 : nbPages);
		}
	}, [data]);

	if (error) return <ErrorComponent text={error.message} />;
	if (!data) return <LoadingComponent />;

	return (
		<div style={{ minHeight: 400, width: '100%' }}>
			<Typography variant='h4' align='center' sx={{ py: 2 }}>
				Rewards
			</Typography>

			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 1, sm: 2, md: 3 }}
				sx={{ py: 2 }}>
				{data.items.map((reward) => (
					<Grid item key={reward.id}>
						<RewardCard {...reward} addLike={addLike} />
					</Grid>
				))}
			</Grid>

			<Pagination
				color='primary'
				count={totalPages}
				page={page}
				onChange={(_, newPage) => setPage(newPage)}
			/>
		</div>
	);
};

export default Rewards;
