import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@data';
import { Level } from '@models';

/**
 * @openapi
 * /api/projects/{projectId}/levels/{levelId}/steps/{stepId}:
 *   post:
 *     description: Sets the project's level's step as done
 *     tags: [Steps]
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
 *       - name: stepId
 *         description: The step's id.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Your request went well and you receive the updated project's level.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Level'
 *       400:
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
		query: { projectId, levelId, stepId },
	} = req;

	switch (method) {
		case 'POST':
			try {
				const project = await db.readProject(projectId as string);
				const levelEntity = project.levels.find(
					(level) => level.id === levelId
				);
				if (!levelEntity) throw new Error('Level not found');
				const level = new Level(
					levelEntity.id,
					levelEntity.name,
					levelEntity.description,
					levelEntity.steps,
					levelEntity.award,
					levelEntity.previousLevelId,
					levelEntity.previousLevelId
						? project.levels.find(
								(level) =>
									level.id === levelEntity.previousLevelId
						  )
						: undefined
				);

				const success = level.setStepAsDone(stepId as string);
				if (success) await db.writeProject(project);
				else
					throw new Error(
						'Step already done or previous level not finished'
					);

				res.status(202).end();
			} catch (error: any) {
				res.status(400).json({ error: error.message });
			}
			break;
		default:
			res.setHeader('Allow', ['POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
