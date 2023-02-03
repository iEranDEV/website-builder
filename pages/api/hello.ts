import connect from '@/lib/firebase'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	// Establish connection with database
	await connect();
	res.status(200).json({ name: 'John Doe' })
}
