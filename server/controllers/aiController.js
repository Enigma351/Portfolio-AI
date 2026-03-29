const { OpenAI } = require('openai');
const { PARTHA_PROFILE } = require('../data/profile');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.chat = async (req, res) => {
  try {
    const { messages } = req.body;
    const systemMessage = {
      role: 'system',
      content: `You are the AI engine of Partha OS, assisting a recruiter exploring Partha's profile. Here is the context:\n${PARTHA_PROFILE}`,
    };

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Failed to process chat response' });
  }
};

exports.jdMatch = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are the Partha OS JD Matcher. Based on Partha's profile:\n${PARTHA_PROFILE}\nEvaluate the provided job description. Respond in strictly JSON format matching this schema: { "matchScore": number (0-100), "missingSkills": [string], "relevantProjects": [string] }`
        },
        {
          role: 'user',
          content: jobDescription
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    });

    const parsedResponse = JSON.parse(response.choices[0].message.content);
    res.json(parsedResponse);
  } catch (error) {
    console.error('JD Match API Error:', error);
    res.status(500).json({ error: 'Failed to calculate JD match' });
  }
};

exports.projectExplain = async (req, res) => {
  try {
    const { projectName, projectDetails } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are the Partha OS Project Explainer AI. For the requested project, explain: Problem, Solution, and Tech decisions confidently and concisely. Use markdown formatting.`
        },
        {
          role: 'user',
          content: `Project Name: ${projectName}\nDetails: ${projectDetails}`
        }
      ],
      temperature: 0.5,
      max_tokens: 300,
    });

    res.json({ explanation: response.choices[0].message.content });
  } catch (error) {
    console.error('Project Explain API Error:', error);
    res.status(500).json({ error: 'Failed to explain project' });
  }
};
