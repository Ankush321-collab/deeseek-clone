const ModelClient = require("@azure-rest/ai-inference").default;
const { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");
const prompt = require("../models/prompt.model");

const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";
const token = process.env["GITHUB_TOKEN"]; // Make sure this is set in your environment

const sendprompt = async (req, res) => {
  const content = req.body.content;
  const userId=req.userId

  if (!content || content.trim() === "") {
    return res.status(400).json({
      message: "Prompt content is required",
      success: false,
    });
  }

  try {
    // Save user prompt
    await prompt.create({
    userId,
      role: "user",
      content,
    });

    // Azure AI Inference client
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token)
    );

    // Call Azure model
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "" },
          { role: "user", content }
        ],
        temperature: 1,
        top_p: 1,
        model: model
      }
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const ai_content = response.body.choices[0].message.content;

    // Save assistant response
    await prompt.create({
        userId,
      role: "assistant",
      content: ai_content,
    });

    return res.status(200).json({
      reply: ai_content,
      success: true,
    });
  } catch (error) {
    console.error("Error in prompt:", error);
    return res.status(500).json({
      error: "Something went wrong",
      success: false,
    });
  }
};

module.exports = { sendprompt };