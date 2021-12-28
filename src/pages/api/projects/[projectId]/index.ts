import type { NextApiRequest, NextApiResponse } from 'next';

import db, { isPrismaError } from '@data/db';
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
				const project = await db.project.findUnique({
					where: { id: projectId as string },
					include: {
						levels: {
							include: {
								steps: true,
							},
						},
					},
				});

				if (!project) throw new Error('Project not found');

				res.status(200).json(
					generateProjectWithStats(
						project,
						withLevels === 'true',
						withSteps === 'true'
					)
				);
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
			res.setHeader('Allow', ['GET']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
