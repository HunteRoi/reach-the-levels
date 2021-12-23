import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@data';
import { Level } from '@models';

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
				const levelEntity = project.levels.find(
					(level) => level.id === levelId
				);
				if (!levelEntity) throw new Error('Not found');
				const level = new Level(
					levelEntity.id,
					levelEntity.name,
					levelEntity.description,
					levelEntity.steps,
					levelEntity.award
				);

				res.status(200).json({
					...level,
					completionRate: level.completionRateWithoutOptionalSteps(),
					fullCompletionRate: level.completionRate(),
					allStepsDone: level.allStepsAreDone(),
					allNonOptionalStepsDone: level.nonOptionalStepsAreDone(),
				});
			} catch (error: any) {
				res.status(404).json({ error: error.message });
			}
			break;
		default:
			res.setHeader('Allow', ['GET']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
