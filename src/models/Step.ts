import DescriptiveElement from './DescriptiveElement';

export interface Step extends DescriptiveElement {
	id: string;
	done: boolean;
	optional: boolean;
}
