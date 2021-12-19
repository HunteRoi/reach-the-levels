import DescriptiveElement from './DescriptiveElement';
import { Level } from './Level';

export interface Project extends DescriptiveElement {
	id: string;
	levels: Level[];
}
