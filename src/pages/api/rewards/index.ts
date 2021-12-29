import type { NextApiRequest, NextApiResponse } from 'next';

import db, { isPrismaError } from '@data/db';

/**
 * @openapi
 * definitions:
 *   Reward:
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       cost:
 *         type: number
 */

/**
 * @openapi
 * tags:
 *   - name: Rewards
 */

/**
 * @openapi
 * /api/rewards:
 *   get:
 *     description: Gets the rewards
 *     tags: [Rewards]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Your request went well and you receive a pagination object of rewards.
 *         schema:
 *           type: array
 *           $ref: '#/definitions/Reward'
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
		query: { pageSize, page },
	} = req;

	const pageNb = parseInt(page as string);
	const realPageNumber = isNaN(pageNb) || pageNb < 0 ? 0 : pageNb;
	const pageSizeNb = parseInt(pageSize as string);
	const take = isNaN(pageSizeNb) || pageSizeNb < 0 ? 10 : pageSizeNb;
	const skip = realPageNumber * take;

	switch (method) {
		case 'GET':
			try {
				const count = await db.reward.count();
				const rewards = await db.reward.findMany({
					take,
					skip,
					orderBy: {
						cost: 'asc',
					},
				});

				res.status(200).json({
					page: realPageNumber,
					pageSize: take,
					count,
					items: rewards,
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
