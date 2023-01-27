import connect from '@/lib/db';
import Project from '@/models/Project';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Establish connection with database
	await connect();

	// Create user
    const { id } = req.query;
    if(id) {
        const project = await Project.findById(id).populate('pages');
        res.json({
            success: true,
            data: project,
        });
        res.status(200).end();
        return;
    }
    res.json({success: false});
    res.status(400).end();
}
