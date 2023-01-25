import { Schema, model, models } from 'mongoose';

const projectSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    name: String,
    description: String,
    createdAt: Date,
})

const Project = models.Project || model('Project', projectSchema);

export default Project;