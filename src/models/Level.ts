import DescriptiveElement from './DescriptiveElement';
import { Step } from './Step';

export class Level implements DescriptiveElement {
	id: string;
	name: string;
	description: string;
	steps: Step[];
	award?: string;
	previousLevelId?: string;
	previousLevel?: Level;

	constructor(
		id: string,
		name: string,
		description: string,
		steps: Step[] = [],
		award?: string,
		previousLevelId?: string,
		previousLevel?: Level
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.award = award;
		this.steps = steps;
		this.previousLevelId = previousLevelId;
		this.previousLevel = previousLevel;
	}

	private previousLevelStepsAreDone(): boolean {
		return (
			!this.previousLevelId ||
			(this.previousLevel !== undefined &&
				this.previousLevel.nonOptionalStepsAreDone &&
				this.previousLevel.nonOptionalStepsAreDone())
		);
	}

	setStepAsDone(stepId: string): boolean {
		const stepToEdit = this.steps.find((step) => step.id === stepId);
		if (
			stepToEdit &&
			!stepToEdit.done &&
			this.previousLevelStepsAreDone()
		) {
			stepToEdit.done = true;
			this.steps = [...this.steps, stepToEdit];
			return true;
		}
		return false;
	}

	private calculateCompletionRate(steps: Step[]): number {
		const numberOfSteps = steps.length;
		const numberOfDoneSteps = steps.reduce(
			(seed, step) => (seed += step.done ? 1 : 0),
			0
		);

		return numberOfSteps === 0 ? 0 : numberOfDoneSteps / numberOfSteps;
	}

	completionRate(): number {
		return this.calculateCompletionRate(this.steps);
	}

	completionRateWithoutOptionalSteps(): number {
		const steps = this.steps.filter((step) => !step.optional);
		return this.calculateCompletionRate(steps);
	}

	allStepsAreDone(): boolean {
		return this.steps.every((step) => step.done);
	}

	nonOptionalStepsAreDone(): boolean {
		return this.steps
			.filter((step) => !step.optional)
			.every((step) => step.done);
	}
}
