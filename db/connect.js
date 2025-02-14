import {connect} from 'mongoose'

/**
 * Conenct to Database
 * @async
 * @param {string} uri connection string
 * @returns {Promise} connect to database by connection string
 * @throws {Error} return Error if connection string invalid
 */
const connectDB = async (uri) =>{
    try {
        await connect(uri);
        console.log('MongoDB Connected...');
        
    } catch (error) {
        throw new Error(error);
    }
}

export default connectDB;