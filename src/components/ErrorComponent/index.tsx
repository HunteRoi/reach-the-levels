import React from 'react';

type Props = {
	text: string;
};

export const ErrorComponent: React.FC<Props> = ({ text }) => {
	return <span>{text}</span>;
};
