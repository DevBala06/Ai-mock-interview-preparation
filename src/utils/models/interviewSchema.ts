import { Schema, models, model } from 'mongoose';

const questionSchema = new Schema({
    questionNumber: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    expectedAnswer: {
        type: String,
        required: true
    }
}, { _id: false });

const interviewSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    jobRole: {
        type: String,
        required: true
    },
    technologies: {
        type: String,
        required: true
    },
    difficultyLevel: {
        type: String,
        required: true
    },
    questions: [questionSchema],
    userAnswers: [String],
    feedback: {
        feedback: [{
            questionNumber: Number,
            answerFeedback: String,
            analyticalSkills: [{
                accuracy: Number,
                correctness: Number,
                problemSolving: Number,
                relevence: Number,
                creativity: Number,
                efficiency: Number,
                communication: Number,
                clearity: Number,
            }]
        }],
        overallAnalyticalSkills: [{
            accuracy: Number,
            correctness: Number,
            problemSolving: Number,
            relevence: Number,
            creativity: Number,
            efficiency: Number,
            communication: Number,
            clearity: Number,
        }],
        overallPerformance: Number,
        generalFeedback: String
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    }

}, { timestamps: true });

const Interview = models.Interview || model('Interview', interviewSchema);

export default Interview;
