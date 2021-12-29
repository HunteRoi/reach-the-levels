import { round } from './mathUtils';
import {
	calculateCompletionRate as calculateStepsCompletionRate,
	calculateCompletionRateWithoutOptionals as calculateStepsCompletionRateWithOptionals,
	calculateNumberOfDoneSteps,
	calculateNumberOfNonOptionalDoneSteps,
} from '@utils/stepUtils';
import { NullableLevels, LevelWithSteps, Step } from 'data/models';
import { ProgressiveElement } from '@models';

export function levelIsDone(level: LevelWithSteps): boolean {
	return nonOptionalStepsAreDone(level);
}

export function levelIsFullyDone(level: LevelWithSteps): boolean {
	return allStepsAreDone(level);
}

export function nonOptionalStepsAreDone(level: LevelWithSteps): boolean {
	if (!level) throw new Error('No level');
	if (!level.steps) throw new Error("No level's steps");

	return level.steps
		.filter((step: Step) => !step.optional)
		.every((step: Step) => step.done);
}

export function allStepsAreDone(level: LevelWithSteps): boolean {
	if (!level) throw new Error('No level');
	if (!level.steps) throw new Error("No level's steps");

	return level.steps.every((step) => step.done);
}

export function calculateCompletionRate(levels: NullableLevels): number {
	if (!levels) throw new Error('No levels');

	const numberOfSteps = levels.reduce(
		(seed, level) => (seed += level.steps?.length ?? 0),
		0
	);
	const numberOfDoneSteps = levels.reduce(
		(seed, level) => (seed += calculateNumberOfDoneSteps(level.steps)),
		0
	);

	return numberOfSteps === 0
		? 0
		: round(numberOfDoneSteps / numberOfSteps, 3);
}

export function calculateCompletionRateWithoutOptionals(
	levels: NullableLevels
): number {
	if (!levels) throw new Error('No levels');

	const numberOfSteps = levels.reduce(
		(seed, level) =>
			(seed += level.steps?.filter((s) => !s.optional).length ?? 0),
		0
	);
	const numberOfDoneSteps = levels.reduce(
		(seed, level) =>
			(seed += calculateNumberOfNonOptionalDoneSteps(level.steps)),
		0
	);

	return numberOfSteps === 0
		? 0
		: round(numberOfDoneSteps / numberOfSteps, 3);
}

export function generateLevelWithStats(
	level: LevelWithSteps,
	withSteps: boolean = false
): LevelWithSteps &
	ProgressiveElement & {
		allStepsDone: boolean;
		allNonOptionalStepsDone: boolean;
		totalPoints?: number;
	} {
	if (!level) throw new Error('No level');
	if (!level.steps) throw new Error("No level's steps");

	const steps = withSteps ? level.steps : null;
	const totalPoints = calculateTotalPoints(level);

	return {
		...level,
		progress: calculateStepsCompletionRate(level.steps),
		progressWithoutOptionals: calculateStepsCompletionRateWithOptionals(
			level.steps
		),
		allStepsDone: allStepsAreDone(level),
		allNonOptionalStepsDone: nonOptionalStepsAreDone(level),
		steps,
		totalPoints,
	};
}

export function calculateTotalPoints(level: LevelWithSteps): number {
	if (!level) throw new Error('No level');
	if (!level.steps) throw new Error('No steps');

	return level.steps.reduce((seed, step) => (seed += step?.points ?? 0), 0);
}

export function calculateWonPoints(level: LevelWithSteps): number {
	if (!level) throw new Error('No level');
	if (!level.steps) throw new Error('No steps');

	return level.steps.reduce(
		(seed, step) => (seed += step?.done ? step?.points ?? 0 : 0),
		0
	);
}
