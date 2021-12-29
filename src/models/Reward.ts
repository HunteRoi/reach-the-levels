import DescriptiveElement from './DescriptiveElement';

export interface Reward extends DescriptiveElement {
	id: string;
	cost: number;
	imageURL?: string;
	likes: number;
	externalURL?: string;
}
