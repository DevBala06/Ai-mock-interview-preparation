import { Document, model, models, Schema } from "mongoose"; 

interface AiQueryResponseType {
    question: string;
    answer: string;
}

interface NewInterviewType extends Document {
    userId: string;
    jobRole: string;
    technologies: string[];
    difficultyLevel: string;
    queryResponseFromAi: AiQueryResponseType[];
    createdAt?: Date;
    updatedAt?: Date;
}

const AiQueryResponse: Schema = new Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
}, { _id: false });


const NewInterviewSchema = new Schema<NewInterviewType>({
    userId: {
        type: String,
        required: true,
    },
    jobRole: {
        type: String,
        required: [true, 'Job role is required'],
        trim: true,
        maxlength: [200, 'Job role cannot exceed 200 characters'],
    },
    technologies: {
        type: [String],
        required: true,
    },
    difficultyLevel: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard'],
        default: 'Medium',
    },
    queryResponseFromAi: {
        type: [AiQueryResponse],
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

// Add indexes for better search performance
NewInterviewSchema.index({ jobRole: 1 });
NewInterviewSchema.index({ technologies: 1 });

const NewInterview = models.NewInterview<NewInterviewType> || model<NewInterviewType>("NewInterview", NewInterviewSchema);

export default NewInterview;
