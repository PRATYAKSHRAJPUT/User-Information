import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  age: { type: String },
  role: { type: String },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
