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
		if(findByEmail) {
			if(data.password === findByEmail.password) {
				res.status(201).json({
					success: true,
					data: findByEmail
				})
			} else {
				res.status(400).json({
					success: false,
					error: 'Wrong password!',
				})
			}
		} else {
			res.status(400).json({
				success: false,
				error: 'User with this email not found.'
			})
		}
	}
}
