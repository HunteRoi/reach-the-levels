import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckboxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { Step } from '@models';

const OptionalCheckboxOutlineBlankIcon = styled(CheckboxOutlineBlankIcon)({
	opacity: 0.5,
});
const OptionalCheckboxIcon = styled(CheckBoxIcon)({
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

	return (
		<Tooltip title={description} placement='right-end' describeChild arrow>
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
								<CheckboxOutlineBlankIcon />
							)
						}
						checkedIcon={
							optional ? (
								<OptionalCheckboxIcon />
							) : (
								<CheckBoxIcon />
							)
						}
					/>
				}
				label={name}
			/>
		</Tooltip>
	);
};
