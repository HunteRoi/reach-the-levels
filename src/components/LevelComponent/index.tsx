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
import { Diamond } from '@mui/icons-material';

import { LevelWithSteps } from '@data/models';
import { Level, Step } from '@models';
import { levelIsDone, levelIsFullyDone } from '@utils/levelUtils';
import { StepComponent } from 'components';

const getColor = (level: Level, appendSuffix: boolean = false) =>
	levelIsDone(level as unknown as LevelWithSteps)
		? levelIsFullyDone(level as unknown as LevelWithSteps)
			? 'success'
			: 'warning'
		: 'grey';
const getThemeColor = (level: Level) => getColor(level) + '.main';
const getVariant = (level: Level) =>
	levelIsDone(level as unknown as LevelWithSteps) ? 'filled' : 'outlined';

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
							{level.steps.map((step: Step) => (
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
					<Diamond sx={{ paddingTop: '2px' }} />
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
					<Typography variant='body1'>{level.description}</Typography>
				)}
				{(level?.totalPoints ?? 0) > 0 && (
					<Typography variant='subtitle2'>
						{level.totalPoints} ☆ worth
					</Typography>
				)}
			</TimelineContent>
		</TimelineItem>
	);
};
