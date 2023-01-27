import { Schema, model, models } from 'mongoose';

const pageSchema = new Schema({
    name: String,
    structure: [Schema.Types.Mixed],
    createdAt: Date,
    modifiedAt: Date,
    project: Schema.Types.ObjectId,
})

const Page = models.Page || model('Page', pageSchema);

export default Page;