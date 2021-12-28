import { nonOptionalStepsAreDone } from './levelUtils';
import { round } from './mathUtils';
import { NullableSteps, Step, ChainedLevelWithSteps } from '@data/models';

export function calculateNumberOfDoneSteps(steps: NullableSteps): number {
	if (!steps) throw new Error('No steps');

	return steps.reduce((seed, step) => (seed += step.done ? 1 : 0), 0);
}

export function calculateNumberOfNonOptionalDoneSteps(
	steps: NullableSteps
): number {
	if (!steps) throw new Error('No steps');

	return calculateNumberOfDoneSteps(steps.filter((step) => !step.optional));
}

export function calculateCompletionRate(steps: NullableSteps): number {
	if (!steps) throw new Error('No steps');

	const numberOfSteps = steps.length;
	const numberOfDoneSteps = calculateNumberOfDoneSteps(steps);

	return numberOfSteps === 0
		? 0
		: round(numberOfDoneSteps / numberOfSteps, 3);
}

export function calculateCompletionRateWithoutOptionals(
	steps: NullableSteps
): number {
	if (!steps) throw new Error('No steps');

	const numberOfSteps = steps.length;
	const numberOfDoneSteps = calculateNumberOfNonOptionalDoneSteps(steps);

	return numberOfSteps === 0
		? 0
		: round(numberOfDoneSteps / numberOfSteps, 3);
}

export function nextLevelStepsAreNotDone(
	level: ChainedLevelWithSteps
): boolean {
	if (!level) throw new Error('No level');

	return (
		!level.nextLevel || !level.nextLevel.steps?.some((s: Step) => s.done)
	);
}

export function previousLevelStepsAreDone(
	level: ChainedLevelWithSteps
): boolean {
	if (!level) throw new Error('No level');

	return !level.previousLevel || nonOptionalStepsAreDone(level.previousLevel);
}
