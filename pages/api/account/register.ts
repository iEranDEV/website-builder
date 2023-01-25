import connect from '@/lib/db'
import User from '@/models/User';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Establish connection with database
	await connect();

	// Create user
	if(req.method === 'POST') {
		const data = JSON.parse(req.body);
		const findByEmail = await User.findOne({ email: data.email })
		if(!findByEmail) {
			const user = await User.create(data);
			res.status(201).json({
				success: true,
				data: {
					email: user.email,
					username: user.username
				}
			})
		} else {
			res.status(400).json({
				success: false,
				error: 'Email already in use.'
			})
		}
	}
}
