import Page from "@/models/Page";
import Project from "@/models/Project";
import User from "@/models/User";
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if(!MONGODB_URI) {
    throw new Error('Wrong url!');
}

const connection = {
    isConnected: null as any
};

const connect = async () => {
    if(connection.isConnected) return;

    mongoose.set('strictQuery', false);
    const db = await mongoose.connect(MONGODB_URI);
    const userType = User;
    const pageType = Page;
    const projectType = Project;
    console.log('connected!')

    connection.isConnected = db.connections[0].readyState;
}

export default connect;