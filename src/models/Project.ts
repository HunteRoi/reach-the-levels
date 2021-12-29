import DescriptiveElement from './DescriptiveElement';
import { ProgressiveElement } from './ProgressiveElement';
import { Level } from './Level';

export interface Project extends DescriptiveElement, ProgressiveElement {
	id: string;
	levels: Level[];
	totalPoints?: number;
}
