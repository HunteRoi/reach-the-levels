import React from 'react';
import Image from 'next/image';
import {
	Card,
	CardContent,
	CardMedia,
	CardActions,
	Typography,
	IconButton,
	BadgeProps,
	Badge,
	Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Favorite, Link as LinkIcon } from '@mui/icons-material';

import { Link } from '@components';
import { Reward } from '@models';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}));

type Props = {
	addLike: (rewardId: string) => void;
} & Reward;

export const RewardCard: React.FC<Props> = ({
	name,
	imageURL,
	description,
	likes,
	id,
	externalURL,
	cost,
	addLike,
}) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				component='img'
				height={200}
				image={
					imageURL ??
					'https://estinnes.be/wp-content/uploads/2020/02/placeholder-3.png'
				}
				alt={name}
			/>
			<CardContent>
				<Typography variant='h4' component='div'>
					{name}
				</Typography>
				<Typography
					gutterBottom
					variant='caption'
					component='div'></Typography>
				{cost} ☆
				<Typography variant='body2' sx={{ mb: 1.5 }}>
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<IconButton aria-label='like' onClick={() => addLike(id)}>
					<StyledBadge
						badgeContent={likes.toString()}
						color='primary'>
						<Favorite sx={{ color: 'red' }} />
					</StyledBadge>
				</IconButton>
				{externalURL && (
					<Tooltip title='View more here'>
						<IconButton
							aria-label='external link'
							component={Link}
							href={externalURL}
							target='_blank'
							rel='noopener'
							sx={{ marginLeft: 'auto' }}>
							<LinkIcon />
						</IconButton>
					</Tooltip>
				)}
			</CardActions>
		</Card>
	);
};
