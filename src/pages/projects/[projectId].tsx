import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR, { Fetcher } from 'swr';
import axios from 'axios';
import { Timeline } from '@mui/lab';
import { useSnackbar } from 'notistack';

import {
	ErrorComponent,
	LoadingComponent,
	GoBackComponent,
	LevelComponent,
} from '@components';
import { ErrorResponse, Level, Project } from '@models';
import useIsTouchDevice from 'hooks/useIsTouchDevice';

const fetcher: Fetcher<Project, string> = async (url: string) => {
	try {
		const res = await axios.get<Project>(url);
		return res.data;
	} catch (error) {
		let err;
		if (axios.isAxiosError(error)) {
			err = new Error(error.response?.data?.message ?? error.message);
		} else {
			console.error(error);
			err = new Error('An unknown error occured');
		}
		throw err;
	}
};

const ProjectPage: React.FC = () => {
	const [projectId, setProjectId] = useState<string | null>(null);
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const isTouchDevice = useIsTouchDevice();

	const {
		data: project,
		error,
		mutate,
	} = useSWR<Project, ErrorResponse>(
		projectId
			? `/api/projects/${
					projectId as string
			  }?withLevels=true&withSteps=true`
			: null,
		fetcher
	);

	const handleChange = async (level: Level, stepId: string) => {
		let success = false;

		const step = level?.steps.find((step) => step.id === stepId);
		if (step) {
			try {
				await axios.post(
					`/api/projects/${projectId}/levels/${level.id}/steps/${step.id}`
				);
				success = true;

				mutate();
				enqueueSnackbar('The step was successfully changed', {
					variant: 'success',
				});
			} catch (error) {
				let message: string = '';

				if (axios.isAxiosError(error)) {
					message = error.response?.data?.message ?? error.message;
				} else {
					message = 'An unknown error occured';
					console.error(error);
				}

				enqueueSnackbar(message, { variant: 'error' });
			}
		}

		return success;
	};

	useEffect(() => {
		setProjectId(router.query.projectId as string);
	}, [router]);

	if (error) return <ErrorComponent text={error.message} />;
	if (!project) return <LoadingComponent />;

	return (
		<>
			<div>
				<h3>{project.name}</h3>
				{project.description && <p>{project.description}</p>}
			</div>

			{project.levels && (
				<Timeline
					position={isTouchDevice ? 'left' : 'alternate'}
					sx={{ m: '0 auto' }}>
					{project.levels.map((level, index) => (
						<LevelComponent
							key={level.id}
							level={level}
							isFirst={index === 0}
							isLast={index + 1 === project.levels.length}
							handleChange={(stepId: string) =>
								handleChange(level, stepId)
							}
						/>
					))}
				</Timeline>
			)}

			<GoBackComponent />
		</>
	);
};

export default ProjectPage;
