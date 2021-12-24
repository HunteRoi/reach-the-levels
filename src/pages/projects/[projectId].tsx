import React from 'react';
import { useRouter } from 'next/router';
import useSWR, { Fetcher } from 'swr';
import axios from 'axios';

import { ErrorComponent, LoadingComponent, GoBackComponent } from '@components';
import { ErrorResponse, Project } from '@models';

const fetcher: Fetcher<Project, string> = (url: string) =>
	axios.get(url).then((res) => res.data);

const ProjectPage: React.FC = () => {
	const router = useRouter();
	const { projectId } = router.query;

	const { data, error } = useSWR<Project, ErrorResponse>(
		`/api/projects/${projectId}`,
		fetcher
	);

	if (error) return <ErrorComponent text={error.message} />;
	if (!data) return <LoadingComponent />;

	return (
		<>
			<GoBackComponent />
			<h3>{data.name}</h3>
			<ul>
				{data.levels.map((l) => (
					<li key={l.id}>{l.name}</li>
				))}
			</ul>
		</>
	);
};

export default ProjectPage;
