import { Level, Step } from '@models';
import { nonOptionalStepsAreDone } from './levelUtils';
import { round } from './mathUtils';

export function calculateCompletionRate(steps: Step[]): number {
	const numberOfSteps = steps.length;
	const numberOfDoneSteps = steps.reduce(
		(seed, step) => (seed += step.done ? 1 : 0),
		0
	);

	return numberOfSteps === 0
		? 0
		: round(numberOfDoneSteps / numberOfSteps, 3);
}

export function calculateCompletionRateWithoutOptionals(steps: Step[]): number {
	const numberOfSteps = steps.length;
	const numberOfDoneSteps = steps
		.filter((step) => !step.optional)
		.reduce((seed, step) => (seed += step.done ? 1 : 0), 0);
	return numberOfSteps === 0
		? 0
		: round(numberOfDoneSteps / numberOfSteps, 3);
}

export function nextLevelStepsAreNotDone(level: Level): boolean {
	return (
		!level.nextLevelId ||
		(level.nextLevel !== undefined &&
			!level.nextLevel.steps.some((s) => s.done))
	);
}

export function previousLevelStepsAreDone(level: Level): boolean {
	return (
		!level.previousLevelId ||
		(level.previousLevel !== undefined &&
			nonOptionalStepsAreDone(level.previousLevel))
	);
}
