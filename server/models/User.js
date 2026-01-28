import mongoose from 'mongoose';

const UserScheme = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, sparse: true},
    rut: {type: String, unique: true, sparse: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'user'], default: 'user' }
});

export default mongoose.model('User', UserScheme);