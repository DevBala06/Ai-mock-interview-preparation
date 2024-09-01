import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

const connectToDb = async () => {
    const connectionState = mongoose.connection.readyState;

    switch (connectionState) {
        case 0:
            console.log("Database is disconnected!");
            break;
        case 1:
            console.log("Database already connected!");
            return;
        case 2:
            console.log("Connecting to database...");
            return;
        case 3:
            console.log("Database is disconnecting...");
            return;
        default:
            console.log("Something went wrong in connection states");
            return;
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Successfully connected to the database!");
        console.log(`Host: ${mongoose.connection.host}`);

    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectToDb;
