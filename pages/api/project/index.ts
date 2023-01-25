import connect from '@/lib/db'
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
                res.status(201).json({
                    success: true,
                    data: docs,
                })
            } else {
                res.status(400).json({
                    success: false
                })
            }
        })
        return;
    } 
    Project.find((err: any, docs: any) => {
        if(!err) {
            res.status(201).json({
                success: true,
                data: docs,
            })
        } else {
            res.status(400).json({
                success: false
            })
        }
    })
}
