import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@data';
import {
	nextLevelStepsAreNotDone,
	previousLevelStepsAreDone,
} from '@utils/stepUtils';
import { Level } from 'models';

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
				const currentProject = await db.readProject(
					projectId as string
				);
				const currentLevel = currentProject.levels.find(
					(level) => level.id === levelId
				);
				if (!currentLevel) throw new Error('Level not found');
				currentLevel.previousLevel = currentProject.levels.find(
					(level) => level.id === currentLevel.previousLevelId
				);
				currentLevel.nextLevel = currentProject.levels.find(
					(level) => level.id === currentLevel.nextLevelId
				);

				const stepToEdit = currentLevel.steps.find(
					(step) => step.id === stepId
				);
				if (stepToEdit) {
					if (stepToEdit.done) {
						if (
							stepToEdit.optional ||
							nextLevelStepsAreNotDone(currentLevel)
						) {
							stepToEdit.done = false;
						} else {
							throw new Error(
								'One or more mandatory steps from the next level are already done'
							);
						}
					} else {
						if (previousLevelStepsAreDone(currentLevel)) {
							stepToEdit.done = true;
						} else {
							throw new Error(
								'All mandatory steps from the previous level are not done yet'
							);
						}
					}
				} else {
					throw new Error('Step not found');
				}

				await db.writeProject(currentProject);

				res.status(202).end();
			} catch (error: any) {
				res.status(400).json({ message: error.message });
			}
			break;
		default:
			res.setHeader('Allow', ['POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
