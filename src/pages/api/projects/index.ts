import type { NextApiRequest, NextApiResponse } from 'next';

import db, { isPrismaError } from '@data/db';
import { generateProjectWithStats } from '@utils/projectUtils';

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
 *       optional:
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
 * 			 reward:
 * 				 type: string
 * 			 progress:
 * 				 type: number
 * 	     progressWithoutOptionals:
 * 			   type: number
 *       steps:
 *         type: array
 *         $ref: '#/definitions/Step'
 *
 *   Project:
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 * 			 description:
 * 				 type: string
 * 			 progress:
 * 				 type: number
 * 	     progressWithoutOptionals:
 * 			   type: number
 *       levels:
 *         type: array
 *         $ref: '#/definitions/Level'
 *
 *   Error:
 *     properties:
 *       message:
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
	const {
		method,
		query: { withLevels, pageSize, page },
	} = req;

	const pageNb = parseInt(page as string);
	const realPageNumber = isNaN(pageNb) || pageNb < 0 ? 0 : pageNb;
	const pageSizeNb = parseInt(pageSize as string);
	const take = isNaN(pageSizeNb) || pageSizeNb < 0 ? 10 : pageSizeNb;
	const skip = realPageNumber * take;

	switch (method) {
		case 'GET':
			try {
				const count = await db.project.count();
				const projects = await db.project.findMany({
					take,
					skip,
					include: {
						levels: {
							include: {
								steps: true,
							},
						},
					},
					orderBy: {
						name: 'asc',
					},
				});

				res.status(200).json({
					page: pageNb,
					pageSize: take,
					count,
					items: projects.map((project) =>
						generateProjectWithStats(
							project,
							withLevels === 'true',
							false
						)
					),
				});
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
