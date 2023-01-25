import connect from '@/lib/db'
import Project from '@/models/Project';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Establish connection with database
	await connect();

	// Create project
    const data = JSON.parse(req.body);
    const project = await Project.create({
        name: data.name,
        description: data.description,
        owner: data.owner,
        createdAt: new Date(),
    });
    res.json({
        success: true,
        data: project
    });
    res.status(200).end();
}
