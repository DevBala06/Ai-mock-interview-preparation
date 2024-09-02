import { Document, model, models, Schema } from "mongoose";



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
});

const NewUser = models.NewUser<NewUserType> || model("NewUser", NewUserSchema)

export default NewUser
