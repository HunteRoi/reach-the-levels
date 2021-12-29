import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';

import { Step } from '@models';

const OptionalCheckboxOutlineBlankIcon = styled(CheckBoxOutlineBlank)({
	opacity: 0.5,
});
const OptionalCheckboxIcon = styled(CheckBox)({
	opacity: 0.5,
});

type Prop = {
	handleChange: (stepId: string) => Promise<boolean>;
} & Step;

export const StepComponent: React.FC<Prop> = ({
	id,
	done,
	name,
	description,
	optional,
	points,
	handleChange,
}) => {
	const [checked, setChecked] = useState(done);

	const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		event.persist();
		const success = await handleChange(id);
		if (success) {
			setChecked(!event.target.checked);
		}
	};

	const mainComponent = (
		<FormControlLabel
			control={
				<Checkbox
					checked={checked}
					onChange={onChange}
					name={name}
					id={id}
					required={!optional}
					icon={
						optional ? (
							<OptionalCheckboxOutlineBlankIcon />
						) : (
							<CheckBoxOutlineBlank />
						)
					}
					checkedIcon={
						optional ? <OptionalCheckboxIcon /> : <CheckBox />
					}
				/>
			}
			label={`${name}${points ? ` - ${points} ☆` : ''}`}
		/>
	);

	return description ? (
		<Tooltip title={description} placement='right-end' describeChild arrow>
			{mainComponent}
		</Tooltip>
	) : (
		mainComponent
	);
};
