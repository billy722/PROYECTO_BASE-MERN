import mongoose from 'mongoose';

const UserScheme = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'vendedor'], default: 'vendedor' }
});

export default mongoose.model('User', UserScheme);