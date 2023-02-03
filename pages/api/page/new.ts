import connect from '@/lib/firebase'
import Page from '@/models/Page';
import Project from '@/models/Project';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Establish connection with database
	await connect();

	// Create project
    const data = JSON.parse(req.body);
    if(data.project) {
        const page = await Page.create({
            name: data.name,
            structure: [],
            project: data.project,
            createdAt: new Date(),
            modifiedAt: new Date(),
        });
        const project = await Project.findById(data.project);
        project.pages.push(page._id);
        project.save();
        res.json({
            success: true,
            data: page
        });
        res.status(200).end();
    } else {
        res.json({
            success: false,
        });
        res.status(200).end();
    }
}
