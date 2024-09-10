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
    questions: [questionSchema]  
});

const Interview = models.Interview || model('Interview', interviewSchema);

export default Interview;
