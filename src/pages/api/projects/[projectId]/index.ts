import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@data';

import {
	levelIsDone,
	levelIsFullyDone,
	generateLevelWithStats,
} from '@utils/levelUtils';
import { generateProjectWithStats } from '@utils/projectUtils';

/**
 * @openapi
 * /api/projects/{projectId}:
 *   get:
 *     description: Gets the project
 *     tags: [Projects]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: projectId
 *         description: The project's id.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Your request went well and you receive the project.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Project'
 *       404:
 *         description: Your request did not go well and you receive the error message.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Error'
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		method,
		query: { projectId, withLevels, withSteps },
	} = req;

	switch (method) {
		case 'GET':
			try {
				const project = await db.readProject(projectId as string);

				res.status(200).json(
					generateProjectWithStats(
						project,
						withLevels === 'true',
						withSteps === 'true'
					)
				);
			} catch (error: any) {
				res.status(404).json({ message: error.message });
			}
			break;
		default:
			res.setHeader('Allow', ['GET']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
