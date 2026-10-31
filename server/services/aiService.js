
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function analyzeComplaint(description) {
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",

    contents: `
      You are an AI civic complaint analyst.

      Analyze this citizen complaint:
      "${description}"

      Identify the actual civic issue.

      Return:
      - category: one of Road, Water, Waste, Electricity,
        Drainage, Public Safety, Other
      - summary: a short description
      - severity: Low, Medium, High, Critical
      - safetyRisk: Low, Medium, High
      - affectedPeople: Low, Medium, High
      - reasoning: explain your assessment
      - recommendedAction: suggest the next action

      Do not invent facts that are not in the complaint.
      If information is insufficient, say so.
      This is an initial assessment, not a verified emergency diagnosis.
    `,

    config: {
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: ["Road", "Water", "Waste", "Electricity",
              "Drainage", "Public Safety", "Other"]
          },
          summary: { type: "string" },
          severity: {
            type: "string",
            enum: ["Low", "Medium", "High", "Critical"]
          },
          safetyRisk: {
            type: "string",
            enum: ["Low", "Medium", "High"]
          },
          affectedPeople: {
            type: "string",
            enum: ["Low", "Medium", "High"]
          },
          reasoning: { type: "string" },
          recommendedAction: { type: "string" }
        },
        required: [
          "category",
          "summary",
          "severity",
          "safetyRisk",
          "affectedPeople",
          "reasoning",
          "recommendedAction"
        ],
        additionalProperties: false
      }
    }
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response");
  }

  return JSON.parse(response.text);
}
