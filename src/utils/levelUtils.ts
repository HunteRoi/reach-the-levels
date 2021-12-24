import { Level } from 'models';

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
