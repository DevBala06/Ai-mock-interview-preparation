import { Schema, model, models } from 'mongoose';

const NewUserSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true, // This line indicates that userName is required
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const NewUser = models.NewUser || model('NewUser', NewUserSchema);
export default NewUser;
