import mongoose from 'mongoose';
import config from '../common/config.js';

export default mongoose.createConnection(config.mongodb.uri);
