import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@data';

/**
 * @openapi
 * definitions:
 *   Step:
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       done:
 *         type: boolean
 *
 *   Level:
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       steps:
 *         type: array
 *         $ref: '#/definitions/Step'
 *       previousLevelId:
 *         type: string
 *       nextLevelId:
 *         type: string
 *
 *   Project:
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       levels:
 *         type: array
 *         $ref: '#/definitions/Level'
 *
 *   Error:
 *     properties:
 *       error:
 *         type: string
 */

/**
 * @openapi
 * tags:
 *   - name: Projects
 *   - name: Levels
 *   - name: Steps
 */

/**
 * @openapi
 * /api/projects:
 *   get:
 *     description: Gets the projects
 *     tags: [Projects]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Your request went well and you receive an array of projects.
 *         schema:
 *           type: array
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
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const projects = await db.readProjects();
				res.status(200).json(
					projects.map((project) => ({ ...project, levels: null }))
				);
			} catch (error: any) {
				res.status(404).json({ error: error.message });
			}
			break;
		default:
			res.setHeader('Allow', ['GET']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
