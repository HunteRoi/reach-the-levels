import DescriptiveElement from './DescriptiveElement';
import { Step } from './Step';

export interface Level extends DescriptiveElement {
	id: string;
	steps: Step[];
	award?: string;
	previousLevelId?: string;
	previousLevel?: Level;
	progress: number;
	progressWithoutOptionals: number;
}
