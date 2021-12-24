import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@data';
import { allStepsAreDone, nonOptionalStepsAreDone } from '@utils/levelUtils';
import {
	calculateCompletionRate,
	calculateCompletionRateWithoutOptionals,
} from '@utils/stepUtils';

/**
 * @openapi
 * /api/projects/{projectId}/levels/{levelId}:
 *   get:
 *     description: Gets the project's level
 *     tags: [Levels]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: projectId
 *         description: The project's id.
 *         in: path
 *         required: true
 *         type: string
 *       - name: levelId
 *         description: The level's id.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Your request went well and you receive the project's level.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Level'
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
		query: { projectId, levelId },
	} = req;

	switch (method) {
		case 'GET':
			try {
				const project = await db.readProject(projectId as string);
				const level = project.levels.find(
					(level) => level.id === levelId
				);
				if (!level) throw new Error('Not found');

				res.status(200).json({
					...level,
					progress: calculateCompletionRate(level.steps),
					progressWithoutOptionals:
						calculateCompletionRateWithoutOptionals(level.steps),
					allStepsDone: allStepsAreDone(level),
					allNonOptionalStepsDone: nonOptionalStepsAreDone(level),
				});
			} catch (error: any) {
				res.status(404).json({ message: error.message });
			}
			break;
		default:
			res.setHeader('Allow', ['GET']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
