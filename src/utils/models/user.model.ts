import { Schema, model, models } from 'mongoose';

<<<<<<< HEAD
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
=======


interface NewUserType extends Document {
    clerkId:string;
    email:string;
    userName:string;
    createdAt: Date;
    updatedAt: Date;
};

const NewUserSchema = new Schema<NewUserType>({
    clerkId:{
        type: String,
        required:true,
        unique:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    userName: {
        type: String,
        unique:true,
        maxlength: [50, 'Username cannot exceed 50 characters'],
    },
}, {
    timestamps: true,
    versionKey: false,
>>>>>>> 4da2ea92bcc56da993de452dd2c417031dc58419
});

const NewUser = models.NewUser || model('NewUser', NewUserSchema);
export default NewUser;
