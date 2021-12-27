import React from 'react';
import { FormControl, FormLabel, FormGroup, Typography } from '@mui/material';
import {
	TimelineItem,
	TimelineConnector,
	TimelineSeparator,
	TimelineDot,
	TimelineContent,
	TimelineOppositeContent,
} from '@mui/lab';
import DiamondIcon from '@mui/icons-material/Diamond';

import { Level } from '@models';
import { levelIsDone, levelIsFullyDone } from '@utils/levelUtils';
import { StepComponent } from 'components';

const getColor = (level: Level, appendSuffix: boolean = false) =>
	levelIsDone(level)
		? levelIsFullyDone(level)
			? 'success'
			: 'warning'
		: 'grey';
const getThemeColor = (level: Level) => getColor(level) + '.main';
const getVariant = (level: Level) =>
	levelIsDone(level) ? 'filled' : 'outlined';

type Prop = {
	handleChange: (stepId: string) => Promise<boolean>;
	level: Level;
	isFirst?: boolean;
	isLast?: boolean;
};

export const LevelComponent: React.FC<Prop> = ({
	handleChange,
	level,
	isFirst = true,
	isLast = false,
}) => {
	return (
		<TimelineItem>
			{level.steps && (
				<TimelineOppositeContent variant='body2'>
					<FormControl
						sx={{ m: 3 }}
						component='fieldset'
						variant='standard'>
						<FormLabel component='legend'>Steps</FormLabel>
						<FormGroup>
							{level.steps.map((step) => (
								<StepComponent
									key={step.id}
									{...step}
									handleChange={handleChange}
								/>
							))}
						</FormGroup>
					</FormControl>
				</TimelineOppositeContent>
			)}

			<TimelineSeparator>
				<TimelineDot
					variant={getVariant(level)}
					color={getColor(level)}>
					<DiamondIcon sx={{ paddingTop: '2px' }} />
				</TimelineDot>

				{!isLast && (
					<TimelineConnector
						sx={{
							bgcolor: getThemeColor(level),
						}}
					/>
				)}
			</TimelineSeparator>

			<TimelineContent sx={{ py: '12px', px: 2, minWidth: '250px' }}>
				<Typography variant='h6' component='span'>
					{level.name}
				</Typography>
				{level.description && (
					<Typography variant='subtitle1'>
						{level.description}
					</Typography>
				)}
				{level.reward && (
					<Typography variant='caption'>
						Worth this reward: {level.reward}
					</Typography>
				)}
			</TimelineContent>
		</TimelineItem>
	);
};
