import { ProgressiveElement } from './ProgressiveElement';
import DescriptiveElement from './DescriptiveElement';
import { Step } from './Step';

export interface Level extends DescriptiveElement, ProgressiveElement {
	id: string;
	steps: Step[];

	previousLevelId?: string;
	nextLevelId?: string;
	previousLevel?: Level;
	nextLevel?: Level;

	totalPoints?: number;
	currentPoints?: number;
}
