import type { NextApiRequest, NextApiResponse } from 'next';

import db, { isPrismaError } from '@data/db';
import {
	nextLevelStepsAreNotDone,
	previousLevelStepsAreDone,
} from '@utils/stepUtils';

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
 *       202:
 *         description: Your request went well.
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
				const currentStep = await db.step.findUnique({
					where: { id: stepId as string },
					include: {
						Level: {
							include: {
								previousLevel: { include: { steps: true } },
								nextLevel: { include: { steps: true } },
							},
						},
					},
				});
				if (!currentStep)
					throw new Error(`Step ${stepId as string} not found`);

				if (currentStep.done) {
					if (
						currentStep.optional ||
						nextLevelStepsAreNotDone(currentStep.Level)
					) {
						currentStep.done = false;
					} else {
						throw new Error(
							'One or more mandatory steps from the next level are already done'
						);
					}
				} else {
					if (previousLevelStepsAreDone(currentStep.Level)) {
						currentStep.done = true;
					} else {
						throw new Error(
							'All mandatory steps from the previous level are not done yet'
						);
					}
				}

				await db.step.update({
					where: { id: stepId as string },
					data: { done: currentStep.done },
				});

				res.status(202).end();
			} catch (error: any) {
				if (isPrismaError(error)) {
					res.status(500).json({ message: error.message });
				} else {
					res.status(400).json({ message: error.message });
				}
				console.error(error);
			}
			break;
		default:
			res.setHeader('Allow', ['POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
