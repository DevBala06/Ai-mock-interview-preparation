import { Document, model, models, Schema } from "mongoose"; 


interface AiQueryResponseTypes {
    questions: string[];
    answers: string[];
}

interface SFresponseTypes {
    suggestions: string;
    feedback: string;
}

interface NewInterviewType extends Document {
    userId:string;
    jobRole: string;
    technologies: string[];
    difficultyLevel: string;
    queryResponseFromAi: AiQueryResponseTypes;
    sfResponseFromAi: SFresponseTypes;
    createdAt: Date;
    updatedAt: Date;
}

const AiQueryResponse: Schema = new Schema({
    questions: {
        type: [String],
        required: true,
        default: [],
    },
    answers: {
        type: [String],
        required: true,
        default: [],
    },
}, { _id: false });

const SFresponse: Schema = new Schema({
    suggestions: {
        type: String,
        required: true,
        trim: true,
    },
    feedback: {
        type: String,
        required: true,
        trim: true,
    },
}, { _id: false });

const NewInterviewSchema = new Schema<NewInterviewType>({
    userId:{
        type: String,
        required:true,
    },
    jobRole: {
        type: String,
        required: [true, 'Job role is required'],
        trim: true,
        maxlength: [200, 'Job role cannot exceed 100 characters'],
    },
    technologies: {
        type: [String],
        required: true,
    },
    difficultyLevel: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium',
    },
    queryResponseFromAi: {
        type: AiQueryResponse,
    },
    sfResponseFromAi: {
        type: SFresponse,
    },
}, {
    timestamps: true,
    versionKey: false,
});

// for searching purpose
NewInterviewSchema.index({ jobRole: 1 });
NewInterviewSchema.index({ technologies: 1 });

const NewInterview = models.NewInterview<NewInterviewType> || model("NewInterview", NewInterviewSchema)

export default NewInterview