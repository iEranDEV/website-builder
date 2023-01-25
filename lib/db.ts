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
    console.log('connected!')

    connection.isConnected = db.connections[0].readyState;
}

export default connect;