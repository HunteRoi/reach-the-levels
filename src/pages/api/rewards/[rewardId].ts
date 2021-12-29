import type { NextApiRequest, NextApiResponse } from 'next';

import db, { isPrismaError } from '@data/db';

/**
 * @openapi
 * /api/rewards/{rewardId}:
 *   post:
 *     description: Increment the likes of the reward
 *     tags: [Rewards]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: rewardId
 *         description: The reward's id.
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
		query: { rewardId },
	} = req;

	switch (method) {
		case 'POST':
			try {
				const reward = await db.reward.findUnique({
					where: { id: rewardId as string },
				});
				if (!reward)
					throw new Error(`Reward ${rewardId as string} not found`);

				await db.reward.update({
					where: { id: rewardId as string },
					data: {
						likes: { increment: 1 },
					},
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
