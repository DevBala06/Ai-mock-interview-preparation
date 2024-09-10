import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key is missing. Please set NEXT_PUBLIC_GEMINI_API_KEY.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});


const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Create an interview dialogue flow for a ${jobRole} position with the following tech stack: ${technologies}. The difficulty level should be ${difficultyLevel}. \n      \n      Start with a personalized introduction: \"Hello Abhishek, I'm ${randomInterviewer}, your interviewer for todays interview. It's great to meet you today for this ${jobRole} position interview.\"\n      \n      Then, begin with an opening question that's always a variation of \"Tell me about yourself\" or a similar introductory question.\n      \n      Provide the response as a Json format, where each object represents a dialogue turn and includes the following properties: \n      - questionNumber (starting from 1)\n      - question (the actual question)\n      - expectedAnswer (expected answer)\n      \n      The first object should be the introduction, the second should be the opening question, and the rest should be technical questions related to the job role and technologies.\n\n      You have to work strictly on this text \"Make the response in json format this is compulsory, and dont give any of the instructions and dont give any of not related text below or above except json.\"\n      \n      Example structure:\n      [\n        {\n          \"questionNumber\": 1,\n          \"question\": \"Hello Abhishek, I'm ${randomInterviewer}, your personal interviewer for this interview. It's great to meet you today for this ${jobRole} position interview.\"\n          \"expectedAnswer\": hello, mr/mrs ${randomInterviewer} im abhishek jaiswar,\n        },\n        {\n          \"questionNumber\": 2,\n          \"question\": \"To start off, could you tell me a bit about yourself and your journey in the tech world?\"\n          \"expectedAnswer\": \"Ok, have 3 years of experience in this field, \"or something\"\",\n        },\n        {\n          \"questionNumber\": 3,\n          \"question\": \"A brief overview of your background, education, and relevant experience in the field.\"\n          \"expectedAnswer\": \"Expected Answer add according to the questions\",\n        },\n        // ... more questions and expected answers\n      ]\n      \n      Please generate a realistic interview dialogue following this structure, focusing on the ${jobRole} position and the specified technologies: ${technologies}.`\n" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "[\n  {\n    \"questionNumber\": 1,\n    \"question\": \"Hello Abhishek, I'm ${randomInterviewer}, your interviewer for today's interview. It's great to meet you today for this ${jobRole} position interview.\",\n    \"expectedAnswer\": \"Hello ${randomInterviewer}, it's a pleasure to meet you. Thank you for having me.\"\n  },\n  {\n    \"questionNumber\": 2,\n    \"question\": \"To start off, could you tell me a bit about yourself and your journey in the tech world?\",\n    \"expectedAnswer\": \"Sure, I've always been fascinated by technology and its ability to solve problems. I have been working in the tech industry for [Number] years, primarily focusing on [mention relevant areas]. I'm particularly interested in [mention areas of interest within ${technologies}] and I'm always eager to learn new things.\"\n  },\n  {\n    \"questionNumber\": 3,\n    \"question\": \"Can you describe your experience with ${technology1}? What projects have you worked on that utilize it?\",\n    \"expectedAnswer\": \"I have [Number] years of experience working with ${technology1}. I've used it to [mention projects and specific applications, e.g., build a web application, implement a backend system]. In these projects, I was responsible for [mention responsibilities, e.g., designing the architecture, writing code, optimizing performance]. I'm comfortable with [mention specific aspects of ${technology1} you're comfortable with, e.g., its API, frameworks, libraries].\"\n  },\n  {\n    \"questionNumber\": 4,\n    \"question\": \"How would you approach debugging a complex issue involving ${technology2} and ${technology3}?\",\n    \"expectedAnswer\": \"My approach would involve [mention steps, e.g., analyzing logs, using debugging tools, breaking down the issue into smaller components]. I'd also leverage my understanding of ${technology2} and ${technology3} to pinpoint the root cause. For example, I would [mention specific troubleshooting techniques relevant to the technologies]. Ultimately, I strive to find a solution that is both effective and sustainable.\"\n  },\n  {\n    \"questionNumber\": 5,\n    \"question\": \"What are your thoughts on [a current trend or challenge related to ${technologies}]?\",\n    \"expectedAnswer\": \"This is a fascinating topic. [Share your opinion, providing insights based on your knowledge of the trend/challenge. Be sure to demonstrate your understanding of its impact on the field and your potential approach to addressing it.]\"\n  },\n  {\n    \"questionNumber\": 6,\n    \"question\": \"Can you explain the difference between [two concepts related to ${technologies}]?\",\n    \"expectedAnswer\": \"[Provide a clear and concise explanation of the two concepts, highlighting their key differences and potential use cases. Demonstrate your understanding of the underlying principles and technical nuances.]\"\n  },\n  {\n    \"questionNumber\": 7,\n    \"question\": \"Tell me about a time you had to overcome a technical challenge while working with ${technologies}. What did you do and what did you learn from the experience?\",\n    \"expectedAnswer\": \"I once encountered a situation where [describe the challenge]. I approached it by [explain your steps]. It was a learning experience because I realized [mention the lesson learned]. This experience reinforced the importance of [mention relevant concepts or skills]. \"\n  },\n  {\n    \"questionNumber\": 8,\n    \"question\": \"Do you have any questions for me about the role or the company?\",\n    \"expectedAnswer\": \"Yes, I do. [Ask relevant questions about the team, the company culture, future projects, or anything that helps you understand the position and the company better.]\"\n  }\n]" },
      ],
    },
  ],

});
