import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // store hashed password
  about: { type: String, default: '' },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);