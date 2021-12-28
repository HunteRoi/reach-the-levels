import ProgressiveElement from './ProgressiveElement';
import DescriptiveElement from './DescriptiveElement';
import { Step } from './Step';

export interface Level extends DescriptiveElement, ProgressiveElement {
	id: string;
	steps: Step[];
	reward?: string;

	previousLevelId?: string;
	nextLevelId?: string;
	previousLevel?: Level;
	nextLevel?: Level;
}
