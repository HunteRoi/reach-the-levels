import { Level, Step } from '@models';
import { nonOptionalStepsAreDone } from './levelUtils';

export function calculateCompletionRate(steps: Step[]): number {
	const numberOfSteps = steps.length;
	const numberOfDoneSteps = steps.reduce(
		(seed, step) => (seed += step.done ? 1 : 0),
		0
	);

	return numberOfSteps === 0 ? 0 : numberOfDoneSteps / numberOfSteps;
}

export function calculateCompletionRateWithoutOptionals(steps: Step[]): number {
	const numberOfSteps = steps.length;
	const numberOfDoneSteps = steps
		.filter((step) => !step.optional)
		.reduce((seed, step) => (seed += step.done ? 1 : 0), 0);
	return numberOfSteps === 0 ? 0 : numberOfDoneSteps / numberOfSteps;
}

export function setStepAsDone(level: Level, stepId: string): boolean {
	const stepToEdit = level.steps.find((step) => step.id === stepId);
	if (stepToEdit && !stepToEdit.done && previousLevelStepsAreDone(level)) {
		stepToEdit.done = true;
		return true;
	}
	return false;
}

function previousLevelStepsAreDone(level: Level): boolean {
	return (
		!level.previousLevelId ||
		(level.previousLevel !== undefined &&
			nonOptionalStepsAreDone(level.previousLevel))
	);
}
