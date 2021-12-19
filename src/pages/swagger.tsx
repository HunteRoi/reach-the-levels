import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import { ReactElement } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

import packageInfo from '../../package.json';

const ApiDoc = ({ spec }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return <SwaggerUI spec={spec} />;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const spec: Record<string, any> = createSwaggerSpec({
		apiFolder: 'src/pages/api',
		title: 'NextJS Swagger',
		version: packageInfo.version,
	});
	return {
		props: {
			spec,
		},
	};
};

ApiDoc.getLayout = (page: ReactElement) => page;

export default ApiDoc;
