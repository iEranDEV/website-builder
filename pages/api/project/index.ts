import connect from '@/lib/firebase'
import Project from '@/models/Project';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Establish connection with database
	await connect();

	// Create user
    const { owner } = req.query;
    if(owner) {
        Project.find({ owner: owner }, (err: any, docs: any) => {
            if(!err) {
                res.json({
                    success: true,
                    data: docs,
                });
                res.status(200).end();
            } else {
                res.json({
                    success: false
                });
                res.status(400).end();
            }
        })
        return;
    } 
    Project.find((err: any, docs: any) => {
        if(!err) {
            res.json({
                success: true,
                data: docs,
            });
            res.status(200).end();
        } else {
            res.json({
                success: false
            });
            res.status(400).end();
        }
    })
}
