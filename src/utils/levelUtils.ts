import { Level } from 'models';
import { round } from './mathUtils';
import {
	calculateCompletionRate as calculateStepsCompletionRate,
	calculateCompletionRateWithoutOptionals as calculateStepsCompletionRateWithOptionals,
} from '@utils/stepUtils';

export function levelIsDone(level: Level): boolean {
	return nonOptionalStepsAreDone(level);
}

export function levelIsFullyDone(level: Level): boolean {
	return allStepsAreDone(level);
}

export function nonOptionalStepsAreDone(level: Level): boolean {
	return level.steps
		.filter((step) => !step.optional)
		.every((step) => step.done);
}

export function allStepsAreDone(level: Level): boolean {
	return level.steps.every((step) => step.done);
}

export function calculateCompletionRate(levels: Level[]): number {
	const numberOfLevels = levels.length;
	const numberOfDoneLevels = levels.reduce(
		(seed, level) => (seed += levelIsFullyDone(level) ? 1 : 0),
		0
	);
	return numberOfLevels === 0
		? 0
		: round(numberOfDoneLevels / numberOfLevels, 3);
}

export function calculateCompletionRateWithoutOptionals(
	levels: Level[]
): number {
	const numberOfLevels = levels.length;
	const numberOfDoneLevels = levels.reduce(
		(seed, level) => (seed += levelIsDone(level) ? 1 : 0),
		0
	);
	return numberOfLevels === 0
		? 0
		: round(numberOfDoneLevels / numberOfLevels, 3);
}

export function generateLevelWithStats(
	level: Level,
	withSteps: boolean = false
) {
	return {
		...level,
		progress: calculateStepsCompletionRate(level.steps),
		progressWithoutOptionals: calculateStepsCompletionRateWithOptionals(
			level.steps
		),
		allStepsDone: allStepsAreDone(level),
		allNonOptionalStepsDone: nonOptionalStepsAreDone(level),
		steps: withSteps ? level.steps : [],
	};
}
